'use strict'

// Sau khi nhấn nút Register, bạn phải xử lý sự kiện click vào nút Register và thực hiện các bước sau: 

// Lấy dữ liệu nhập vào từ form 
// Gọi hàm validate để kiểm tra form hợp lệ
// Khởi tạo user mới với các dữ liệu hợp lệ 
// Thêm user vào mảng, lưu mảng vào localStorage
// Validate các thông tin mà người dùng nhập vào theo các tiêu chí sau:

// Lay du lieu tu storage thay vao arr
userArr = JSON.parse(getFromStorage(KEY)) || [];

// Dang ky new user
function registedUser() {
  // Dom
  const firstNameInput = document.getElementById('input-firstname') 
  const lastNameInput = document.getElementById('input-lastname')
  const userNameInput = document.getElementById('input-username')
  const passwordInput = document.getElementById('input-password')
  const confirmPassInput = document.getElementById('input-password-confirm')

  const userData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    username: userNameInput.value,
    password: passwordInput.value,
    confirmPass: confirmPassInput.value,
  }

  // Goi ham valid de kiem tra du lieu hop le
  const error = validInput(userData)
  if (error) {
    alert(error)
  } else {
    const newUser = new User(userData.firstName, userData.lastName, userData.username, userData.password)
    // Thêm user vào mảng
    userArr.push(newUser)
    // Lưu mảng vào localStorage
    localStorage.setItem(KEY, JSON.stringify(userArr))
    // Chuyển trang đến màn hình login
    window.location.href = '../pages/login.html';
  }
}

function validInput(user) {
// Không có trường nào bị bỏ trống.
  const { firstName, lastName, username, password, confirmPass } = user
  if(!firstName || !lastName || !username || !password || !confirmPass) {
    return 'Khong duoc bo trong'
  }

  // Kiem tra username ton tai chua
  const findUser = userArr.find((user) => {
    return user.username === username
  })

  // Username không được trùng với Username của các người dùng trước đó.
  if(findUser) {
    return 'Username da ton tai'
  }

  // Password và Confirm Password phải giống nhau.
  if(password !== confirmPass) {
    return 'Password và Confirm Password phải giống nhau'
  }

  // Password phải có nhiều hơn 8 ký tự.
  if(password.length <= 8) {
    return 'Password phải có nhiều hơn 8 ký tự.'
  }

  return null

}

document.getElementById('btn-submit').addEventListener('click', registedUser)
