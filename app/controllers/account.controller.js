import { AuthService } from '../services/auth.service.js'

const nameContainer = document.getElementById('nameContainer')
const roleContainer = document.getElementById('roleContainer')
const emailContainer = document.getElementById('emailContainer')
const usernameContainer = document.getElementById('usernameContainer')
const scheduleContainer = document.getElementById('scheduleContainer')
const locationsContainer = document.getElementById('locationsContainer')

const authService = new AuthService()

function render() {
  const { name, surname, lastname, role, email, username, schedule, locations } = authService.getSession()

  nameContainer.innerText = [name, surname, lastname].join(' ').trim()
  roleContainer.innerText = role
  emailContainer.innerText = email
  usernameContainer.innerText = username
  if (scheduleContainer) scheduleContainer.innerText = schedule
  if (locationsContainer) locationsContainer.innerText = locations
}

render()
