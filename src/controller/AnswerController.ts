import { Request, Response } from "express";
import { AnswerService } from "../service/AnswerService";
import { ValidationError } from "../error/ValidationError";

export class AnswerController {

    async answer(req: Request, res: Response) {
        const { questionId, alternativeId } = this.getParams(req)
        const userId = req.userId
        const data = await this.service.answer(userId, questionId, alternativeId)
        res.json(data.isCorrect)
    }

    async detail(req: Request, res: Response) {
        const questionId = req.params.questionId
        if (typeof questionId !== 'string') throw new ValidationError("'questionId' inválido")
        const userId = req.userId
        const data = await this.service.detail(userId, questionId)
        res.json(data)
    }

    constructor() {
        this.service = new AnswerService()
        this.answer = this.answer.bind(this)
        this.detail = this.detail.bind(this)
    }

    private service: AnswerService

    private getParams(req: Request): {
        questionId: string;
        alternativeId: string;
    } {
        const { questionId, alternativeId } = req.params
        if (typeof questionId !== 'string') throw new ValidationError("'questionId' inválido")
        if (typeof alternativeId !== 'string') throw new ValidationError("'alternativeId' inválido")
        return { questionId, alternativeId }
    }
}