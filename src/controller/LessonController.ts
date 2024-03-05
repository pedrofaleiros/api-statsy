import { Request, Response } from "express";
import { LessonService } from "../service/LessonService";
import { StatusCodes } from "http-status-codes";
import { validateLesson } from "../validator/validateLesson";

export class LessonController {

    async create(req: Request, res: Response) {
        await this.service.create(validateLesson(req.body))
        res.sendStatus(StatusCodes.CREATED)
    }

    async list(req: Request, res: Response) {
        res.json(await this.service.list())
    }

    private service: LessonService

    constructor() {
        this.service = new LessonService()
        this.create = this.create.bind(this)
        this.list = this.list.bind(this)
    }

}