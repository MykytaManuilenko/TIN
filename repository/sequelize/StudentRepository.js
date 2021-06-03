const Student = require('../../model/sequelize/Student');
const Grade = require('../../model/sequelize/Grade');
const Subject = require('../../model/sequelize/Subject');

exports.getStudents = () => {
	return Student.findAll();
};

exports.getStudentById = (studId) => {
	return Student.findByPk(studId, {
		include: [
			{
				model: Grade,
				as: 'grades',
				include: [
					{
						model: Subject,
						as: 'subject',
					},
				],
			},
		],
	});
};

exports.createStudent = (newStudData) => {
	return Student.create({
		firstName: newStudData.firstName,
		lastName: newStudData.lastName,
		studentNumber: newStudData.studentNumber,
		dateOfBirth: newStudData.dateOfBirth,
		email: newStudData.email,
		phoneNumber: newStudData.phoneNumber,
		gender: newStudData.gender,
		currentSemester: 1,
	});
};

exports.updateStudent = (studId, studData) => {
	return Student.update(studData, { where: { _id: studId } });
};

exports.deleteStudent = (studId) => {
	return Student.destroy({
		where: { _id: studId },
	});
};
