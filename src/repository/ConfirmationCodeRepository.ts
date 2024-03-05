import prismaClient from "../utils/prisma/prismaClient";

export class ConfirmationCodeRepository {

    async create(code: string, userId: string, expiresAt: Date) {
        return await prismaClient.confirmationCode.create({
            data: {
                code: code,
                userId: userId,
                expiresAt: expiresAt,
            },
            include: {
                user: true,
            }
        })
    }

    async findValid(userId: string) {
        return await prismaClient.confirmationCode.findFirst({
            where: {
                userId: userId,
                confirmed: true,
            }
        })
    }

    async find(userId: string, code: string) {
        return await prismaClient.confirmationCode.findFirst({
            where: {
                code: code,
                userId: userId,
            }
        })
    }

    async list(userId: string) {
        return await prismaClient.confirmationCode.findMany({ where: { userId: userId } })
    }

    async confirmEmail(confirmationId: string) {
        await prismaClient.confirmationCode.update({
            where: {
                id: confirmationId,
            },
            data: {
                confirmed: true,
            }
        })
    }
}