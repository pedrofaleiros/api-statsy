import { Request, Response } from "express";
import { QuestionService } from "../service/QuestionService";
import { StatusCodes } from "http-status-codes";
import { validateQuestion } from "../validator/validateQuestion";

export class QuestionController {

    async create(req: Request, res: Response) {
        await this.service.create(validateQuestion(req.body))
        res.sendStatus(StatusCodes.CREATED)
    }

    async list(req: Request, res: Response) {
        const id = req.params.lessonId
        res.json(await this.service.list(id))
    }

    private service: QuestionService

    constructor() {
        this.service = new QuestionService()
        this.create = this.create.bind(this)
        this.list = this.list.bind(this)
    }
}