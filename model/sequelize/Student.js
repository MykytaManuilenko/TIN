const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Student = sequelize.define('Student', {
	_id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'The field is required',
			},
			len: {
				args: [2, 50],
				msg: 'The field should contain from 2 to 50 characters',
			},
		},
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'The field is required',
			},
			len: {
				args: [2, 50],
				msg: 'The field should contain from 2 to 50 characters',
			},
		},
	},
	studentNumber: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: {
				msg: 'The field is required',
			},
			len: {
				args: [2, 50],
				msg: 'The field should contain from 2 to 50 characters',
			},
		},
	},
	dateOfBirth: {
		type: Sequelize.DATE,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'The field is required',
			},
			isDate: {
				msg: 'The field should contain the date in the yyyy-MM-dd format (e.g. 2000-01-01)',
			},
			isBefore: {
				args: new Date().toJSON().slice(0, 10).toString(),
				msg: 'The date cannot be from the future',
			},
		},
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: {
				msg: 'The field is required',
			},
			isEmail: {
				msg: 'The field should contain a valid e-mail address',
			},
			len: {
				args: [12, 50],
				msg: 'The field should contain from 12 to 50 characters',
			},
		},
	},
	phoneNumber: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			isPhoneNumber(value) {
				if (value) {
					const pattern = /^\d+$/;
					value = value.replace(/\s/g, '');

					if (!pattern.test(value)) {
						throw new Error('phone number should contain only numbers e.g. 123 456 789');
					}
				}
			},
		},
	},
	gender: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isNotEmpty(value) {
				if (value === 'Choose gender') {
					throw new Error('The field is required');
				}
			},
		},
	},
	currentSemester: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});

module.exports = Student;
