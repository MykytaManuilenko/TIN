const SubjectRepository = require('../repository/sequelize/SubjectRepository');

exports.showSubjectsList = (req, res, next) => {
	SubjectRepository.getSubjects().then((subjects) => {
		res.render('pages/subject/list', {
			subjects: subjects,
			navLocation: 'subj',
		});
	});
};

exports.showAddSubjectForm = (req, res, next) => {
	res.render('pages/subject/form', {
		subject: {},
		pageTitle: 'New subject',
		formMode: 'createNew',
		btnLabel: 'Add new subject',
		formAction: '/subjects/add',
		navLocation: 'subject',
		validationErrors: [],
	});
};

exports.showSubjectDetails = (req, res, next) => {
	const subjId = req.params.subjId;
	SubjectRepository.getSubjectById(subjId).then((subject) => {
		res.render('pages/subject/details', {
			subject: subject,
			formMode: 'showDetails',
			pageTitle: 'Subject Details',
			formAction: '',
			navLocation: 'subject',
		});
	});
};

exports.showEditSubjectForm = (req, res, next) => {
	const subjId = req.params.subjId;
	SubjectRepository.getSubjectById(subjId).then((subject) => {
		res.render('pages/subject/form', {
			subject: subject,
			formMode: 'edit',
			pageTitle: 'Edit Subject',
			btnLabel: 'Edit',
			formAction: '/subjects/edit',
			navLocation: 'subject',
			validationErrors: [],
		});
	});
};

exports.addSubject = (req, res, next) => {
	const subjectData = { ...req.body };
	SubjectRepository.createSubject(subjectData)
		.then((result) => {
			res.redirect('/subjects');
		})
		.catch((err) => {
			err.errors.forEach((e) => {
				if (e.path.includes('subjectName') && e.type == 'unique violation') {
					e.message = 'The subject name you entered is already in use';
				}
			});

			err.errors.forEach((e) => {
				if (e.path.includes('code') && e.type == 'unique violation') {
					e.message = 'The code you entered is already in use';
				}
			});

			res.render('pages/subject/form', {
				subject: subjectData,
				pageTitle: 'New subject',
				formMode: 'createNew',
				btnLabel: 'Add new subject',
				formAction: '/subjects/add',
				navLocation: 'subject',
				validationErrors: err.errors,
			});
		});
};

exports.updateSubject = (req, res, next) => {
	const subjectId = req.body._id;
	const subjectData = { ...req.body };
	SubjectRepository.updateSubject(subjectId, subjectData)
		.then((result) => {
			res.redirect('/subjects');
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

			console.log(subjectData);

			res.render('pages/subject/form', {
				subject: subjectData,
				formMode: 'edit',
				pageTitle: 'Edit Subject',
				btnLabel: 'Edit',
				formAction: '/subjects/edit',
				navLocation: 'subject',
				validationErrors: err.errors,
			});
		});
};

exports.deleteSubject = (req, res, next) => {
	const subjectId = req.params.subjId;
	SubjectRepository.deleteSubject(subjectId).then(() => {
		res.redirect('/subjects');
	});
};
