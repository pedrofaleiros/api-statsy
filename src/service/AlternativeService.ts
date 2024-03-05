import { Alternative } from "@prisma/client";
import { AlternativeParams, AlternativeRepository } from "../repository/AlternativeRepository";
import { QuestionRepository } from "../repository/QuestionRepository";
import { ServiceError } from "../error/ServiceError";
import { QuestionNotFoundError } from "../error/impl/QuestionNotFoundError";

export class AlternativeService {

    async create(data: AlternativeParams) {
        await this.findQuestion(data.questionId)
        const alts = await this.repository.list(data.questionId)
        this.validateAlternatives(alts, data);
        return await this.repository.create(data)
    }

    async list(questionId: string) {
        if (await this.questionRepository.findById(questionId) == null) {
            throw new QuestionNotFoundError(questionId)
        }
        const alts = await this.repository.list(questionId)
        const data = new Array()
        alts.forEach((alt) => {
            data.push({
                "id": alt.id,
                "text": alt.text,
                "questionId": alt.questionId,
            })
        })
        return data
    }

    private validateAlternatives(alts: Alternative[], data: AlternativeParams) {
        let count = 0;
        alts.forEach((alt) => { if (alt.isCorrect) count++; });
        if (alts.length >= 5) {
            throw new ServiceError("Questões devem ter no máximo 5 alternativas");
        }
        if (data.isCorrect && count > 0) {
            throw new ServiceError("Questões devem ter apenas 1 alternativa correta.");
        }
        if (!data.isCorrect && count == 0 && alts.length == 4) {
            throw new ServiceError("Questões devem ter 1 alternativa correta.");
        }
    }

    private async findQuestion(questionId: string) {
        if (await this.questionRepository.findById(questionId) == null) {
            throw new QuestionNotFoundError(questionId)
        }
    }

    constructor() {
        this.repository = new AlternativeRepository()
        this.questionRepository = new QuestionRepository()
    }

    private questionRepository: QuestionRepository
    private repository: AlternativeRepository
}