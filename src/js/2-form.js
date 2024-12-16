
const feedbackFormEl = document.querySelector('.feedback-form');
const formData = {
  email: '',
  message: '',
};

const fillFormField = () => {
  try {
    const formDataFromLS = JSON.parse(localStorage.getItem('feedback-form-state'));
    if (formDataFromLS === null) {
      return;
    }

    const formDataFromLSKeys = Object.keys(formDataFromLS);

    formDataFromLSKeys.forEach(key => {
      feedbackFormEl.elements[key].value = formDataFromLS[key];
      formData[key] = formDataFromLS[key];
    });

    console.log('Initial formData:', formData);
  } catch (err) {
    console.log(err);
  }
};

fillFormField();

const onFormFieldInput = event => {
  const { target: formField } = event;

  const fieldName = formField.name;
  const fieldValue = formField.value;

  formData[fieldName] = fieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const updateFormData = () => {
  const formElements = feedbackFormEl.elements;
  Object.keys(formData).forEach(key => {
    if (formElements[key]) {
      formData[key] = formElements[key].value;
    }
  });
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  updateFormData();

  console.log('Before submit:', formData);

  const formDataValues = Object.values(formData);

  if (formDataValues.some(el => el === '')) {
    alert('Fill please all form fields!');

    return;
  }

  console.log('Submitted form data:', formData);

  Object.keys(formData).forEach(key => {
    formData[key] = '';
  });

  console.log('After clear:', formData);

  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
};

feedbackFormEl.addEventListener('input', onFormFieldInput);
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
