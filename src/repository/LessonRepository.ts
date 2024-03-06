import { LessonModel } from "../model/LessonModel";
import prismaClient from "../utils/prisma/prismaClient";

export class LessonRepository {

    async create(data: LessonModel) {
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

    async deleteById(id: string) {
        return await prismaClient.lesson.delete({ where: { id: id } })
    }
}