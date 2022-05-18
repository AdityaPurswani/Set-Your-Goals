const express = require('express');
const router = express.Router();
const { getGoals, setGoals, deleteGoals, updateGoals } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, setGoals).get(protect, getGoals);
router.route('/:id').delete(protect, deleteGoals).put(protect, updateGoals);

module.exports = router;