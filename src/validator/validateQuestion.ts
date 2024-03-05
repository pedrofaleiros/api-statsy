import { Request } from "express";
import { ValidationError } from "../error/ValidationError";
import { QuestionParams } from "../repository/QuestionRepository";

export function validateQuestion(reqBody: any): QuestionParams {
    const { content, imageUrl, lessonId } = reqBody;

    if (typeof content !== 'string' || content.length < 3 || content.length > 512) {
        throw new ValidationError("'content' inválido.");
    }

    if (typeof lessonId !== 'string') {
        throw new ValidationError("'lessonId' inválida.");
    }

    if (!validateImageUrl(imageUrl)) {
        throw new ValidationError("'imageUrl' inválida.");
    }

    return {
        content: content,
        lessonId: lessonId,
        imageUrl: imageUrl ?? null,
    };
}

function validateImageUrl(imageUrl: string | null): boolean {
    if (imageUrl == null || imageUrl == undefined) return true
    try {
        new URL(imageUrl)
        return true
    } catch (err) {
        return false
    }
}