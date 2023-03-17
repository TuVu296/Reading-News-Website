'use strict'
const apiKey = 'bbda38f319de4cdd864b6fc49ce5d762'
const url = 'https://newsapi.org/v2/top-headlines'
// Tao current page mac dinh =1 -> de tim so trang
let currentPage = 1
// Lay du lieu tu storage 
let setting = JSON.parse(getFromStorage('SETTINGS')) || {};

async function fetchNews(page = 1) {
  // gan su kien click thi goi fetchNews tuong ung vowi trang do, lay page, category tu setting
  let urlLink = `${url}?apiKey=${apiKey}&country=us&pageSize=${setting.pageSize ? setting.pageSize : 10}&page=${page}`
  //  Neu co category 
  if (setting.category) {
    urlLink += `&category=${setting.category}`
  }
  try {
    // Cho de cho khi yeu cau tra du lieu ve tu server
    const response = await fetch(urlLink)
    // Chuyen doi ve dang json
    const data = await response.json()
    console.log(data)
    const totalResult = data.totalResults
    // Tinh so trang Totalresult / so luong lam tron tren
    const totalPage = Math.ceil(totalResult / Number(setting.pageSize ? setting.pageSize : 10))
    // render theo so trang 
    renderPagination(totalPage)
    // render news
    renderNewsContainer(data.articles)
  } catch(error) {
    console.log(error)
  }
}
// function nhan output = new = obj call ve tu api

// render 1 new
function renderNew(newObj) {
  // Tao element div
const divNode = document.createElement("div")
divNode.classList.add('card', 'flex-row', 'flex-wrap')
divNode.innerHTML = `
  <div class="card mb-3" style="">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img class="card-img" src="${newObj.urlToImage}"
          alt="${newObj.title}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${newObj.title}</h5>
          <p class="card-text">${newObj.content}</p>
          <a href="${newObj.url}"
            class="btn btn-primary">View</a>
        </div>
      </div>
    </div>
  </div>
`
document.getElementById("news-container").appendChild(divNode)
}

// render all news
function renderNewsContainer(data) {
  document.getElementById("news-container").innerHTML = ''
  for (let i = 0; i < data.length; i++ ) {
    renderNew(data[i])
  }
}

// lay so luong thi gan vap tong so trang
function onClickPage(page) {
  currentPage = page
  fetchNews(page)
}

// render pagination va gawn chuyen trang
function renderPagination(totalPage) {
  document.querySelector(".pagination").innerHTML = ''
  document.querySelector(".pagination").innerHTML += `
    <li ${currentPage > 1 ? `onclick="onClickPage(${currentPage - 1})"` : ''} class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <button class="page-link" href="#" id="btn-prev">Previous</button>
    </li>
  `
  for (let i = 1; i <= totalPage; i++ ) {
    document.querySelector(".pagination").innerHTML += `
      <li onclick="onClickPage(${i})" class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" id="page-num">${i}</a>
      </li>
    `
  }
  document.querySelector(".pagination").innerHTML += `
    <li ${currentPage < totalPage ? `onclick="onClickPage(${currentPage + 1})"` : ''} class="page-item ${currentPage === totalPage ? 'disabled' : ''}">
      <button class="page-link" id="btn-next">Next</button>
    </li>
  `
}

fetchNews()