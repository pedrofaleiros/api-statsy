import { Request } from "express"
import { ValidationError } from "../error/ValidationError"

export class QuestionModel {
    content: string
    lessonId: string
    imageUrl: string | null

    constructor(p: QuestionParams) {
        this.content = p.content
        this.lessonId = p.lessonId
        this.imageUrl = p.imageUrl
    }

    static fromRequest(req: Request): QuestionModel {
        const { content, imageUrl, lessonId } = req.body

        return new QuestionModel({
            content: this.validateContent(content),
            lessonId: this.validateLessonId(lessonId),
            imageUrl: this.validateImageUrl(imageUrl),
        })
    }

    private static validateContent(content: any): string {
        if (typeof content !== 'string' || content.length < 3 || content.length > 512)
            throw new ValidationError("'content' inválido.")
        return content
    }

    private static validateLessonId(lessonId: any): string {
        if (typeof lessonId !== 'string') throw new ValidationError("'lessonId' inválida.");
        return lessonId
    }

    private static validateImageUrl(imageUrl: any): string | null {
        if (imageUrl == null || imageUrl == undefined) return null
        try {
            new URL(imageUrl)
            return imageUrl
        } catch (_) {
            throw new ValidationError("'imageUrl' inválida.")
        }
    }

}

interface QuestionParams {
    content: string
    lessonId: string
    imageUrl: string | null
}