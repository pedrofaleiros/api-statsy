import { ValidationError } from "../error/ValidationError";
import { UserParams } from "../repository/UserRepository";

export function validateUser(reqBody: any): UserParams {
    const { name, username, email, password } = reqBody;

    if (typeof name !== 'string') {
        throw new ValidationError("Nome inválido.");
    }
    if (typeof username !== 'string') {
        throw new ValidationError("Username inválido.");
    }
    if (typeof email !== 'string') {
        throw new ValidationError("Email inválido.");
    }
    if (typeof password !== 'string') {
        throw new ValidationError("Senha inválida.");
    }

    return {
        name: name,
        username: username,
        email: email,
        password: password,
    };
}