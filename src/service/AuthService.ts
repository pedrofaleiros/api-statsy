import { hash } from "bcryptjs";
import { UserParams, UserRepository } from "../repository/UserRepository";
import { EmailService } from "./EmailService";
import { ConfirmationCodeRepository } from "../repository/ConfirmationCodeRepository";
import { verifyPassword } from "../utils/functions/verifyPassword";
import { getJWT } from "../utils/functions/getJWT";
import { ResourceNotFoundError } from "../error/ResourceNotFoundError";
import { NotAuthError } from "../error/NotAuthError";
import { ServiceError } from "../error/ServiceError";

export class AuthService {

    async login(username: string, password: string) {
        if (username == null || username == undefined || username == "") throw new ServiceError("Username inválido.")
        if (password == null || password == undefined || password == "") throw new ServiceError("Senha inválida.")

        const user = await this.repository.findByUsername(username)
        if (user == null) {
            throw new ResourceNotFoundError("Usuario não encontrado.")
        }
        await this.verifyEmailIsConfirmed(user.id)
        await verifyPassword(password, user.password)
        const token = getJWT(user.id, user.username)
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            token: token,
        }
    }

    async verifyEmailIsConfirmed(userId: string) {
        if (await this.confirmationCodeRepository.findValid(userId) == null) {
            throw new NotAuthError("Confirme seu email.")
        }
    }

    async signup(data: UserParams) {
        if (await this.repository.findByUsername(data.username) != null) {
            throw new ServiceError("Username já cadastrado.")
        }
        if (await this.repository.findByEmail(data.email) != null) {
            throw new ServiceError("Email já cadastrado.")
        }
        data.password = await hash(data.password, 8)
        return await this.repository.create(data)
    }

    async sendConfirmationCode(email: string) {
        const user = await this.repository.findByEmail(email)
        if (user == null) {
            throw new ResourceNotFoundError("Email não encontrado.")
        }
        const list = await this.confirmationCodeRepository.list(user.id)
        let notExpiredCount = 0
        const now = new Date()
        list.forEach((date) => { if (now < date.expiresAt) notExpiredCount++ })
        if (notExpiredCount > 2) {
            throw new ServiceError("Limite de solicitações excedido.")
        }
        await this.createConfirmationCode(user.id)
    }

    async createConfirmationCode(userId: string) {
        const code = this.getRandomCode()
        const expiresAt = new Date(new Date().getTime() + 30 * 60000) // 30 minutos
        const confirmation = await this.confirmationCodeRepository.create(code, userId, expiresAt)
        await this.emailService.sendConfirmationCode(
            confirmation.code,
            confirmation.user.name,
            confirmation.user.email
        )
    }

    async confirmEmail(email: string, code: string) {
        const user = await this.repository.findByEmail(email)
        if (user == null) {
            throw new ResourceNotFoundError("Email não encontrado")
        }
        if (await this.confirmationCodeRepository.findValid(user.id) != null) {
            throw new ServiceError("Email já foi confirmado.")
        }
        const confirmation = await this.confirmationCodeRepository.find(user.id, code)
        if (confirmation == null) {
            throw new ServiceError("Código de confirmação inválido.")
        }
        if (new Date() > confirmation.expiresAt) {
            throw new ServiceError("Código de confirmação expirado.")
        }
        await this.confirmationCodeRepository.confirmEmail(confirmation.id)
    }

    constructor() {
        this.repository = new UserRepository()
        this.emailService = new EmailService()
        this.confirmationCodeRepository = new ConfirmationCodeRepository()
    }

    private getRandomCode(): string {
        const num = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
        return num.toString()
    }

    private confirmationCodeRepository: ConfirmationCodeRepository
    private emailService: EmailService
    private repository: UserRepository
}