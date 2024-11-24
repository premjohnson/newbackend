import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    className: { type: String, required: true },
    year: { type: Number, required: true }, // Year as a number
    email: { type: String },
    messageToFaculty: { type: String, default: '' },
    assignmentsCompleted: { type: Boolean, default: false },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
});

export default mongoose.model('Student', StudentSchema);
