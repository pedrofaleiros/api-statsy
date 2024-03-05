import prismaClient from "../utils/prisma/prismaClient"

export class QuestionRepository {

    async create(data: QuestionParams) {
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
}

export interface QuestionParams {
    content: string
    lessonId: string
    imageUrl: string | null
}