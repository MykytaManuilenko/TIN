const express = require('express');
const router = express.Router();

let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

const subjApiController = require('../../api/SubjectAPI');

router.get('/', subjApiController.getSubjects);
router.get('/:subjId', subjApiController.getSubjectById);
router.post('/', jsonParser, subjApiController.createSubject);
router.put('/:subjId', jsonParser, subjApiController.updateSubject);
router.delete('/:subjId', subjApiController.deleteSubject);

module.exports = router;
