import {useParams} from 'react-router-dom'

 function createControl(config, validation) {
  return {
   ...config,
   validation,
   valid: !validation,
   touched: false,
   value: ''
  }
}

  function validate(value, validation = null) {
  if (!validation) {
    return true
  }

  let isValid = true

  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }
  return isValid
}

function validateForm(formControls) {
  let isFormValid = true

  for (const control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid
      
    }
  }
  return isFormValid
}

 function useIdHandler() {
   const params = useParams()
   return params()
 } 

export  {createControl, validate, validateForm, useIdHandler}
