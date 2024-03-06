import { ResourceNotFoundError } from "../error/ResourceNotFoundError";
import { ServiceError } from "../error/ServiceError";
import { LessonModel } from "../model/LessonModel";
import { LessonRepository } from "../repository/LessonRepository";

export class LessonService {

    async create(data: LessonModel) {
        return this.repository.create(data)
    }

    async list() {
        return this.repository.list()
    }

    async deleteById(id: any) {
        if (typeof id !== 'string') throw new ServiceError("'id' inválido.")
        if (await this.repository.findById(id) == null) throw new ResourceNotFoundError("Lesson não encontrada.")
        await this.repository.deleteById(id)
    }

    private repository: LessonRepository

    constructor() {
        this.repository = new LessonRepository()
    }

}