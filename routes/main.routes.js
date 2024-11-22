import express from 'express'; // Use `import` for ES Modules
import mainController from '../controller/main.controller.js'; // Ensure controller is exported correctly

const router = express.Router();

// Add faculty details
router.post('/', mainController.addFaculty);

// Get faculty details by year
router.get('/:year', mainController.getFacultyByYear);

// Get all faculty details
router.get('/', mainController.getAllFaculty);

// Use `export default` to export the router
export default router;
