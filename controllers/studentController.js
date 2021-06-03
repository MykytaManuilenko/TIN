const StudentRepository = require('../repository/sequelize/StudentRepository');

exports.showStudentsList = (req, res, next) => {
	StudentRepository.getStudents().then((students) => {
		res.render('pages/student/list', {
			students: students,
			navLocation: 'stud',
		});
	});
};

exports.showAddStudentForm = (req, res, next) => {
	res.render('pages/student/form', {
		student: {},
		pageTitle: 'New student',
		formMode: 'createNew',
		btnLabel: 'Add new student',
		formAction: '/students/add',
		navLocation: 'student',
		validationErrors: [],
	});
};

exports.showStudentDetails = (req, res, next) => {
	const studId = req.params.studentId;
	StudentRepository.getStudentById(studId).then((student) => {
		res.render('pages/student/details', {
			student: student,
			formMode: 'showDetails',
			pageTitle: 'Student Details',
			formAction: '',
			navLocation: 'student',
		});
	});
};

exports.showEditStudentForm = (req, res, next) => {
	const studId = req.params.studentId;
	StudentRepository.getStudentById(studId).then((student) => {
		res.render('pages/student/form', {
			student: student,
			formMode: 'edit',
			pageTitle: 'Edit Student',
			btnLabel: 'Edit',
			formAction: '/students/edit',
			navLocation: 'student',
			validationErrors: [],
		});
	});
};

exports.addStudent = (req, res, next) => {
	const studentData = { ...req.body };

	StudentRepository.createStudent(studentData)
		.then((result) => {
			res.redirect('/students');
		})
		.catch((err) => {
			err.errors.forEach((e) => {
				if (e.path.includes('studentNumber') && e.type == 'unique violation') {
					e.message = 'The student number you entered is already in use';
				}
			});

			err.errors.forEach((e) => {
				if (e.path.includes('email') && e.type == 'unique violation') {
					e.message = 'The email address you entered is already in use';
				}
			});

			res.render('pages/student/form', {
				student: studentData,
				pageTitle: 'New student',
				formMode: 'createNew',
				btnLabel: 'Add new student',
				formAction: '/students/add',
				navLocation: 'student',
				validationErrors: err.errors,
			});
		});
};

exports.updateStudent = (req, res, next) => {
	const studentId = req.body._id;
	const studentData = { ...req.body };

	StudentRepository.updateStudent(studentId, studentData)
		.then((result) => {
			res.redirect('/students');
		})
		.catch((err) => {
			err.errors.forEach((e) => {
				if (e.path.includes('studentNumber') && e.type == 'unique violation') {
					e.message = 'The student number you entered is already in use';
				}
			});

			err.errors.forEach((e) => {
				if (e.path.includes('email') && e.type == 'unique violation') {
					e.message = 'The email address you entered is already in use';
				}
			});

			res.render('pages/student/form', {
				student: studentData,
				formMode: 'edit',
				pageTitle: 'Edit Student',
				btnLabel: 'Edit',
				formAction: '/students/edit',
				navLocation: 'student',
				validationErrors: err.errors,
			});
		});
};

exports.deleteStudent = (req, res, next) => {
	const studentId = req.params.studentId;
	StudentRepository.deleteStudent(studentId).then(() => {
		res.redirect('/students');
	});
};
