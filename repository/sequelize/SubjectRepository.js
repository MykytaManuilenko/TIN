const Student = require('../../model/sequelize/Student');
const Grade = require('../../model/sequelize/Grade');
const Subject = require('../../model/sequelize/Subject');

exports.getSubjects = () => {
	return Subject.findAll();
};

exports.getSubjectById = (subjId) => {
	return Subject.findByPk(subjId, {
		include: [
			{
				model: Grade,
				as: 'grades',
				include: [
					{
						model: Student,
						as: 'student',
					},
				],
			},
		],
	});
};

exports.createSubject = (newSubjData) => {
	return Subject.create({
		subjectName: newSubjData.subjectName,
		code: newSubjData.code,
		semester: newSubjData.semester,
		ECTS: newSubjData.ECTS,
		courseType: newSubjData.courseType,
		specialization: newSubjData.specialization,
	});
};

exports.updateSubject = (subjId, subjData) => {
	return Subject.update(subjData, { where: { _id: subjId } });
};

exports.deleteSubject = (subjId) => {
	return Subject.destroy({
		where: { _id: subjId },
	});
};
