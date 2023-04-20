import { useState } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { differenceInSeconds } from 'date-fns'

export const useValidation = (
  formValues,
  setFormValues,
  startSavingEvent,
  closeDateModal
) => {
  const variablesError = { titleError: false, noteError: false }

  const [formError, setFormError] = useState(variablesError)
  const { titleError, noteError } = formError

  const onSubmit = (event) => {
    event.preventDefault()

    const difference = differenceInSeconds(formValues.end, formValues.start)

    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas incorrectas', 'revisa las fechas ingresadas', 'error')
      console.log('error en fechas')
      return
    }
    if (formValues.title === '') {
      setFormError({ ...formError, titleError: true })
      console.log('no puede estar sin titulo')
      return
    }
    if (formValues.notes === '') {
      setFormError({ titleError: false, noteError: true })
      console.log('no puede estar vacio las notas')
      return
    }
    setFormError(variablesError)

    startSavingEvent(formValues)
    closeDateModal()
  }

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChanged = (event, changing) => {
    console.log(event, changing)
    setFormValues({ ...formValues, [changing]: event })
  }

  return { onSubmit, titleError, noteError, onInputChanged, onDateChanged }
}
