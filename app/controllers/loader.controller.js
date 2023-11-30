const returnButton = document.getElementById('returnButton')
const nameContainer = document.getElementById('nameContainer')
const orderNumberContainer = document.getElementById('orderNumberContainer')
const statusContainer = document.getElementById('statusContainer')
const countContainer = document.getElementById('countContainer')
const messageContainer = document.getElementById('messageContainer')
const endAlert = document.getElementById('endAlert')
const chatControls = document.getElementById('chatControls')
const chatForm = document.getElementById('chatForm')
const loader = document.getElementById('loader')

function dismiss() {
  loader.classList.add('loader-hidden')
}

function destroy() {
  loader.remove()
}

loader.onanimationend = destroy
window.onload = dismiss