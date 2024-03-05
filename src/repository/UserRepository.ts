import prismaClient from "../utils/prisma/prismaClient";

export class UserRepository {

    async create(data: UserParams) {
        return await prismaClient.user.create({
            data: {
                username: data.username,
                email: data.email,
                name: data.name,
                password: data.password,
            },
        })
    }
    
    async createAdmin(data: UserParams) {
        return await prismaClient.user.create({
            data: {
                username: data.username,
                email: data.email,
                name: data.name,
                password: data.password,
                role: "ADMIN"
            },
        })
    }

    async list(){
        return await prismaClient.user.findMany()
    }

    async findById(id: string) {
        return await prismaClient.user.findUnique({ where: { id: id } })
    }

    async findByUsername(username: string) {
        return await prismaClient.user.findUnique({ where: { username: username } })
    }

    async findByEmail(email: string) {
        return await prismaClient.user.findUnique({ where: { email: email } })
    }

    
}

export interface UserParams {
    name: string
    username: string
    email: string
    password: string
}