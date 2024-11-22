import bcrypt from 'bcryptjs';
import Admin from '../Model/Admin.model.js';

// Sign Up Admin Function
export const signUpAdmin = async (req, res) => {
    const { Email, password } = req.body;

    try {
        const existingEmail = await Admin.findOne({ Email });

        if (existingEmail) {
            return res.status(400).json({ error: "Email Found" });
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating a new admin user
        const newLog = new Admin({
            Email,
            password: hashedPassword
            
        });

        await newLog.save();
        console.log("New LOg Created");

        res.status(201).json({
            _id: newLog._id,
            Email: newLog.Email,
            message: "Admin Logged successfully created!"
        });

    } catch (error) {
        console.error("Error in signUpAdmin:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Logout Admin Function
export const logoutAdmin = (req, res) => {
    console.log("Session before destroy:", req.session);

    if (!req.session) {
        return res.status(400).json({ error: "No active session to log out" });
    }

    req.session.destroy(err => {
        if (err) {
            console.error("Error in logout:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log("Session destroyed successfully");
        res.clearCookie('connect.sid'); // Adjust cookie name if necessary
        res.status(200).json({ message: "Logout successful" });
    });
};
