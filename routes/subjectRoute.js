const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

router.get('/', subjectController.showSubjectsList);
router.get('/add', subjectController.showAddSubjectForm);
router.get('/edit/:subjId', subjectController.showEditSubjectForm);
router.get('/details/:subjId', subjectController.showSubjectDetails);

router.post('/add', subjectController.addSubject);
router.post('/edit', subjectController.updateSubject);
router.get('/delete/:subjId', subjectController.deleteSubject);

module.exports = router;
