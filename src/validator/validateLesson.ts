import { ValidationError } from "../error/ValidationError";
import { LessonParams } from "../repository/LessonRepository";

export function validateLesson(reqBody: any): LessonParams {
    const { name, description, level, points } = reqBody;

    if (typeof name !== 'string' || name.length < 3 || name.length > 64) {
        throw new ValidationError("'name' inválido.");
    }
    if (typeof description !== 'string' || description.length < 3 || description.length > 128) {
        throw new ValidationError("'description' inválida.");
    }
    if (typeof level !== 'number' || level <= 0 || level > 10) {
        throw new ValidationError("'level' inválido");
    }
    if (typeof points !== 'number' || points <= 0 || points > 1000) {
        throw new ValidationError("'points' inválido");
    }

    return {
        name: name,
        description: description,
        level: level,
        points: points,
    };
}
