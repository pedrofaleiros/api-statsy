import { Request, Response } from "express";
import { AlternativeService } from "../service/AlternativeService";
import { StatusCodes } from "http-status-codes";
import { AlternativeModel } from "../model/AlternativeModel";

export class AlternativeController {

    async create(req: Request, res: Response) {
        const alt = AlternativeModel.fromRequest(req)
        await this.service.create(alt)
        return res.sendStatus(StatusCodes.CREATED)
    }

    async list(req: Request, res: Response) {
        const id = req.params.questionId
        return res.json(await this.service.list(id))
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id
        await this.service.deleteById(id)
        res.sendStatus(StatusCodes.NO_CONTENT)
    }

    constructor() {
        this.service = new AlternativeService()
        this.create = this.create.bind(this)
        this.list = this.list.bind(this)
        this.delete = this.delete.bind(this)
    }

    private service: AlternativeService
}