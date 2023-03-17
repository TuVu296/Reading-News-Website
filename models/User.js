'use strict'



// Đầu tiên, bạn cần tạo một Class User để đại diện cho thông tin của người dùng. Class này sẽ gồm các trường cơ bản như sau:

// firstName và lastName (họ và tên người dùng)
// username
// password
// Bạn cần tạo Class User gồm constructor với các trường như trên.

//Khi mới truy cập vào màn hình, bạn phải lấy dữ liệu mảng userArr từ localStorage. 
let userArr = []
const KEY = "USER_ARRAY";


// 1. Tạo Class User
class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName
    this.lastName = lastName
    this.username = username
    this.password = password
  }
}

// chuyển từ JS Object sang Class Instance
function parseUser(userData) {
	const user = new User(userData.firstname, userData.lastname, userData.username, userData.password)

	return user
}