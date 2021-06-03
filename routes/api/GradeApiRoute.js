const express = require('express');
const router = express.Router();

let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

const gradeApiController = require('../../api/GradeAPI');

router.get('/', gradeApiController.getGrades);
router.get('/:gradeId', gradeApiController.getGradeById);
router.post('/', jsonParser, gradeApiController.createGrade);
router.put('/:gradeId', jsonParser, gradeApiController.updateGrade);
router.delete('/:gradeId', gradeApiController.deleteGrade);
router.patch('/deleteManyGrades', jsonParser, gradeApiController.deleteManyGrades);

module.exports = router;
