export class ValidationError extends Error {
    message: string
    constructor(message: string) {
        super()
        this.message = message
    }
}