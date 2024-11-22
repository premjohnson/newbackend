import main from '../Model/main.model.js';  // Changed import to refer to the "main" model

// Add Faculty Details
export const addFaculty = async (req, res) => {
    try {
        const { year, name, subject } = req.body;

        if (!year || !name || !subject) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const newFaculty = new main({ year, name, subject });  // Changed "Main" to "main"
        await newFaculty.save();

        return res.status(201).json({ message: 'Faculty details added successfully!', data: newFaculty });
    } catch (error) {
        console.error('Error adding faculty:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
    }
};

// Get Faculty Details by Year
export const getFacultyByYear = async (req, res) => {
    try {
        const { year } = req.params;

        const faculties = await main.find({ year });  // Changed "Main" to "main"
        if (!faculties.length) {
            return res.status(404).json({ message: 'No faculty found for the specified year.' });
        }

        return res.status(200).json(faculties);
    } catch (error) {
        console.error('Error fetching faculty:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
    }
};

// Get All Faculty Details
export const getAllFaculty = async (req, res) => {
    try {
        const faculties = await main.find();  // Changed "Main" to "main"
        return res.status(200).json(faculties);
    } catch (error) {
        console.error('Error fetching all faculties:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
    }
};



export default { addFaculty, getFacultyByYear, getAllFaculty, getFacultyByYear };  // Exporting all methods as default
