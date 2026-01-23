import express from 'express';
import authController from '../controllers/auth.controller.js';
import asyncerrorHandler from '../middleware/asyncErrorHandler.js';
const router = express.Router();

router.post('/login', asyncerrorHandler(authController.login));
router.post('/signup', asyncerrorHandler(authController.signUp));
export default router;