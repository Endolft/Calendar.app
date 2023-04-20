import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'

export const routes = [
  {
    Component: LoginPage,
    title: 'iniciar Sesion',
    path: '/login'
  },
  {
    Component: RegisterPage,
    title: 'Registrate',
    path: '/register'
  }
]
