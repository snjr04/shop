import {user} from "../../../user.js";
import {changeUser} from "../../../user.js";


let favoritesRow = document.querySelector('.favorites__row')
let favoritesEmpty = document.querySelector('.favorites__empty')

const getAllFavorites = () => {
    favoritesRow.innerHTML = ''
    if (user.favorites.length){
        favoritesEmpty.style.display = 'none'
        user.favorites.forEach((item) => {
            favoritesRow.innerHTML += `
           <div class="trending__card favorites__card">
                        <img src="${item.image}" alt="" class="trending__card-img">
                        <div class="trending__card-info">
                            <h3 class="trending__card-title">
                             ${item.title}
                            </h3>
                            <p class="trending__card-category">
                              ${item.category}
                            </p>
                            <div class="trending__card-bottom">
                              <p class="trending__card-price">
                                ${item.price}$
                                <span class="trending__card-oldPrice">79$</span>
                              </p>
                              <div class="trending__card-purchased">
                               ${item.rating.count}
                              </div>
                            </div>
                        </div>
                        <button data-id="${item.id}" class="favorites__del-btn">delete</button>
                    </div>
        `
        })
        let favoritesDelBtn = document.querySelectorAll('.favorites__del-btn')


        Array.from(favoritesDelBtn).forEach((i)=>{
            i.addEventListener('click',()=>{
                fetch(`http://localhost:3000/users${user.id}`,{
                    method:'PATCH',
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({
                        favorites:user.favorites.filter((el)=>{
                            return el.id!==i.dataset.id
                        })
                    })
                }).then((response) =>response.json())
                    .then((response)=>{
                        changeUser(response)
                        localStorage.setItem('user',JSON.stringify(response))
                        getAllFavorites()
                    })
            })
        })
    }else{
        favoritesEmpty.style.display = 'block'
    }
}

getAllFavorites()