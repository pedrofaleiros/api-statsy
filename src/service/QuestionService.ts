import { LessonNotFoundError } from "../error/impl/LessonNotFoundError";
import { LessonRepository } from "../repository/LessonRepository";
import { QuestionParams, QuestionRepository } from "../repository/QuestionRepository";

export class QuestionService {

    async create(data: QuestionParams) {
        //TODO: validate
        await this.findLesson(data.lessonId)
        return await this.repository.create(data)
    }

    async list(lessonId: string) {
        await this.findLesson(lessonId);
        return await this.repository.list(lessonId)
    }

    private async findLesson(lessonId: string) {
        if (await this.lessonRepository.findById(lessonId) == null) throw new LessonNotFoundError(lessonId)
    }

    private repository: QuestionRepository
    private lessonRepository: LessonRepository

    constructor() {
        this.repository = new QuestionRepository()
        this.lessonRepository = new LessonRepository()
    }
}