import { Alternative } from "@prisma/client"
import { ServiceError } from "../error/ServiceError"
import { AnswerRepository } from "../repository/AnswerRepository"
import { QuestionRepository } from "../repository/QuestionRepository"
import { ResourceNotFoundError } from "../error/ResourceNotFoundError"

export class AnswerService {

    async answer(userId: string, questionId: string, alternativeId: string) {
        const { answer, question, alternative } = await this.validate(userId, questionId, alternativeId)
        if (answer != null)
            throw new ServiceError("A questão já foi respondida pelo usuário.")
        await this.repository.answer(userId, question.id, alternative.id)
        return alternative
    }

    async detail(userId: string, questionId: string) {
        const question = await this.questionRepository.findByIdWithAlternatives(questionId)
        if (question == null) throw new ResourceNotFoundError('Questão não encontrada.')
        const answer = await this.repository.find(userId, question.id)

        if (answer == null) return null
        const correctAlternative = this.findCorrectAlternative(question.alternatives)
        return {
            answer: {
                "id": correctAlternative.id,
                "text": correctAlternative.text,
            },
            userAnswer: {
                "id": answer.alternative.id,
                "text": answer.alternative.text,
            },
        }
    }

    private async validate(userId: string, questionId: string, alternativeId: string) {
        const question = await this.questionRepository.findByIdWithAlternatives(questionId)
        if (question == null) throw new ResourceNotFoundError('Questão não encontrada.')
        const alternative = this.findAlternative(question.alternatives, alternativeId)
        const answer = await this.repository.find(userId, question.id)
        return { answer, question, alternative }
    }

    private findCorrectAlternative(alts: Alternative[]): Alternative {
        for (let i = 0; i < alts.length; i++) {
            if (alts[i].isCorrect) return alts[i]
        }
        throw new ResourceNotFoundError('Alternativa não encontrada.')
    }

    private findAlternative(alts: Alternative[], alternativeId: string): Alternative {
        for (let i = 0; i < alts.length; i++) {
            if (alts[i].id == alternativeId) return alts[i]
        }
        throw new ResourceNotFoundError('Alternativa não encontrada.')
    }

    constructor() {
        this.repository = new AnswerRepository()
        this.questionRepository = new QuestionRepository()
    }

    private repository: AnswerRepository
    private questionRepository: QuestionRepository
}