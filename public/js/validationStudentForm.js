function validateForm() {
	const firstNameInput = document.getElementById('firstName');
	const lastNameInput = document.getElementById('surname');
	const studentNumInput = document.getElementById('snumber');
	const emailInput = document.getElementById('email');
	const dateOfBirthInput = document.getElementById('dateOfBirth');
	const phoneNrInput = document.getElementById('phoneNr');
	const genderInput = document.getElementById('gender');

	const errorFirstName = document.getElementById('errorFirstName');
	const errorLastName = document.getElementById('errorLastName');
	const errorStudentNumber = document.getElementById('errorStudentNumber');
	const errorEmail = document.getElementById('errorEmail');
	const errorDateOfBirth = document.getElementById('errorDateOfBirth');
	const errorPhoneNumber = document.getElementById('errorPhoneNumber');
	const errorGender = document.getElementById('errorGender');
	const errorsSummary = document.getElementById('errorsSummary');

	resetErrors(
		[firstNameInput, lastNameInput, studentNumInput, emailInput, dateOfBirthInput, phoneNrInput, genderInput],
		[
			errorFirstName,
			errorLastName,
			errorStudentNumber,
			errorEmail,
			errorDateOfBirth,
			errorPhoneNumber,
			errorGender,
		],
		errorsSummary
	);

	let valid = true;

	// First name
	if (!checkRequired(firstNameInput.value)) {
		valid = false;
		firstNameInput.classList.add('error-input');
		errorFirstName.innerText = 'The field is required';
	} else if (!checkTextLengthRange(firstNameInput.value, 2, 50)) {
		valid = false;
		firstNameInput.classList.add('error-input');
		errorFirstName.innerText = 'The field should contain from 2 to 50 characters';
	}

	// Last name
	if (!checkRequired(lastNameInput.value)) {
		valid = false;
		lastNameInput.classList.add('error-input');
		errorLastName.innerText = 'The field is required';
	} else if (!checkTextLengthRange(lastNameInput.value, 2, 50)) {
		valid = false;
		lastNameInput.classList.add('error-input');
		errorLastName.innerText = 'The field should contain from 2 to 50 characters';
	}

	// student number
	if (!checkRequired(studentNumInput.value)) {
		valid = false;
		studentNumInput.classList.add('error-input');
		errorStudentNumber.innerText = 'The field is required';
	} else if (!checkTextLengthRange(lastNameInput.value, 2, 50)) {
		valid = false;
		studentNumInput.classList.add('error-input');
		errorStudentNumber.innerText = 'The field should contain from 2 to 50 characters';
	}

	// e-mail
	if (!checkRequired(emailInput.value)) {
		valid = false;
		emailInput.classList.add('error-input');
		errorEmail.innerText = 'The field is required';
	} else if (!checkEmail(emailInput.value)) {
		valid = false;
		emailInput.classList.add('error-input');
		errorEmail.innerText = 'The field should contain a valid e-mail address';
	} else if (!checkTextLengthRange(emailInput.value, 12, 50)) {
		valid = false;
		emailInput.classList.add('error-input');
		errorEmail.innerText = 'The field should contain from 12 to 50 characters';
	}

	// date of birth
	let nowDate = new Date(),
		month = '' + (nowDate.getMonth() + 1),
		day = '' + nowDate.getDate(),
		year = nowDate.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	const nowString = [year, month, day].join('-');

	if (!checkRequired(dateOfBirthInput.value)) {
		valid = false;
		dateOfBirthInput.classList.add('error-input');
		errorDateOfBirth.innerText = 'The field is required';
	} else if (!checkDate(dateOfBirthInput.value)) {
		valid = false;
		dateOfBirthInput.classList.add('error-input');
		errorDateOfBirth.innerText = 'The field should contain the date in the yyyy-MM-dd format (e.g. 2000-01-01)';
	} else if (checkDateIfAfter(dateOfBirthInput.value, nowString)) {
		valid = false;
		dateOfBirthInput.classList.add('error-input');
		errorDateOfBirth.innerText = 'The date cannot be from the future';
	}

	// phone number
	if (phoneNrInput.value) {
		if (!checkPhoneNumber(phoneNrInput.value)) {
			valid = false;
			phoneNrInput.classList.add('error-input');
			errorPhoneNumber.innerText = 'phone number should contain only numbers e.g. 123 456 789';
		}
	}

	// gender
	if (genderInput.selectedIndex === 0) {
		valid = false;
		genderInput.classList.add('error-input');
		errorGender.innerText = 'The field is required';
	}

	if (!valid) {
		errorsSummary.innerText = 'The form contains errors';
	}

	return valid;
}
