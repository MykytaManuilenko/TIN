const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Subject = sequelize.define('Subject', {
	_id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	subjectName: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: {
				msg: 'The field is required',
			},
			len: {
				args: [2, 25],
				msg: 'The field should contain from 2 to 25 characters',
			},
		},
	},
	code: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: {
				msg: 'The field is required',
			},
			len: {
				args: [2, 5],
				msg: 'The field should contain from 2 to 5 characters',
			},
		},
	},
	semester: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isInt: {
				msg: 'The field must contain only integers',
			},
			isNotEmpty(value) {
				if (value === 'Choose semester') {
					throw new Error('The field is required');
				}
			},
		},
	},
	ECTS: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isInt: {
				msg: 'The field must contain only integers',
			},
			isNotEmpty(value) {
				if (value === 'Choose ECTS') {
					throw new Error('The field is required');
				}
			},
		},
	},
	courseType: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isNotEmpty(value) {
				if (value === 'Choose course type') {
					throw new Error('The field is required');
				}
			},
		},
	},
	specialization: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			isNotEmpty(value) {
				if (value === 'Choose specialization') {
					throw new Error('The field is required');
				}
			},
		},
	},
});

module.exports = Subject;
