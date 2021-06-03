const GradeRepository = require('../repository/sequelize/GradeRepository');

exports.getGrades = (req, res, next) => {
	GradeRepository.getGrades()
		.then((grades) => {
			res.status(200).json(grades);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getGradeById = (req, res, next) => {
	const gradeId = req.params.gradeId;
	GradeRepository.getGradeById(gradeId).then((grade) => {
		if (!grade) {
			res.status(404).json({
				message: 'Grade with id: ' + gradeId + ' not found',
			});
		} else {
			res.status(200).json(grade);
		}
	});
};

exports.createGrade = (req, res, next) => {
	GradeRepository.createGrade(req.body)
		.then((newGrade) => {
			res.status(201).json(newGrade);
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.updateGrade = (req, res, next) => {
	const gradeId = req.params.gradeId;
	GradeRepository.updateGrade(gradeId, req.body)
		.then((result) => {
			res.status(200).json({ message: 'Grade updated!', grade: result });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.deleteGrade = (req, res, next) => {
	const gradeId = req.params.gradeId;
	GradeRepository.deleteGrade(gradeId)
		.then((result) => {
			res.status(200).json({ message: 'Removed grade', grade: result });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.deleteManyGrades = (req, res, next) => {
	GradeRepository.deleteManyGrades(req.body.idsToDelete)
		.then((result) => {
			res.status(200).json({ message: 'Removed grades', grades: result });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};
