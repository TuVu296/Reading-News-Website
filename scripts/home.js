'use strict'

const isLogin = JSON.parse(getFromStorage('CURRENT_USER'));

document.getElementById('login-modal').classList.remove('d-none')
document.getElementById('main-content').classList.remove('d-none')
if(isLogin) {
  document.getElementById('login-modal').classList.add('d-none')
  document.getElementById('welcome-message').textContent = `Welcome ${isLogin.firstName}`
} else {
  document.getElementById('main-content').classList.add('d-none')
}

// Chuc nang logout
document.getElementById('btn-logout').addEventListener('click', () => {
  localStorage.removeItem("CURRENT_USER")
  window.location.href = '../pages/login.html'
})