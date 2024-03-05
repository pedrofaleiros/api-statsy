import { ValidationError } from "../error/ValidationError";
import { UserParams } from "../repository/UserRepository";

export function validateUser(reqBody: any): UserParams {
    const { name, username, email, password } = reqBody;

    if (typeof name !== 'string' || !validateName(name)) {
        throw new ValidationError("Nome inválido.");
    }
    if (typeof username !== 'string' || !validateUsername(username)) {
        throw new ValidationError("Username inválido.");
    }
    if (typeof email !== 'string' || !validateEmail(email)) {
        throw new ValidationError("Email inválido.");
    }
    if (typeof password !== 'string' || !validatePassword(password)) {
        throw new ValidationError("Senha inválida.");
    }

    return {
        name: name,
        username: username,
        email: email,
        password: password,
    };
}

function validateUsername(username: string): boolean {
    if (username.length > 30 || username.length < 3) {
        return false;
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return false;
    }
    return true;
}

function validatePassword(password: string): boolean {
    if (password.length < 8) {
        return false;
    }
    if (!/\d/.test(password)) {
        return false;
    }
    if (!/[a-zA-Z]/.test(password)) {
        return false;
    }
    const specialCharacters = /[ !@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialCharacters.test(password)) {
        return false;
    }
    if (/\s/.test(password)) {
        return false;
    }
    return true;
}

function validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

function validateName(name: string): boolean {
    const validName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/.test(name);
    const hasAtLeastTwoNames = name.trim().split(' ').length >= 2;
    return validName && hasAtLeastTwoNames;
}