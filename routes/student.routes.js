import express from 'express';
import { addStudent, sendRequestToFaculty, getStudentById } from '../controller/student.controller.js';

const router = express.Router();

// Route to add a student
router.post('/add', addStudent);

// Route to send a request to faculty
router.post('/send-request', sendRequestToFaculty);

// Route to get a student by ID
router.get('/:studentId', getStudentById);

export default router;
