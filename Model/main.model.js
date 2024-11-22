import mongoose from 'mongoose';  // Use ES Module import syntax

const FacultySchema = new mongoose.Schema({
    year: { type: Number, required: true },
    name: { type: String, required: true },
    subject: { type: String, required: true },
});

export default mongoose.model('Faculty', FacultySchema);  // Use default export
