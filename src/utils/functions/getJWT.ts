import { sign } from "jsonwebtoken";
require('dotenv').config()

export function getJWT(id: string, username: string): string {
    const jwtSecret = process.env.JWT_SECRET

    if (jwtSecret == undefined) {
        throw new Error('Erro no servidor: JWT')
    }

    return sign(
        {
            name: username,
        },
        jwtSecret,
        {
            subject: id,
            expiresIn: '7d'
        }
    );
}