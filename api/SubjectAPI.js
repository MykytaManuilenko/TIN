const SubjectRepository = require('../repository/sequelize/SubjectRepository');

exports.getSubjects = (req, res, next) => {
	SubjectRepository.getSubjects()
		.then((subjects) => {
			res.status(200).json(subjects);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getSubjectById = (req, res, next) => {
	const subjId = req.params.subjId;
	SubjectRepository.getSubjectById(subjId).then((subject) => {
		if (!subject) {
			res.status(404).json({
				message: 'Subject with id: ' + subjId + ' not found',
			});
		} else {
			res.status(200).json(subject);
		}
	});
};

exports.createSubject = (req, res, next) => {
	SubjectRepository.createSubject(req.body)
		.then((newSubject) => {
			res.status(201).json(newSubject);
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.updateSubject = (req, res, next) => {
	const subjId = req.params.subjId;
	SubjectRepository.updateSubject(subjId, req.body)
		.then((result) => {
			res.status(200).json({ message: 'Subject updated!', subject: result });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.deleteSubject = (req, res, next) => {
	const subjId = req.params.subjId;
	SubjectRepository.deleteSubject(subjId)
		.then((result) => {
			res.status(200).json({ message: 'Removed subject', subject: result });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};
