import { compare } from "bcryptjs";
import { ServiceError } from "../../error/ServiceError";

export async function verifyPassword(authPassword: string, databasePassword: string) {
    if (authPassword == "") {
        throw new ServiceError('Senha inválida');
    }
    const passwordMatches = await compare(authPassword, databasePassword)
    if (!passwordMatches) {
        throw new ServiceError('Senha incorreta');
    }
}