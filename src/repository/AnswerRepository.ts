import prismaClient from "../utils/prisma/prismaClient";

export class AnswerRepository {

    async answer(userId: string, questionId: string, alternativeId: string) {
        return await prismaClient.userAnswer.create({
            data: {
                userId: userId,
                questionId: questionId,
                alternativeId: alternativeId,
            }
        })
    }

    async find(userId: string, questionId: string) {
        return await prismaClient.userAnswer.findUnique({
            where: {
                userId_questionId: {
                    userId: userId,
                    questionId: questionId,
                }
            },
            include: { alternative: true }
        })
    }

    async listUserAnswers(userId: string) {
        return await prismaClient.userAnswer.findMany({
            where: { userId: userId },
            include: { alternative: true }
        })
    }
}