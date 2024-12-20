import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session'; 
import connectDB from './mongodbConnection/database.js'; 
import mainRoutes from './routes/main.routes.js';
import adminRoutes from './routes/Admin.routes.js';
import studentRoutes from './routes/student.routes.js';
import cors from 'cors'; // Add cors middleware

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : '*', 
    },
});

// Middleware
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'your_secret_key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: process.env.NODE_ENV === 'production' }, 
    })
);

// CORS setup
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : '*',
};
app.use(cors(corsOptions));

// MongoDB Connection
(async () => {
    try {
        if (connectDB) {
            await connectDB(); 
        } else {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
})();

// Socket.IO Setup
const facultySockets = {};

io.on('connection', (socket) => {
    console.log('A new client connected:', socket.id);

    // When a faculty member connects, store their socket ID with facultyId
    socket.on('facultyConnected', (facultyId) => {
        facultySockets[facultyId] = socket.id;
        console.log(`Faculty connected: ${facultyId}, Socket ID: ${socket.id}`);
    });

    // When a student sends a message to a specific faculty
    socket.on('sendMessageToFaculty', (data) => {
        const { facultyId, studentId, message } = data;

        // Check if the faculty is connected
        if (facultySockets[facultyId]) {
            // Emit the message to the specific faculty
            io.to(facultySockets[facultyId]).emit('studentMessage', {
                studentId: studentId,
                message: message,
            });
            console.log(`Message sent to Faculty ${facultyId}`);
        } else {
            console.log('Faculty is not connected');
        }
    });

    // Disconnect handling
    socket.on('disconnect', () => {
        // Remove the faculty from the mapping when they disconnect
        for (let facultyId in facultySockets) {
            if (facultySockets[facultyId] === socket.id) {
                delete facultySockets[facultyId];
                console.log(`Faculty disconnected: ${facultyId}`);
            }
        }
    });

    // Listen for assignment completion
    socket.on('assignmentCompleted', (data) => {
        console.log('Assignment Completed:', data);
        socket.broadcast.emit('facultyNotification', {
            message: `Student completed assignments. Message: ${data.message}`,
            facultyId: data.facultyId,
            studentId: data.studentId,
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Routes
app.use('/api/faculty', mainRoutes); 
app.use('/api/admin', adminRoutes); 
app.use('/api/students', studentRoutes); 

// Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
