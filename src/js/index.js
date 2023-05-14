import { productsData } from './data'

function getDate(productDate) {
  const date = new Date(productDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  var oneJan = new Date(date.getFullYear(),0,1);
  var numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  var week = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);

  // let currentdate = new Date();
  // var oneJan = new Date(currentdate.getFullYear(),0,1);
  // var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  // var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
  // return(`The week number of the current date (${currentdate}) is ${result}.`);

  return `, ${week} неделя ${month} ${year}`
} 

function getProductsHtml() {

  let clothes = ""
  let shoes = ""
  let accessories = ""

  productsData.forEach(function(product){
    let productHtml = `
          <li class="product">
            <img src="" alt="">
            <h3 class="product__heading">${product.heading}</h3>
            <date>${getDate(product.date)}</date>
            <button class="product__btn" id="product-btn">Купить</button>
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
                <h2 class="products__heading">Одежда</h2> 
                <ul class="products__list">${clothes}</ul>
                <h2 class="products__heading">Обувь</h2>
                <ul class="products__list">${shoes}</ul> 
                <h2 class="products__heading">Аксессуары</h2>
                <ul class="products__list">${accessories}</ul>
                `
  return products

}

function renderProducts() {
  document.getElementById('products').innerHTML = getProductsHtml()
}

renderProducts()

