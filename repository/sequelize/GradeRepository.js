const Sequelize = require('sequelize');

const Grade = require('../../model/sequelize/Grade');
const Student = require('../../model/sequelize/Student');
const Subject = require('../../model/sequelize/Subject');

exports.getGrades = () => {
	return Grade.findAll({
		include: [
			{
				model: Student,
				as: 'student',
			},
			{
				model: Subject,
				as: 'subject',
			},
		],
	});
};

exports.getGradeById = (gradeId) => {
	return Grade.findByPk(gradeId, {
		include: [
			{
				model: Student,
				as: 'student',
			},
			{
				model: Subject,
				as: 'subject',
			},
		],
	});
};

exports.createGrade = (data) => {
	if (data.stud_id === -1 && data.subj_id === -1) {
		return Grade.create({
			grade: data.grade,
			teacher: data.teacher,
			date: data.date,
			stud_id: data.stud_id,
			subj_id: data.subj_id,
		});
	} else if (data.stud_id === -1) {
		let subjectId;

		return Subject.findOne({
			where: {
				subjectName: data.subjectName,
			},
		})
			.then((subj) => {
				subjectId = subj._id;
			})
			.then(() => {
				return Grade.create({
					grade: data.grade,
					teacher: data.teacher,
					date: data.date,
					stud_id: data.stud_id,
					subj_id: subjectId,
				});
			});
	} else if (data.subj_id === -1) {
		let studentId;

		return Student.findOne({
			where: {
				studentNumber: data.student.split(' ')[2],
			},
		})
			.then((stud) => {
				studentId = stud._id;
			})
			.then(() => {
				return Grade.create({
					grade: data.grade,
					teacher: data.teacher,
					date: data.date,
					stud_id: studentId,
					subj_id: data.subj_id,
				});
			});
	} else {
		let studentId, subjectId;

		return Student.findOne({
			where: {
				studentNumber: data.student.split(' ')[2],
			},
		})
			.then((stud) => {
				studentId = stud._id;
			})
			.then(() => {
				return Subject.findOne({
					where: {
						subjectName: data.subjectName,
					},
				}).then((subj) => {
					subjectId = subj._id;
				});
			})
			.then(() => {
				return Grade.create({
					grade: data.grade,
					teacher: data.teacher,
					date: data.date,
					stud_id: studentId,
					subj_id: subjectId,
				});
			});
	}
};

exports.updateGrade = (gradeId, data) => {
	if (data.stud_id === -1 && data.subj_id === -1) {
		return Grade.update(data, { where: { _id: gradeId } });
	} else if (data.stud_id === -1) {
		let subjectId;

		return Subject.findOne({
			where: {
				subjectName: data.subjectName,
			},
		})
			.then((subj) => {
				subjectId = subj._id;
			})
			.then(() => {
				data.subj_id = subjectId;
				return Grade.update(data, { where: { _id: gradeId } });
			});
	} else if (data.subj_id === -1) {
		let studentId;

		return Student.findOne({
			where: {
				studentNumber: data.student.split(' ')[2],
			},
		})
			.then((stud) => {
				studentId = stud._id;
			})
			.then(() => {
				data.stud_id = studentId;
				return Grade.update(data, { where: { _id: gradeId } });
			});
	} else {
		let studentId, subjectId;

		return Student.findOne({
			where: {
				studentNumber: data.student.split(' ')[2],
			},
		})
			.then((stud) => {
				studentId = stud._id;
			})
			.then(() => {
				return Subject.findOne({
					where: {
						subjectName: data.subjectName,
					},
				}).then((subj) => {
					subjectId = subj._id;
				});
			})
			.then(() => {
				data.subj_id = subjectId;
				data.stud_id = studentId;
				return Grade.update(data, { where: { _id: gradeId } });
			});
	}
};

exports.deleteGrade = (gradeId) => {
	return Grade.destroy({
		where: { _id: gradeId },
	});
};

exports.deleteManyGrades = (gradeIds) => {
	return Grade.find({ _id: { [Sequelize.Op.in]: gradeIds } });
};
