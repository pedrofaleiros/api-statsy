import { Request, Response } from "express";
import { LessonService } from "../service/LessonService";
import { StatusCodes } from "http-status-codes";
import { LessonModel } from "../model/LessonModel";

export class LessonController {

    async create(req: Request, res: Response) {
        const lesson = LessonModel.fromRequest(req)
        await this.service.create(lesson)
        res.sendStatus(StatusCodes.CREATED)
    }

    async list(_: Request, res: Response) {
        res.json(await this.service.list())
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id
        await this.service.deleteById(id)
        res.sendStatus(StatusCodes.NO_CONTENT)
    }

    private service: LessonService

    constructor() {
        this.service = new LessonService()
        this.create = this.create.bind(this)
        this.list = this.list.bind(this)
        this.delete = this.delete.bind(this)
    }

}