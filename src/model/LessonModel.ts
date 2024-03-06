import { Request } from "express"
import { ValidationError } from "../error/ValidationError"

export class LessonModel {
    name: string
    description: string
    level: number
    points: number

    constructor(p: LessonParams) {
        this.name = p.name
        this.description = p.description
        this.level = p.level
        this.points = p.points
    }

    static fromRequest(req: Request): LessonModel {
        const { name, description, level, points } = req.body
        return new LessonModel({
            name: this.validateName(name),
            description: this.validateDescription(description),
            level: this.validateLevel(level),
            points: this.validatePoints(points),
        })
    }

    private static validateName(name: any): string {
        if (typeof name !== 'string' || name.length < 3 || name.length > 64) throw new ValidationError("'name' inválido.")
        return name
    }

    private static validateDescription(description: any): string {
        if (typeof description !== 'string' || description.length < 3 || description.length > 128) throw new ValidationError("'description' inválida.")
        return description
    }

    private static validateLevel(level: any): number {
        if (typeof level !== 'number' || level <= 0 || level > 10) throw new ValidationError("'level' inválido");
        return level

    }

    private static validatePoints(points: any): number {
        if (typeof points !== 'number' || points <= 0 || points > 1000) throw new ValidationError("'points' inválido");
        return points
    }
}

interface LessonParams {
    name: string
    description: string
    level: number
    points: number
}