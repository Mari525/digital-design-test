import { productsData } from './data'

const modal = document.getElementById('modal')
const closeBtn = document.getElementById('close-btn')
const overlay = document.getElementById('overlay')
const body = document.getElementById('body')
const buyBtn = document.getElementById('buy-btn')
const modalCount = document.getElementById('modal-count')
const modalRadios = document.querySelectorAll('.modal__radio')

closeBtn.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)
buyBtn.addEventListener('click', handleBuyBtnClick)

function closeModal() {
  modal.classList.remove('modal--opened')
  overlay.classList.remove('overlay__show')
  body.classList.remove('body__scroll')

  modalCount.value = "1"
  modalRadios.forEach(function(radio) {
    radio.checked = false
  })
}

function handleBuyBtnClick() {
  let isChecked = false
  modalRadios.forEach(function(radio) {
    if (radio.checked) {
      isChecked = true
    }
  })
  if (isChecked) {
    window.alert("Покупка совершена!")
    closeModal()
  }
  else {
    window.alert("Пожалуйста, выберите цвет")
  }

}

function getDayName(number) {
  const dayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", 
  "Четверг", "Пятница", "Суббота"]

  return dayNames[number - 1]
}

function getWeekNumber(date) {
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const diff = (date - yearStart) / (1000 * 60 * 60 * 24);
  const weekNumber = Math.ceil((diff + yearStart.getDay() + 1) / 7);

  if (date.getDay() === 0) {
    return weekNumber;
  }
  else {
    return weekNumber + 1;
  }
}

function getMonthName(number) {
  const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
  "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
  
  return monthNames[number - 1]
}

function getDate(productDate) {
  const date = new Date(productDate)
  const day = getDayName(date.getDay() + 1)
  const week = getWeekNumber(date)
  const month = getMonthName(date.getMonth() + 1)
  const year = date.getFullYear()

  return `${day}, ${week} неделя ${month} ${year} года`
} 

function getProductsHtml() {

  let clothes = ""
  let shoes = ""
  let accessories = ""

  productsData.forEach(function(product){
    let productHtml = `
          <li class="product">
            <img class="product__img" src="../img/${product.img}.jpg" alt="${product.img}">
            <h3 class="product__heading">${product.heading}</h3>
            <date class="product__date">${getDate(product.date)}</date>
            <button class="product__btn">Купить</button>
          </li>`

    if (product.category === 'clothes') {
      clothes = productHtml.repeat(11)
    }
    else if (product.category === 'shoes') {
      shoes += productHtml.repeat(14)
    }
    else if (product.category === 'accessories')
      accessories += productHtml.repeat(12)
  })

  const products = `
                <h2 class="products__heading" id="clothes">Одежда</h2> 
                <ul class="products__list">${clothes}</ul>
                <h2 class="products__heading" id="shoes">Обувь</h2>
                <ul class="products__list">${shoes}</ul> 
                <h2 class="products__heading" id="accessories">Аксессуары</h2>
                <ul class="products__list">${accessories}</ul>
                `
  return products

}

function renderProducts() {
  document.getElementById('products').innerHTML = getProductsHtml()
}

renderProducts()

const buyButtons = document.querySelectorAll(".product__btn")

buyButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    modal.classList.add('modal--opened')
    overlay.classList.add('overlay__show')
    body.classList.add('body__scroll')
  })
})