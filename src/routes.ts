import { Router } from "express";
import { LessonController } from "./controller/LessonController";
import { QuestionController } from "./controller/QuestionController";
import { AlternativeController } from "./controller/AlternativeController";
import { AuthController } from "./controller/AuthController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";
import { AnswerController } from "./controller/AnswerController";

const router = Router();

const auth = new AuthController()
router.post("/auth/login", auth.login)
router.post("/auth/signup", auth.signup)
router.post("/auth/confirm", auth.confirmEmail)
router.post("/auth/confirm/send", auth.sendConfirmationCode)

const lesson = new LessonController()
router.post('/lesson', isAuthenticated, lesson.create)
router.get('/lesson/all', isAuthenticated, lesson.list)
router.delete('/lesson/:id', isAuthenticated, lesson.delete)

const question = new QuestionController()
router.post('/question', isAuthenticated, question.create)
router.get('/question/lesson/:lessonId', isAuthenticated, question.list)
router.delete('/question/:id', isAuthenticated, question.delete)

const alternative = new AlternativeController()
router.post("/alternative", isAuthenticated, alternative.create)
router.get('/alternative/question/:questionId', isAuthenticated, alternative.list)
router.delete("/alternative/:id", isAuthenticated, alternative.delete)

const answer = new AnswerController()
router.post("/answer/question/:questionId/alternative/:alternativeId", isAuthenticated, answer.answer)
router.get("/answer/question/:questionId", isAuthenticated, answer.detail)

router.get("/", (_, res) => res.json({ status: "OK" }));

export { router };
