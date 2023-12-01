import { User } from '../models/user.model.js'
import { ToastService } from '../services/toast.service.js'
import { UserService } from '../services/user.service.js'

const registerForm = document.getElementById('registerForm')
const nameInput = document.getElementById('nameInput')
const surnameInput = document.getElementById('surnameInput')
const lastnameInput = document.getElementById('lastnameInput')
const emailInput = document.getElementById('emailInput')
const usernameInput = document.getElementById('usernameInput')
const roleRadios = document.getElementsByName('roleRadio')
const sellerOnlyElements = document.getElementsByClassName('seller-only')
const scheduleInput = document.getElementById('scheduleInput')
const locationsInput = document.getElementById('locationsInput')
const passwordInput = document.getElementById('passwordInput')
const passwordConfirmationInput = document.getElementById('passwordConfirmationInput')

const userService = new UserService()
const toastService = new ToastService()

let role = getRole()

function getRole() {
  for (const roleRadio of roleRadios) {
    if (roleRadio.checked) return roleRadio.value
  }
}

function checkRole() {
  role = getRole()
  if (role === 'Comprador') for (const element of sellerOnlyElements) element.classList.add('d-none')
  else for (const element of sellerOnlyElements) element.classList.remove('d-none')
}

function validate() {
  return !!(
    nameInput.value &&
    surnameInput.value &&
    emailInput.value &&
    usernameInput.value &&
    (role === 'Comprador' || (scheduleInput.value && locationsInput.value)) &&
    passwordInput.value &&
    passwordConfirmationInput.value
  )
}

function fill() {
  nameInput.value ||= 'Alfonso'
  if (!surnameInput.value) lastnameInput.value ||= 'Ramirez'
  surnameInput.value ||= 'Bahena'
  emailInput.value ||= 'alfonsobahena@utez.edu.mx'
  usernameInput.value ||= 'alfonsob'
  scheduleInput.value ||= 'Lunes a viernes de 11 a.m. a 7 p.m.'
  locationsInput.value ||= 'Explanada de CECADEC'
  passwordInput.value ||= '1234'
  passwordConfirmationInput.value ||= passwordInput.value
}

function register() {
  userService.create(new User(
    nameInput.value,
    surnameInput.value,
    lastnameInput.value || undefined,
    emailInput.value,
    usernameInput.value,
    role,
    passwordInput.value,
    role === 'Vendedor' ? scheduleInput.value : undefined,
    role === 'Vendedor' ? locationsInput.value : undefined
  ))
  toastService.setPendingMessage('Cuenta creada')
  window.location.replace('./login.html')
}

for (const roleRadio of roleRadios) roleRadio.onchange = checkRole

registerForm.onsubmit = e => {
  e.preventDefault()
  if (!validate()) {
    fill()
    return
  }
  register()
}
