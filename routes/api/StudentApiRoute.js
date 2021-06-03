const express = require('express');
const router = express.Router();

let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

const studApiController = require('../../api/StudentAPI');

router.get('/', studApiController.getStudents);
router.get('/:studId', studApiController.getStudentById);
router.post('/', jsonParser, studApiController.createStudent);
router.put('/:studId', jsonParser, studApiController.updateStudent);
router.delete('/:studId', studApiController.deleteStudent);

module.exports = router;
