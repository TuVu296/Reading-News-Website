'use strict'
// bien global
let settingObj = {}
// dom
const pageSize = document.getElementById('input-page-size')
const category = document.getElementById('input-category')
// Luu setting len storage
function saveSetting() {  
  // Valid du lieu
  if(!pageSize.value) {
    alert('Nhap luong bai viet cho trang')
    return
  }
  if(!category.value) {
    alert('Nhap category')
    return
  }
  settingObj.pageSize = pageSize.value 
  settingObj.category = category.value
  saveToStorage('SETTINGS', JSON.stringify(settingObj))
}
if(document.getElementById('btn-submit')) {
  document.getElementById('btn-submit').addEventListener('click', saveSetting)
}

// load setting 
function loadSetting() {
  settingObj = JSON.parse(getFromStorage('SETTINGS')) || {}
  pageSize.value = settingObj.pageSize
  category.value = settingObj.category
}
loadSetting()