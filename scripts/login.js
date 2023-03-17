'use strict'

// Giao diện này sẽ gồm 2 trường: Username và Password. Người dùng sẽ nhập các thông tin tương ứng vào nhấn Login. 
// Nếu các thông tin nhập vào trùng với User đã có ở trong danh sách thì tức là đăng nhập thành công, ngược lại thì bạn cần thông báo lỗi cho người dùng.

// Nếu người dùng đăng nhập thành công, bạn cần lưu thông tin người dùng hiện tại xuống dưới LocalStorage, 
// để sau các trang khác có thể lấy được dữ liệu về người dùng đã đăng nhập. Sau đó sẽ chuyển về trang Home.

// Lưu ý: Bạn cũng cần validate dữ liệu ở bước này, hãy kiểm tra xem người dùng đã nhập đủ Username và Password hay chưa.

// Ngoài ra, để kiểm tra người dùng đã login hay chưa, bạn phải lưu thêm 1 biến trong localStorage là currentUser - 
// lưu thông tin user đăng nhập. Khi login thành công sẽ lưu currentUser vào localStorage.
// Lay du lieu tu storage the vao arr
userArr = JSON.parse(getFromStorage(KEY)) || [];
// Dom
const userNameLogin = document.getElementById('input-username')
const passwordLogin = document.getElementById('input-password')

// valid du lieu
function validLogin() {
  // khong nhap du lieu o username/password
  if (!userNameLogin.value || !passwordLogin.value) {
    return 'Khong duoc de trong truong nay!'
  }
  // Password khong hop le
  if (passwordLogin.length <= 8) {
    return 'Password phải có nhiều hơn 8 ký tự.'
  }
  return null
}

function login() {
  // validation du lieu form login
  const error = validLogin()
  if (error) {
    alert(error)
  } else {
    // Kiem tra da co username chua
    const findUser = userArr.find((user) => {
      return user.username === userNameLogin.value
    })

    if (!findUser) {
      alert('Username chua duoc dang ky')
      return
    }

    if (findUser.password !== passwordLogin.value) {
      alert('Nhap sai password')
      return
    }
    // Cần lưu thông tin người dùng hiện tại xuống dưới LocalStorage
    saveToStorage('CURRENT_USER', JSON.stringify(findUser))
    // Chuyển trang đến màn hình login
    window.location.href = '../index.html';
  }
}

// Click nut login
document.getElementById('btn-submit').addEventListener('click',login)