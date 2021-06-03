const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Grade = sequelize.define('Grade', {
	_id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	grade: {
		type: Sequelize.DECIMAL(2, 1),
		allowNull: true,
		// validate: {
		// 	isNotEmpty(value) {
		// 		if (value === 'Choose grade') {
		// 			throw new Error('The field is required');
		// 		}
		// 	},
		// },
	},
	teacher: {
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
	date: {
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
	stud_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isInt: true,
			isNotEmpty(value) {
				if (value === -1) {
					throw new Error('The field is required');
				}
			},
		},
	},
	subj_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isInt: true,
			isNotEmpty(value) {
				if (value === -1) {
					throw new Error('The field is required');
				}
			},
		},
	},
});

module.exports = Grade;
