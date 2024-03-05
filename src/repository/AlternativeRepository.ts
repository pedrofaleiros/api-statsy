import prismaClient from "../utils/prisma/prismaClient";

export class AlternativeRepository {

    async create(data: AlternativeParams) {
        return await prismaClient.alternative.create({
            data: {
                text: data.text,
                isCorrect: data.isCorrect,
                questionId: data.questionId,
            }
        })
    }

    async list(questionId: string) {
        return await prismaClient.alternative.findMany({ where: { questionId: questionId } })
    }

    async findById(id: string) {
        return await prismaClient.alternative.findUnique({ where: { id: id } })
    }
}

export interface AlternativeParams {
    text: string,
    isCorrect: boolean,
    questionId: string,
}