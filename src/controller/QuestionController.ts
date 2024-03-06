import { Request, Response } from "express";
import { QuestionService } from "../service/QuestionService";
import { StatusCodes } from "http-status-codes";
import { QuestionModel } from "../model/QuestionModel";

export class QuestionController {

    async create(req: Request, res: Response) {
        const question = QuestionModel.fromRequest(req)
        await this.service.create(question)
        res.sendStatus(StatusCodes.CREATED)
    }

    async list(req: Request, res: Response) {
        const id = req.params.lessonId
        res.json(await this.service.list(id))
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id
        await this.service.deleteById(id)
        res.sendStatus(StatusCodes.NO_CONTENT)
    }


    constructor() {
        this.service = new QuestionService()
        this.create = this.create.bind(this)
        this.list = this.list.bind(this)
        this.delete = this.delete.bind(this)
    }

    private service: QuestionService
}