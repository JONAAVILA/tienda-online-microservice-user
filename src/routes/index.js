import { Router } from "express";
// import getAllUsers from '../controllers/get/getAllUsers.js';
// import getUserById from '../controllers/get/getUserById.js';
// import getUserByName from '../controllers/get/getUserByName.js';
import login from '../controllers/post/validations/Login.js';
import checkEmail from '../controllers/post/validations/checkEmail.js';
import createUser from "../controllers/post/creates/createUser.js";
import checkUsers from "../controllers/post/validations/checkUsers.js";
import sendCode from "../controllers/post/creates/sendCode.js";
import checkCode from "../controllers/post/validations/checkCode.js";
import createCookie from "../controllers/post/creates/createCookie.js";
import adminLogin from "../controllers/post/validations/adminLogin.js";

const router = Router()

// router.get('/users',getAllUsers)
// router.get('/users/name',getUserByName)
// router.get('/users/:id',getUserById)

router.post('/login',login)
router.post('/admin',adminLogin)
router.post('/login/refresh',createCookie)
router.post('/users/check',checkUsers)
router.post('/users/check/email',checkEmail)
router.post('/singin/code',sendCode)
router.post('/singin',createUser)
router.post('/singin/check/code',checkCode)

export default router;