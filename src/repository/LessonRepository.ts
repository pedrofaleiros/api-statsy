import prismaClient from "../utils/prisma/prismaClient";

export class LessonRepository {

    async create(data: LessonParams) {
        return await prismaClient.lesson.create({
            data: {
                name: data.name,
                level: data.level,
                points: data.points,
                description: data.description,
            }
        })
    }

    async findById(id: string) {
        return await prismaClient.lesson.findUnique({ where: { id: id } })
    }

    async list() {
        return await prismaClient.lesson.findMany()
    }
    async listByLevel(level: number) {
        return await prismaClient.lesson.findMany({ where: { level: { equals: level } } })
    }
}

export interface LessonParams {
    name: string
    description: string
    level: number
    points: number
}