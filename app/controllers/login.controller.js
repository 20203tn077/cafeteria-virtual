import { AuthService } from '../services/auth.service.js'
import { notyf } from '../utils/notyf.js'

const usernameInput = document.getElementById('usernameInput')
const passwordInput = document.getElementById('passwordInput')
const loginForm = document.getElementById('loginForm')

const authService = new AuthService()

function login() {
  const username = usernameInput.value
  const password = passwordInput.value

  if (authService.login(username, password)) {
    const { role } = authService.getSession()
    window.location.replace(role === 'Vendedor' ? './seller/products.html' : './buyer/food.html')
  } else notyf.error('Usuario y/o contraseña incorrectos')
}

loginForm.onsubmit = e => {
  e.preventDefault()
  login()
}