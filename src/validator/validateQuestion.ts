import { ValidationError } from "../error/ValidationError";
import { QuestionParams } from "../repository/QuestionRepository";

export function validateQuestion(reqBody: any): QuestionParams {
    const { content, lessonId } = reqBody;

    if (typeof content !== 'string' || content.length < 3 || content.length > 512) {
        throw new ValidationError("'content' inválido.");
    }

    if (typeof lessonId !== 'string') {
        throw new ValidationError("'lessonId' inválida.");
    }

    return {
        content: content,
        lessonId: lessonId,
    };
}