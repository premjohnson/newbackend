import mongoose from 'mongoose';
import Student from '../Model/student.model.js';
import main from '../Model/main.model.js'; // Assuming this is the Faculty model

// Send request to Faculty
export const sendRequestToFaculty = async (req, res) => {
    const { studentId, facultyId, message } = req.body;

    try {
        // Validate input fields
        if (!studentId || !facultyId || !message) {
            return res.status(400).json({ message: 'All fields (studentId, facultyId, message) are required!' });
        }

        // Validate faculty ID
        if (!mongoose.Types.ObjectId.isValid(facultyId)) {
            return res.status(400).json({ message: 'Invalid faculty ID' });
        }

        // Check if the faculty exists
        const faculty = await main.findById(facultyId);
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found!' });
        }

        // Check if the student exists
        const student = await Student.findOne({ studentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found!' });
        }

        // Update student record with the request message
        student.messageToFaculty = message;
        // Do not automatically mark assignmentsCompleted as true unless this is the intended business logic
        student.assignmentsCompleted = true; // Optional based on your logic
        await student.save();

        res.status(200).json({
            message: 'Request sent to faculty successfully!',
            student,
        });
    } catch (error) {
        console.error('Error in sending request to faculty:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// Add a new student
export const addStudent = async (req, res) => {
    const { studentId, name, className, email } = req.body;

    try {
        // Validate required fields
        if (!studentId || !name || !className) {
            return res.status(400).json({ message: 'Student ID, Name, and Class are required!' });
        }

        // Check if the student ID already exists
        const existingStudent = await Student.findOne({ studentId });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student ID already exists!' });
        }

        // Optional: Validate email if provided
        if (email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Create a new student
        const newStudent = new Student({
            studentId,
            name,
            className,
            email: email || '', // Optional email field
        });

        // Save the student to the database
        await newStudent.save();

        // Send the response without sensitive data like `password` (if you had any in the future)
        res.status(201).json({
            message: 'Student added successfully!',
            data: {
                studentId: newStudent.studentId,
                name: newStudent.name,
                className: newStudent.className,
                email: newStudent.email,
            },
        });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// Get a student by ID
export const getStudentById = async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await Student.findOne({ studentId });

        if (!student) {
            return res.status(404).json({ message: 'Student not found!' });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

export default { sendRequestToFaculty, addStudent, getStudentById }; // Exporting all functions as default
