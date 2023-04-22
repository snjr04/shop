import {changeUser, user} from "../../../user"

let title = document.querySelector('.product__info-title')
let price = document.querySelector('.product__info-price')
let category = document.querySelector('.product__info-category-text')
let rating = document.querySelector('.product__info-rating-num')
let description = document.querySelector('.product__info-desc')
let img = document.querySelector('.product__img')
let addCard = document.querySelector('.product__add-cart')
let addFavorites = document.querySelector('.product__add-favorites')
let trendRow = document.querySelector('.trending__row')

const getAllRelatedProducts =(productCategery,id) =>{
    fetch(`http://localhost:3000/products?category=${productCategery}&id_ne=${id}`)
        .then((respnse) =>respnse.json())
        .then((response) =>{
            trendRow.innerHTML = ''
            response.forEach((item) =>{
                trendRow.innerHTML += `
                <div class="trending__card">
                <a href="?product=${item.id}">
                        <img src="${item.image}" alt="" class="trending__card-img">
                        </a>
                        <div class="trending__card-info">
                            <h3 class="trending__card-title">
                                ${item.title}
                            </h3>
                            <p class="trending__card-category">
                            ${item.category}
                            </p>
                            <div class="trending__card-bottom">
                                <p class="trending__card-price">
                                ${item.price}
                                    <span class="trending__card-oldPrice">
                                        79$
                                    </span>
                                </p>
                                <div class="trending__card-purchased">
                                ${item.rating.count} people purchased
                                </div>
                            </div>
                        </div>
                    </div>`
            })
        })

}

const getOneProduct = () =>{
    fetch(`http://localhost:3000/products/${location.search.split('=')[1]}`)
        .then((response) =>response.json())
        .then((response) =>{
            title.textContent = response.title
            price.textContent = `${response.price}$`
            img.setAttribute('src',response.image)
            category.textContent = response.category
            rating.textContent = response.rating.rate
            description.textContent = response.description
            addCard.dataset.id = response.id
            addFavorites.dataset.id = response.id
            getAllRelatedProducts(response.category,response.id)

            if (user.favorites.some((item) =>item.id === response.id)){
                addFavorites.textContent = 'Удалить из избранных'
            }else{
                addFavorites.textContent = 'Добавить в избранное'
            }

            addFavorites.addEventListener('click',() =>{
                fetch(`http://localhost:3000/users/${user.id}`,{
                    method: 'PATCH',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        favorites:user.favorites.some((item) => item.id === response.id)?
                            user.favorites.filter((item) => item.id !==response.id):
                        [...user.favorites,response]
                    })
                }).then((response) =>response.json())
                    .then((response)=>{
                    changeUser(response)
                    localStorage.setItem('user',JSON.stringify(response))
                        getOneProduct()
                })
            })
        })
}

getOneProduct()
