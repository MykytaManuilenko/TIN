function validateForm() {
	const subjNameInput = document.getElementById('subjName');
	const subjCodeInput = document.getElementById('subjCode');
	const semesterInput = document.getElementById('semester');
	const ectsInput = document.getElementById('ects');
	const courseTypeInput = document.getElementById('courseType');
	const specializationInput = document.getElementById('specialization');

	const errorSubjName = document.getElementById('errorSubjName');
	const errorSubjCode = document.getElementById('errorSubjCode');
	const errorSemester = document.getElementById('errorSemester');
	const errorEcts = document.getElementById('errorEcts');
	const errorCourseType = document.getElementById('errorCourseType');
	const errorSpecialization = document.getElementById('errorSpecialization');
	const errorsSummary = document.getElementById('errorsSummary');

	resetErrors(
		[subjNameInput, subjCodeInput, semesterInput, ectsInput, courseTypeInput, specializationInput],
		[errorSubjName, errorSubjCode, errorSemester, errorEcts, errorCourseType, errorSpecialization],
		errorsSummary
	);

	let valid = true;

	// subject name
	if (!checkRequired(subjNameInput.value)) {
		valid = false;
		subjNameInput.classList.add('error-input');
		errorSubjName.innerText = 'The field is required';
	} else if (!checkTextLengthRange(subjNameInput.value, 2, 25)) {
		valid = false;
		subjNameInput.classList.add('error-input');
		errorSubjName.innerText = 'The field should contain from 2 to 25 characters';
	}

	// subject code
	if (!checkRequired(subjCodeInput.value)) {
		valid = false;
		subjCodeInput.classList.add('error-input');
		errorSubjCode.innerText = 'The field is required';
	} else if (!checkTextLengthRange(subjCodeInput.value, 2, 5)) {
		valid = false;
		subjCodeInput.classList.add('error-input');
		errorSubjCode.innerText = 'The field should contain from 2 to 5 characters';
	}

	// semester
	if (semesterInput.selectedIndex === 0) {
		valid = false;
		semesterInput.classList.add('error-input');
		errorSemester.innerText = 'The field is required';
	}

	// ECTS
	if (ectsInput.selectedIndex === 0) {
		valid = false;
		ectsInput.classList.add('error-input');
		errorEcts.innerText = 'The field is required';
	}

	// course type
	if (courseTypeInput.selectedIndex === 0) {
		valid = false;
		courseTypeInput.classList.add('error-input');
		errorCourseType.innerText = 'The field is required';
	}

	// specialization
	if (specializationInput.selectedIndex === 0) {
		valid = false;
		specializationInput.classList.add('error-input');
		errorSpecialization.innerText = 'if you do not want to choose a specialization select "None"';
	}

	if (!valid) {
		errorsSummary.innerText = 'The form contains errors';
	}

	return valid;
}
