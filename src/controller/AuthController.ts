import { Request, Response } from "express";
import { AuthService } from "../service/AuthService";
import { StatusCodes } from "http-status-codes";
import { validateUser } from "../validator/validateUser";

export class AuthController {

    async login(req: Request, res: Response) {
        const { username, password } = req.body
        const data = await this.service.login(username, password)
        // res.json(data)
        res.header("Authorization", data.token).sendStatus(StatusCodes.OK)
    }

    async signup(req: Request, res: Response) {
        await this.service.signup(validateUser(req.body))
        res.sendStatus(StatusCodes.CREATED)
    }

    async confirmEmail(req: Request, res: Response) {
        const { email, code } = req.body
        await this.service.confirmEmail(email, code)
        res.json("OK")
    }

    async sendConfirmationCode(req: Request, res: Response) {
        const { email } = req.body
        await this.service.sendConfirmationCode(email)
        res.json("OK")
    }

    constructor() {
        this.service = new AuthService()
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.confirmEmail = this.confirmEmail.bind(this)
        this.sendConfirmationCode = this.sendConfirmationCode.bind(this)
    }

    private service: AuthService
}