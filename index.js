function triggerHighlight(fieldId, fieldBorderId) {
  const formField = document.getElementById(fieldId)
  const formFieldBorder = document.getElementById(fieldBorderId)
  formField.style.border = '0.063rem solid transparent'
  formFieldBorder.style.backgroundImage = 'linear-gradient(#6348fe, #610595)'
}

function removeHighlight(fieldId, fieldBorderId, errorDisplayId) {
  const formField = document.getElementById(fieldId)
  const formFieldBorder = document.getElementById(fieldBorderId)
  const errorDisplay = document.getElementById(errorDisplayId)

  let newBorderColor = '#dfdee0'
  let newErrorStatus = false

  let fieldError = getFieldError(fieldId)
  let fieldMessage = getFieldMessage(fieldId)

  if (fieldError) {
    newBorderColor = '#FF5050'
  }

  if (fieldMessage) {
    newErrorStatus = true
  }

  formField.style.border = `0.063rem solid ${newBorderColor}`
  formFieldBorder.style.backgroundImage = 'none'

  if (fieldMessage) {
    errorDisplay.innerHTML = fieldMessage
  }

  toggleErrorMessage(fieldId, newErrorStatus)
}

function getFieldError(fieldId) {
  if (fieldId === 'fname') {
    if (!document.getElementById('fname').value) {
      return "Can't be blank"
    }
  } else {
    if (!document.getElementById(fieldId).value) {
      return "Can't be blank"
    } else if (!isNumericOrSpace(document.getElementById(fieldId).value)) {
      if (fieldId === 'fnumber') {
        return 'Wrong format, numbers only'
      } else {
        return 'Numbers only'
      }
    }
  }
}

function getFieldMessage(fieldId) {
  if (fieldId === 'fname') {
    if (!document.getElementById('fname').value) {
      return "Can't be blank"
    }
  } else if (fieldId === 'fdate' || fieldId === 'fyear') {
    if (
      !document.getElementById('fdate').value ||
      !document.getElementById('fyear').value
    ) {
      return "Can't be blank"
    } else if (
      !isNumericOrSpace(document.getElementById('fdate').value) ||
      !isNumericOrSpace(document.getElementById('fyear').value)
    ) {
      return 'Numbers only'
    }
  } else {
    if (!document.getElementById(fieldId).value) {
      return "Can't be blank"
    } else if (!isNumericOrSpace(document.getElementById(fieldId).value)) {
      if (fieldId === 'fnumber') {
        return 'Wrong format, numbers only'
      } else {
        return 'Numbers only'
      }
    }
  }
}

function toggleErrorMessage(fieldId, enable) {
  let validField = false
  let errorDisplay, fieldSpan, field2Span, field3Span
  let keepBottomErrorDisplay = false

  if (fieldId === 'fname') {
    validField = true
    errorDisplay = document.getElementById('nameInputError')
    fieldSpan = document.getElementById('fnameBorder')
  }
  if (fieldId === 'fnumber') {
    validField = true
    errorDisplay = document.getElementById('numberInputError')
    fieldSpan = document.getElementById('fnumberBorder')
  } else if (fieldId === 'fdate' || fieldId === 'fyear') {
    validField = true
    errorDisplay = document.getElementById('dateInputError')
    fieldSpan = document.getElementById('fdateBorder')
    field2Span = document.getElementById('fyearBorder')
    field3Span = document.getElementById('fcvcBorder')
    if (
      getFieldError('fdate') ||
      getFieldError('fyear') ||
      getFieldError('fcvc')
    ) {
      keepBottomErrorDisplay = true
    }
  } else if (fieldId === 'fcvc') {
    validField = true
    errorDisplay = document.getElementById('cvcInputError')
    fieldSpan = document.getElementById('fdateBorder')
    field2Span = document.getElementById('fyearBorder')
    field3Span = document.getElementById('fcvcBorder')
    if (
      getFieldError('fdate') ||
      getFieldError('fyear') ||
      getFieldError('fcvc')
    ) {
      keepBottomErrorDisplay = true
    }
  }

  if (validField) {
    if (enable === true) {
      errorDisplay.style.display = 'block'
      fieldSpan.style.marginBottom = 0
      if (field2Span) {
        field2Span.style.marginBottom = 0
      }
      if (field3Span) {
        field3Span.style.marginBottom = 0
      }
    } else {
      errorDisplay.style.display = 'none'
      if (!keepBottomErrorDisplay) {
        fieldSpan.style.marginBottom = '1rem'
        if (field2Span) {
          field2Span.style.marginBottom = '1rem'
        }
        if (field3Span) {
          field3Span.style.marginBottom = '1rem'
        }
      }
    }
  }
}

function submitForm() {
  let validated = true

  if (!validateField('fname')) {
    validated = false
  }
  if (!validateField('fnumber')) {
    validated = false
  }
  if (!validateField('fdate')) {
    validated = false
  }
  if (!validateField('fyear')) {
    validated = false
  }
  if (!validateField('fcvc')) {
    validated = false
  }

  if(validated)
  {
    let confirmationScreen = document.getElementById('confirmationScreen')
    let formArea = document.getElementById('formArea')


    formArea.style.display = 'none'
    confirmationScreen.style.display = 'block'
  }

}

function    validateField(fieldId) {
  if (!document.getElementById(fieldId).value) {
    toggleErrorMessage(fieldId, true)
    document.getElementById(fieldId).style.border = '0.063rem solid #FF5050'
    document.getElementById(fieldId).style.backgroundImage = 'none'
    return false
  }
  return true
}

function updateCardName() {
  const newName = document.getElementById('fname').value
  document.getElementById('cardAccountName').innerHTML = newName
}

function updateCardNumber() {
  const newNumber = document.getElementById('fnumber')
  const numberBorder = document.getElementById('fnumberBorder')
  document.getElementById('cardAccountNumber').innerHTML = newNumber.value
}

function updateCardExpDate() {
  const newDate = document.getElementById('fdate').value
  const newYear = document.getElementById('fyear').value
  document.getElementById('cardExireDate').innerHTML = `${newDate}/${newYear}`
}

function updateCardCVC() {
  const newCVC = document.getElementById('fcvc').value
  document.getElementById('cardCVC').innerHTML = newCVC
}

function isNumericOrSpace(value) {
  return /^[\d\s]+$/.test(value)
}
