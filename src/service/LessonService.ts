import { LessonParams, LessonRepository } from "../repository/LessonRepository";

export class LessonService {

    private repository: LessonRepository

    constructor() {
        this.repository = new LessonRepository()
    }

    async create(data: LessonParams) {
        return this.repository.create(data)
    }

    async list() {
        return this.repository.list()
    }
}