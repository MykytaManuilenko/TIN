const StudentRepository = require('../repository/sequelize/StudentRepository');

exports.getStudents = (req, res, next) => {
	StudentRepository.getStudents()
		.then((studs) => {
			res.status(200).json(studs);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getStudentById = (req, res, next) => {
	const studId = req.params.studId;
	StudentRepository.getStudentById(studId).then((student) => {
		if (!student) {
			res.status(404).json({
				message: 'Student with id: ' + studId + ' not found',
			});
		} else {
			res.status(200).json(student);
		}
	});
};

exports.createStudent = (req, res, next) => {
	StudentRepository.createStudent(req.body)
		.then((newStudent) => {
			res.status(201).json(newStudent);
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.updateStudent = (req, res, next) => {
	const studId = req.params.studId;
	StudentRepository.updateStudent(studId, req.body)
		.then((result) => {
			res.status(200).json({ message: 'Student updated!', student: result });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.deleteStudent = (req, res, next) => {
	const studId = req.params.studId;
	StudentRepository.deleteStudent(studId)
		.then((result) => {
			res.status(200).json({ message: 'Removed student', student: result });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};
