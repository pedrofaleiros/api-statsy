import { ResourceNotFoundError } from "../error/ResourceNotFoundError";
import { ServiceError } from "../error/ServiceError";
import { QuestionModel } from "../model/QuestionModel";
import { LessonRepository } from "../repository/LessonRepository";
import { QuestionRepository } from "../repository/QuestionRepository";

export class QuestionService {

    async create(data: QuestionModel) {
        //TODO: validate
        await this.findLesson(data.lessonId)
        return await this.repository.create(data)
    }

    async list(lessonId: string) {
        await this.findLesson(lessonId);
        return await this.repository.list(lessonId)
    }

    async deleteById(id: any) {
        if (typeof id !== 'string') throw new ServiceError("'id' inválido.")
        if (await this.repository.findById(id) == null) throw new ResourceNotFoundError("Questão não encontrada.")
        await this.repository.deleteById(id)
    }

    private async findLesson(lessonId: string) {
        if (await this.lessonRepository.findById(lessonId) == null) throw new ResourceNotFoundError("Lição não encontrada.")
    }

    constructor() {
        this.repository = new QuestionRepository()
        this.lessonRepository = new LessonRepository()
    }

    private repository: QuestionRepository

    private lessonRepository: LessonRepository
}