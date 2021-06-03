function validateForm() {
	const studentInput = document.getElementById('student');
	const subjNameInput = document.getElementById('subjName');
	const gradeInput = document.getElementById('grade');
	const teacherInput = document.getElementById('teacher');
	const gradeDateInput = document.getElementById('gradeDate');

	const errorStudent = document.getElementById('errorStudent');
	const errorSubjName = document.getElementById('errorSubjName');
	const errorGrade = document.getElementById('errorGrade');
	const errorTeacher = document.getElementById('errorTeacher');
	const errorGradeDate = document.getElementById('errorGradeDate');
	const errorsSummary = document.getElementById('errorsSummary');

	resetErrors(
		[studentInput, subjNameInput, gradeInput, teacherInput, gradeDateInput],
		[errorStudent, errorSubjName, errorGrade, errorTeacher, errorGradeDate],
		errorsSummary
	);

	let valid = true;

	// student
	if (studentInput.selectedIndex === 0) {
		valid = false;
		studentInput.classList.add('error-input');
		errorStudent.innerText = 'The field is required';
	}

	// subject name
	if (subjNameInput.selectedIndex === 0) {
		valid = false;
		subjNameInput.classList.add('error-input');
		errorSubjName.innerText = 'The field is required';
	}

	// grade
	// if (gradeInput.selectedIndex === 0) {
	// 	valid = false;
	// 	gradeInput.classList.add('error-input');
	// 	errorGrade.innerText = 'The field is required';
	// }

	// teacher
	if (!checkRequired(teacherInput.value)) {
		valid = false;
		teacherInput.classList.add('error-input');
		errorTeacher.innerText = 'The field is required';
	} else if (!checkTextLengthRange(teacherInput.value, 2, 50)) {
		valid = false;
		teacherInput.classList.add('error-input');
		errorTeacher.innerText = 'The field should contain from 2 to 50 characters';
	}

	// grade date
	let nowDate = new Date(),
		month = '' + (nowDate.getMonth() + 1),
		day = '' + nowDate.getDate(),
		year = nowDate.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	const nowString = [year, month, day].join('-');

	if (!checkRequired(gradeDateInput.value)) {
		valid = false;
		gradeDateInput.classList.add('error-input');
		errorGradeDate.innerText = 'The field is required';
	} else if (!checkDate(gradeDateInput.value)) {
		valid = false;
		gradeDateInput.classList.add('error-input');
		errorGradeDate.innerText = 'The field should contain the date in the yyyy-MM-dd format (e.g. 2000-01-01)';
	} else if (checkDateIfAfter(gradeDateInput.value, nowString)) {
		valid = false;
		gradeDateInput.classList.add('error-input');
		errorGradeDate.innerText = 'The date cannot be from the future';
	}

	if (!valid) {
		errorsSummary.innerText = 'The form contains errors';
	}

	return valid;
}
