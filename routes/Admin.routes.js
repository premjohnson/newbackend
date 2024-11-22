import express from 'express';
import { signUpAdmin, logoutAdmin } from '../controller/Admin.controller.js'; // Adjust the path as necessary

const router = express.Router();

// Route to handle admin sign-up
router.post('/signup', signUpAdmin);

// Route to handle admin logout
router.post('/logout', logoutAdmin);

export default router;
