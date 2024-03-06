import { AlternativeModel } from "../model/AlternativeModel";
import prismaClient from "../utils/prisma/prismaClient";

export class AlternativeRepository {

    async create(data: AlternativeModel) {
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

    async deleteById(alternativeId: string) {
        return await prismaClient.alternative.delete({ where: { id: alternativeId } })
    }
}