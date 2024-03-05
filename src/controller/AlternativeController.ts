import { Request, Response } from "express";
import { AlternativeService } from "../service/AlternativeService";
import { StatusCodes } from "http-status-codes";
import { validateAlternative } from "../validator/validateAlternative";

export class AlternativeController {

    async create(req: Request, res: Response) {
        await this.service.create(validateAlternative(req.body))
        return res.sendStatus(StatusCodes.CREATED)
    }

    async list(req: Request, res: Response) {
        const id = req.params.questionId
        return res.json(await this.service.list(id))
    }

    constructor() {
        this.service = new AlternativeService()
        this.create = this.create.bind(this)
        this.list = this.list.bind(this)
    }

    private service: AlternativeService
}