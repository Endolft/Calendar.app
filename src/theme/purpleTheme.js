import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: '#4caf50'
    },
    secondary: {
      main: '#388e3c'
    },
    error: {
      main: red.A400
    }
  }
})
