import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    Email: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"] // Regex for email validation
    },
    
    password: {
        type: String,
        required: true,
        minlength: 8 // Ensure strong password
    },
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
