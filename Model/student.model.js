import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true }, // Unique student ID
    name: { type: String, required: true }, // Student name
    className: { type: String, required: true }, // Class name
    email: { type: String }, // Email field without unique constraint
    messageToFaculty: { type: String, default: '' }, // Message sent to the faculty
    assignmentsCompleted: { type: Boolean, default: false }, // Assignment completion status
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }, // Reference to the faculty model
});

export default mongoose.model('Student', StudentSchema);
