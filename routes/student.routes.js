// routes/student.routes.js
import express from 'express';
import studentController from '../controller/student.controller.js'; // Import the controller

const router = express.Router();

// Route to add a student
router.post('/students', studentController.addStudent);

// Route to send a request to faculty
router.post('/send-request', studentController.sendRequestToFaculty);

// Route to get a student by ID
router.get('/students/:studentId', studentController.getStudentById);

export default router;
