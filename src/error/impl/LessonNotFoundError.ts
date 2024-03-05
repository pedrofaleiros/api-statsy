import { ResourceNotFoundError } from "../ResourceNotFoundError";

export class LessonNotFoundError extends ResourceNotFoundError {
    constructor(id: string) {
        super(`Lesson com id = '${id}' não encontrada.`)
    }
}