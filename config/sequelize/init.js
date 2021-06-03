const sequelize = require('./sequelize');

const Student = require('../../model/sequelize/Student');
const Subject = require('../../model/sequelize/Subject');
const Grade = require('../../model/sequelize/Grade');

module.exports = () => {
	Student.hasMany(Grade, {
		as: 'grades',
		foreignKey: { name: 'stud_id', allowNull: false },
		constraints: true,
		onDelete: 'CASCADE',
	});
	Grade.belongsTo(Student, {
		as: 'student',
		foreignKey: { name: 'stud_id', allowNull: false },
	});

	Subject.hasMany(Grade, {
		as: 'grades',
		foreignKey: { name: 'subj_id', allowNull: false },
		constraints: true,
		onDelete: 'CASCADE',
	});
	Grade.belongsTo(Subject, {
		as: 'subject',
		foreignKey: { name: 'subj_id', allowNull: false },
	});

	let allStudents, allSubjects;
	return sequelize
		.sync({ force: true })
		.then(() => {
			return Student.findAll();
		})
		.then((students) => {
			if (!students || students.length === 0) {
				return Student.bulkCreate([
					{
						firstName: 'Mykyta',
						lastName: 'Manuilenko',
						studentNumber: 's19504',
						dateOfBirth: '2001-09-04',
						email: 's19504@pjwstk.edu.pl',
						phoneNumber: null,
						gender: 'Male',
						currentSemester: 5,
					},
					{
						firstName: 'Jan',
						lastName: 'Kowalski',
						studentNumber: 's12345',
						dateOfBirth: '2000-09-04',
						email: 's12345@pjwstk.edu.pl',
						phoneNumber: '763784867',
						gender: 'Male',
						currentSemester: 2,
					},
					{
						firstName: 'Pola',
						lastName: 'Zielińska',
						studentNumber: 's21345',
						dateOfBirth: '2002-09-04',
						email: 's21345@pjwstk.edu.pl',
						phoneNumber: null,
						gender: 'Female',
						currentSemester: 3,
					},
				]).then(() => {
					return Student.findAll();
				});
			} else {
				return students;
			}
		})
		.then((students) => {
			allStudents = students;
			return Subject.findAll();
		})
		.then((subjects) => {
			if (!subjects || subjects.length === 0) {
				return Subject.bulkCreate([
					{
						subjectName: 'Calculus',
						code: 'AM',
						semester: 1,
						ECTS: 6,
						courseType: 'Compulsory',
						specialization: 'None',
					},
					{
						subjectName: 'Database applications',
						code: 'APBD',
						semester: 4,
						ECTS: 6,
						courseType: 'Compulsory',
						specialization: 'None',
					},
					{
						subjectName: 'Project 1',
						code: 'PRO1',
						semester: 5,
						ECTS: 7,
						courseType: 'Specialization',
						specialization: 'Databases',
					},
				]).then(() => {
					return Subject.findAll();
				});
			} else {
				return subjects;
			}
		})
		.then((subjects) => {
			allSubjects = subjects;
			return Grade.findAll();
		})
		.then((grades) => {
			if (!grades || grades.length === 0) {
				return Grade.bulkCreate([
					{
						stud_id: allStudents[0]._id, // 1 1
						subj_id: allSubjects[0]._id,
						grade: 5,
						teacher: 'Paul Gauguin',
						date: '2020-09-04',
					},
					{
						stud_id: allStudents[0]._id, // 1 2
						subj_id: allSubjects[1]._id,
						grade: 4.5,
						teacher: 'Henri Matisse',
						date: '2020-09-06',
					},
					{
						stud_id: allStudents[1]._id, // 2 1
						subj_id: allSubjects[0]._id,
						grade: 3.5,
						teacher: 'Paul Gauguin',
						date: '2020-09-01',
					},
					{
						stud_id: allStudents[1]._id, // 2 3
						subj_id: allSubjects[2]._id,
						grade: 4.5,
						teacher: 'Henri Matisse',
						date: '2020-09-03',
					},
				]);
			} else {
				return grades;
			}
		});
};
