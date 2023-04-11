let mensRow = document.querySelector('.mens__row')
let mensBtnOne = document.querySelector('.mens__pagination-1')
let mensBtnTwo = document.querySelector('.mens__pagination-2')

const getMensClothes = () => {
    fetch(`http://localhost:3000/products?category=men's clothing&_page=1&_limit=2`)
        .then((response) => response.json())
        .then((response) => {
            mensRow.innerHTML = ''
            response.forEach((item) => {
                mensRow.innerHTML += `
                <div class="mens__card">
                        <img src="${item.image}" alt="" class="mens__card-img">
                        <div class="mens__card-info">
                            <h3 class="mens__card-title">
                                ${item.title}
                            </h3>
                            <p class="mens__card-category">
                            ${item.category}
                            </p>
                            <div class="mens__card-bottom">
                                <p class="mens__card-price">
                                ${item.price}
                                    <span class="mens__card-oldPrice">
                                        79$
                                    </span>
                                </p>
                                <div class="mens__card-purchased">
                                ${item.rating.count} people purchased
                                </div>
                            </div>
                        </div>
                    </div>`
            });
        })
}
getMensClothes()


mensBtnTwo.addEventListener('click', () => {
    const getMensClothes = () => {
        fetch(`http://localhost:3000/products?category=men's clothing&_page=2&_limit=2`)
            .then((response) => response.json())
            .then((response) => {
                mensRow.innerHTML = ''
                response.forEach((item) => {
                    mensRow.innerHTML += `
                    <div class="mens__card">
                            <img src="${item.image}" alt="" class="mens__card-img">
                            <div class="mens__card-info">
                                <h3 class="mens__card-title">
                                    ${item.title}
                                </h3>
                                <p class="mens__card-category">
                                ${item.category}
                                </p>
                                <div class="mens__card-bottom">
                                    <p class="mens__card-price">
                                    ${item.price}
                                        <span class="mens__card-oldPrice">
                                            79$
                                        </span>
                                    </p>
                                    <div class="mens__card-purchased">
                                    ${item.rating.count} people purchased
                                    </div>
                                </div>
                            </div>
                        </div>`
                });
            })
    }
    getMensClothes()
})

mensBtnOne.addEventListener('click', () => {
    const getMensClothes = () => {
        fetch(`http://localhost:3000/products?category=men's clothing&_page=1&_limit=2`)
            .then((response) => response.json())
            .then((response) => {
                mensRow.innerHTML = ''
                response.forEach((item) => {
                    mensRow.innerHTML += `
                    <div class="mens__card">
                            <img src="${item.image}" alt="" class="mens__card-img">
                            <div class="mens__card-info">
                                <h3 class="mens__card-title">
                                    ${item.title}
                                </h3>
                                <p class="mens__card-category">
                                ${item.category}
                                </p>
                                <div class="mens__card-bottom">
                                    <p class="mens__card-price">
                                    ${item.price}
                                        <span class="mens__card-oldPrice">
                                            79$
                                        </span>
                                    </p>
                                    <div class="mens__card-purchased">
                                    ${item.rating.count} people purchased
                                    </div>
                                </div>
                            </div>
                        </div>`
                });
            })
    }
    getMensClothes()
})