const GradeRepository = require('../repository/sequelize/GradeRepository');
const StudentRepository = require('../repository/sequelize/StudentRepository');
const SubjectRepository = require('../repository/sequelize/SubjectRepository');

exports.showGradesList = (req, res, next) => {
	GradeRepository.getGrades().then((grades) => {
		res.render('pages/grade/list', {
			grades: grades,
			navLocation: 'grade',
		});
	});
};

exports.showAddGradeForm = (req, res, next) => {
	let allStudents, allSubjects;

	StudentRepository.getStudents()
		.then((students) => {
			allStudents = students;
			return SubjectRepository.getSubjects();
		})
		.then((subjects) => {
			allSubjects = subjects;
			res.render('pages/grade/form', {
				grade: {},
				formMode: 'createNew',
				allStudents: allStudents,
				allSubjects: allSubjects,
				pageTitle: 'New grade',
				btnLabel: 'Add',
				formAction: '/grades/add',
				navLocation: 'grade',
				validationErrors: [],
			});
		});
};

exports.showGradeDetails = (req, res, next) => {
	const gradeId = req.params.gradeId;
	GradeRepository.getGradeById(gradeId).then((grade) => {
		res.render('pages/grade/details', {
			grade: grade,
			formMode: 'showDetails',
			pageTitle: 'Grade Details',
			formAction: '',
			navLocation: 'grade',
		});
	});
};

exports.showEditGradeForm = (req, res, next) => {
	const gradeId = req.params.gradeId;

	StudentRepository.getStudents()
		.then((students) => {
			allStudents = students;
			return SubjectRepository.getSubjects();
		})
		.then((subjects) => {
			allSubjects = subjects;
			return GradeRepository.getGradeById(gradeId);
		})
		.then((grade) => {
			res.render('pages/grade/form', {
				grade: grade,
				formMode: 'edit',
				allStudents: allStudents,
				allSubjects: allSubjects,
				pageTitle: 'Edit Grade',
				btnLabel: 'Edit',
				formAction: '/grades/edit',
				navLocation: 'grade',
				validationErrors: [],
			});
		});
};

exports.addGrade = (req, res, next) => {
	const gradeData = { ...req.body };

	if (gradeData.student === 'Choose student') {
		gradeData.stud_id = -1;
	}

	if (gradeData.subjectName === 'Choose subject') {
		gradeData.subj_id = -1;
	}

	if (gradeData.grade === 'Choose grade') {
		gradeData.grade = 0.0;
	}

	GradeRepository.createGrade(gradeData)
		.then((result) => {
			res.redirect('/grades');
		})
		.catch((err) => {
			let allStudents, allSubjects;

			StudentRepository.getStudents()
				.then((students) => {
					allStudents = students;
					return SubjectRepository.getSubjects();
				})
				.then((subjects) => {
					allSubjects = subjects;
					res.render('pages/grade/form', {
						grade: gradeData,
						formMode: 'createNew',
						allStudents: allStudents,
						allSubjects: allSubjects,
						pageTitle: 'New grade',
						btnLabel: 'Add',
						formAction: '/grades/add',
						navLocation: 'grade',
						validationErrors: err.errors,
					});
				});
		});
};

exports.updateGrade = (req, res, next) => {
	const gradeId = req.body._id;
	const gradeData = { ...req.body };

	if (gradeData.student === 'Choose student') {
		gradeData.stud_id = -1;
	}

	if (gradeData.subjectName === 'Choose subject') {
		gradeData.subj_id = -1;
	}

	if (gradeData.grade === 'Choose grade') {
		gradeData.grade = 0.0;
	}

	GradeRepository.updateGrade(gradeId, gradeData)
		.then((result) => {
			res.redirect('/grades');
		})
		.catch((err) => {
			let allStudents, allSubjects;

			StudentRepository.getStudents()
				.then((students) => {
					allStudents = students;
					return SubjectRepository.getSubjects();
				})
				.then((subjects) => {
					allSubjects = subjects;
					return GradeRepository.getGradeById(gradeId);
				})
				.then((grade) => {
					res.render('pages/grade/form', {
						grade: grade,
						formMode: 'edit',
						allStudents: allStudents,
						allSubjects: allSubjects,
						pageTitle: 'Edit Grade',
						btnLabel: 'Edit',
						formAction: '/grades/edit',
						navLocation: 'grade',
						validationErrors: err.errors,
					});
				});
		});
};

exports.deleteGrade = (req, res, next) => {
	const gradeId = req.params.gradeId;
	GradeRepository.deleteGrade(gradeId).then(() => {
		res.redirect('/grades');
	});
};
