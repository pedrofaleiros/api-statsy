import { ValidationError } from "../error/ValidationError";
import { AlternativeParams } from "../repository/AlternativeRepository";

export function validateAlternative(reqBody: any): AlternativeParams {
    const { text, isCorrect, questionId } = reqBody;

    if (typeof text !== 'string' || text.length < 3 || text.length > 512) {
        throw new ValidationError("'text' inválido.");
    }
    if (typeof questionId !== 'string') {
        throw new ValidationError("'questionId' inválido.");
    }
    if (typeof isCorrect !== 'boolean') {
        throw new ValidationError("'isCorrect' inválido.");
    }

    return {
        text: text,
        isCorrect: isCorrect,
        questionId: questionId,
    };
}