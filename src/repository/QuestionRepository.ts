import prismaClient from "../utils/prisma/prismaClient"

export class QuestionRepository {

    async create(data: QuestionParams) {
        return await prismaClient.question.create({
            data: {
                content: data.content,
                lessonId: data.lessonId,
            }
        })
    }

    async list(lessonId: string) {
        return await prismaClient.question.findMany({ where: { lessonId: { equals: lessonId } } })
    }

    async findById(id: string) {
        return await prismaClient.question.findUnique({ where: { id: id } })
    }
}

export interface QuestionParams {
    content: string
    lessonId: string
}