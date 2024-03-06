import { Request } from "express"
import { ValidationError } from "../error/ValidationError"

export class AlternativeModel {
    text: string
    isCorrect: boolean
    questionId: string

    constructor(p: AlternativeParams) {
        this.text = p.text
        this.isCorrect = p.isCorrect
        this.questionId = p.questionId
    }

    static fromRequest(req: Request): AlternativeModel {
        const { text, isCorrect, questionId } = req.body
        return new AlternativeModel({
            text: this.validateText(text),
            isCorrect: this.validateIsCorrect(isCorrect),
            questionId: this.validateQuestionId(questionId)
        })
    }

    private static validateText(text: any): string {
        if (typeof text !== 'string' || text == "" || text.length > 256) throw new ValidationError("'text' inválido.")
        return text
    }

    private static validateIsCorrect(isCorrect: any): boolean {
        if (typeof isCorrect !== 'boolean') throw new ValidationError("'isCorrect' inválido.")
        return isCorrect
    }

    private static validateQuestionId(questionId: any): string {
        if (typeof questionId !== 'string') throw new ValidationError("'questionId' inválido.")
        return questionId
    }
}

interface AlternativeParams {
    text: string,
    isCorrect: boolean,
    questionId: string,
}