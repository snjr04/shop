import {user} from "../../../user"


let favoritesRow = document.querySelector('.favorites__row')

const getAllFavorites = () =>{
    favoritesRow.innerHTML = ''
    user.favorites.forEach((item) =>{
        favoritesRow.innerHTML += `
                            <div class="trending__card favorites__card">
                        <img src="../../src/images/product.png" alt="" class="trending__card-img">
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
                    </div>
        `
    })
}
getAllFavorites()