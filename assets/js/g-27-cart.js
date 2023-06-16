//URL
const baseUrl = 'https://ecommercebackend.fundamentos-29.repl.co/'; //Same
//Printing
const productsList = document.querySelector("#products-container"); //Same
//Show Cart
const navToggle = document.querySelector(".nav__button--toggle"); //Same
const navCart = document.querySelector(".nav__cart");
//Cart Const
const cart = document.querySelector("#cart"); 
const cartList = document.querySelector("#cart__list");
//Delete Cart
const clearCart = document.querySelector("#empty__cart");
//Modal Box
const modalBox = document.querySelector("#modal-box");
const modalInformation = document.querySelector("#modal--info");
let modalArr = []
//Array of Cart 
let cartArr = []
//Listeners
navToggle.addEventListener("click", () => {
    navCart.classList.toggle("nav__cart--visible")
});

eventListenerLoader()
function eventListenerLoader () {
    productsList.addEventListener("click", addProduct)
    cart.addEventListener("click", deleteProduct)
    clearCart.addEventListener("click", clearAllCart)
    productsList.addEventListener("click", modalProduct)
    modalBox.addEventListener("click", closeModal)
}
//Petition 
function obtainProducts() {
    axios.get(baseUrl)
        .then((response) => {
            const products = response.data
            printProducts(products)
        }) 
        .catch((err) => {
            console.log(err)
        })
} obtainProducts ()
//Renderise
function printProducts(products) {
    let html = " ";
    for (let product of products) {
        html += `
            <div class="products__element">
                <img src="${product.image}" alt="product_img" class="products__img">
                <p class="products__name"> ${product.name} </h3>
                <div class="products__div">
                    <p class="products__price"> $ ${product.price.toFixed(2)} </p>
                </div>
                <div class="products__div">
                    <button data-id="${product.id}" class="products__button">
                        Add to cart
                    </button>
                    <button data-id="${product.id}" data-description="${product.description}" class="products__button products__button--search products__details">
                        <p>More</>
                    </button>
                </div>
            </div>
            `
    }
    productsList.innerHTML = html
}
//Adding to Cart
function addProduct(event) {
    if(event.target.classList.contains("products__button")) {
        const elementWanted = event.target.parentElement.parentElement
        //Receiving from AddProduct
        cartElements (elementWanted) 
    }
}
//Function to Not Repeat
function cartElements (elementWanted) {
    const infoProducts = {
        id: elementWanted.querySelector('button').getAttribute('data-id'),
        image: elementWanted.querySelector('img').src,
        name: elementWanted.querySelector('p').textContent,
        price: elementWanted.querySelector('.products__div p').textContent,
        quantity: 1 
    }
    if (cartArr.some(product => product.id === infoProducts.id)) {
        const validation  = cartArr.map(product => {
            if (product.id === infoProducts.id) {
                product.quantity++
                return product
            } else {
                return product
            }
        })
        cartArr = [ ...validation]
    } else {
        cartArr = [ ...cartArr, infoProducts]
    }
    cartArrHtml () 
}
//Function to Print
function cartArrHtml () {
    let cartListHTML = '';
    for (let product of cartArr) {
        cartListHTML += `
        <div class="cart__product">
            <div class="cart__product__image">
              <img src="${product.image}">
            </div>
            <div class="cart__product__description">
              <p class="p1">${product.name}</p>
              <p class="p2">Price: ${product.price}</p>
              <p class="p3">Units: ${product.quantity}</p>
            </div>
            <div class="cart__product__button">
                <button class="delete__product" data-id="${product.id}">
                    Delete
                </button>
            </div>
        </div>
        `
    }
    cartList.innerHTML = cartListHTML;
}
//Function Delete Product
function deleteProduct(event) {
    if(event.target.classList.contains("delete__product")) {
        const productId = event.target.getAttribute('data-id')
        cartArr = cartArr.filter(product => product.id != productId)
        cartArrHtml ()
    }
}
//Function Clear Cart
function clearAllCart() {
    cartArr = [];
    cartArrHtml ();
}
//Function Modal
function modalProduct(event) {
    if(event.target.classList.contains("products__details")){
        modalBox.classList.add("show__box")
        const productOfDisplay = event.target.parentElement.parentElement
        infoConverter(productOfDisplay)
    }
}
//Function Close Modal
function closeModal(event) {
    if(event.target.classList.contains("modal__exit")){
        modalBox.classList.remove("show__box")
        let cleanArr = []
        modalArr = [...cleanArr]
    }
}
//Function Converter of Info
function infoConverter (elementWanted) {
    const infoConverted = {
        id: elementWanted.querySelector('button').getAttribute('data-id'),
        image: elementWanted.querySelector('img').src,
        name: elementWanted.querySelector('p').textContent,
        price: elementWanted.querySelector('.products__div p').textContent,
        description: elementWanted.querySelector('.products__details').getAttribute('data-description')
    }
    modalArr = [...modalArr, infoConverted]
    modalArrPrinterHTML()
}
//Function to Print
function modalArrPrinterHTML () {
    let infoModalConvertedHTML = '';
    for (let element of modalArr) {
        infoModalConvertedHTML += `
            <div class="modal__image">
                <img src="${element.image}" class="modal__layout--image">
            </div>
            <div class="modal__text">
                <h2 class="modal__layout--h2">${element.name}</h2>
                <h3 class="modal__layout--h3">${element.description}</h3>
                <p class="modal__layout--p">Price:${element.price}</p>
            </div>
        `
    }

    modalInformation.innerHTML = infoModalConvertedHTML;
}