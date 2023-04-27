import {changeUser, user} from "../../user.js";


let cart = document.querySelector('.cart__list')
let cartEmpty = document.querySelector('.cart__empty')


const getCartList = () => {
    cart.innerHTML = ''
    if (user.cart.length){
        cartEmpty.style.display = 'none'
        user.cart.forEach((item) => {
            cart.innerHTML += `<li class="cart__item">
            <div class="cart__left">
              <img src="${item.image}" alt="" class="cart__left-img">
              <h3 class="cart__left-title">
               ${item.title}
                <span class="cart__left-category">
                  ${item.category}
                </span>
              </h3>
            </div>
            <div class="cart__center">
              <p class="cart__center-price">${item.price}$</p>
              <div class="cart__center-count">
                <button data-id="${item.id}" class="btn btn_disabled cart__center-btn cart__minus">-</button>
                <span>${item.count}</span>
                <button data-id="${item.id}" class="btn cart__center-btn cart__plus">+</button>
              </div>
            </div>
            <div class="cart__right">
              <p class="cart__right-price">
                ${item.price * item.count}$
              </p>
              <span data-id="${item.id}" class="cart__right-delete">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.65572 5.383C4.75272 5.4805 4.88022 5.529 5.00772 5.529C5.13522 5.529 5.26272 5.4805 5.35972 5.383C5.55422 5.1885 5.55422 4.873 5.35972 4.6785L1.37722 0.691999C1.18272 0.497499 0.867719 0.497499 0.673219 0.691999C0.478719 0.886499 0.478719 1.202 0.673219 1.3965L4.65572 5.383Z" fill="white" fill-opacity="0.5"/>
<path d="M7.70342 7.024L13.3259 1.3965C13.5204 1.202 13.5204 0.8865 13.3259 0.692C13.1314 0.4975 12.8164 0.4115 12.6219 0.6065L6.64792 6.5H6.49992V6.6725L0.599925 12.6515C0.405425 12.846 0.442425 13.1615 0.636425 13.356C0.733425 13.4535 0.879425 13.502 1.00692 13.502C1.13442 13.502 1.27092 13.4535 1.36792 13.356L6.99492 7.729L12.6194 13.3565C12.7164 13.454 12.8454 13.5025 12.9724 13.5025C13.0994 13.5025 13.2279 13.454 13.3249 13.3565C13.5194 13.162 13.5199 12.8465 13.3254 12.652L7.70342 7.024Z" fill="white" fill-opacity="0.5"/>
</svg>

              </span>
            </div>
          </li>`
        })

        let allDeleteBtn = document.querySelectorAll('.cart__right-delete')
        let allMinusBtn = document.querySelectorAll('.cart__minus')
        let allPlusBtn = document.querySelectorAll('.cart__plus')

        Array.from(allDeleteBtn).forEach((item) => {
            item.addEventListener('click', () => {
                fetch(`http://localhost:3000/users/${user.id}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cart: user.cart.filter((el) => {
                            return el.id != item.dataset.id
                        })
                    })
                }).then((response) => response.json())
                    .then((response) => {
                        changeUser(response)
                        localStorage.setItem('user', JSON.stringify(response))
                        getCartList()
                    })
            })
        })

        Array.from(allMinusBtn).forEach((item) => {
            item.addEventListener('click', () => {
                fetch(`http://localhost:3000/users/${user.id}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cart: user.cart.find(el => el.id == item.dataset.id).count === 1 ?
                            user.cart.filter((el) => {
                                return el.id != item.dataset.id
                            }) : user.cart.map((el) => {
                                if (el.id == item.dataset.id){
                                    return {...el, count: el.count - 1}
                                }
                                return el
                            })
                    })
                }).then((response) => response.json())
                    .then((response) => {
                        changeUser(response)
                        localStorage.setItem('user', JSON.stringify(response))
                        getCartList()
                    })
            })
        })

        Array.from(allPlusBtn).forEach((item) => {
            item.addEventListener('click', () => {
                fetch(`http://localhost:3000/users/${user.id}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cart: user.cart.map((el) => {
                            if (el.id == item.dataset.id){
                                return {...el, count: el.count + 1}
                            }
                            return el
                        })
                    })
                }).then((response) => response.json())
                    .then((response) => {
                        changeUser(response)
                        localStorage.setItem('user', JSON.stringify(response))
                        getCartList()
                    })
            })
        })

        let cartAllPrice = document.querySelector('.cart__all-price')
        cartAllPrice.style.color = 'white'
        cartAllPrice.textContent = user.cart.reduce((acc,rec) =>{
            return acc + (rec.price * rec.count)
        },0)
    }else{
        cartEmpty.style.display = 'block'
    }
}
getCartList()