import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository/UserRepository";
import { ResourceNotFoundError } from "../error/ResourceNotFoundError";
import { NotAuthError } from "../error/NotAuthError";

interface Payload {
    sub: string
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const authToken = req.headers.authorization
        if (authToken) {
            const [, token] = authToken.split(' ')
            const jwtSecret = process.env.JWT_SECRET
            if (jwtSecret == undefined) {
                throw new Error('Erro no servidor: JWT')
            }
            const { sub } = verify(token, jwtSecret) as Payload
            const user = await findUser(sub)
            if (user.role != "ADMIN") {
                throw new NotAuthError("Não autorizado.")
            }
            req.userId = user.id
            return next()
        } else throw new NotAuthError("Não autorizado.")
    } catch (error) {
        throw new NotAuthError("Não autorizado.")
    }
}

async function findUser(userId: string) {
    const userRepository = new UserRepository()
    const user = await userRepository.findById(userId)
    if (user == null) {
        throw new ResourceNotFoundError("Usuário não encontrado.")
    }
    return user
}