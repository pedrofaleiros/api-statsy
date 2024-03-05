import { ResourceNotFoundError } from "../ResourceNotFoundError";

export class QuestionNotFoundError extends ResourceNotFoundError {
    constructor(id: string) {
        super(`Questão com id = '${id}' não encontrada.`)
    }
}