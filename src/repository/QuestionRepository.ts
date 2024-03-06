import { QuestionModel } from "../model/QuestionModel"
import prismaClient from "../utils/prisma/prismaClient"

export class QuestionRepository {

    async create(data: QuestionModel) {
        return await prismaClient.question.create({
            data: {
                content: data.content,
                lessonId: data.lessonId,
                imageUrl: data.imageUrl,
            }
        })
    }

    async list(lessonId: string) {
        return await prismaClient.question.findMany({ where: { lessonId: { equals: lessonId } } })
    }

    async findById(id: string) {
        return await prismaClient.question.findUnique({ where: { id: id } })
    }

    async deleteById(id: string) {
        return await prismaClient.question.delete({ where: { id: id } })
    }
}