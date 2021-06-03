const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');

router.get('/', gradeController.showGradesList);
router.get('/add', gradeController.showAddGradeForm);
router.get('/edit/:gradeId', gradeController.showEditGradeForm);
router.get('/details/:gradeId', gradeController.showGradeDetails);

router.post('/add', gradeController.addGrade);
router.post('/edit', gradeController.updateGrade);
router.get('/delete/:gradeId', gradeController.deleteGrade);

module.exports = router;
