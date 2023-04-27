let trandRow = document.querySelector('.trending__row')
let trendBtn = document.querySelector('.trending__btn')

let lessRow = document.querySelector('.less__row')
let lessBtn = document.querySelector('.less__btn')



const getAllTrends = (limit = 5) => {
    fetch(`http://localhost:3000/products?_sort=rating.rate&_order=desc&_limit=${limit}`)
        .then((response) => response.json())
        .then((response) => {
            trandRow.innerHTML = ''
            response.forEach((item) => {
                trandRow.innerHTML += `
                <div class="trending__card">
                        <a href="pages/product/index.html?product=${item.id}">
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
            });
        })

}

getAllTrends()

trendBtn.addEventListener('click', () => {
    if (trendBtn.textContent === 'See more') {
        getAllTrends(10)
        trendBtn.textContent = 'Hide'
    } else {
        getAllTrends()
        trendBtn.textContent = 'See more'
    }
})

const getHundretPrice = (limit = 5) => {
    fetch(`http://localhost:3000/products?price_lte=100&_limit=${limit}`)
        .then((response) => response.json())
        .then((response) => {
            lessRow.innerHTML = ''
            response.forEach((item) => {
                lessRow.innerHTML += `
                <div class="less__card">
                        <a href="pages/product/index.html?product=${item.id}">
                            <img src="${item.image}" alt="" class="trending__card-img">
                        </a>
                        <div class="less__card-info">
                            <h3 class="less__card-title">
                                ${item.title}
                            </h3>
                            <p class="less__card-category">
                            ${item.category}
                            </p>
                            <div class="less__card-bottom">
                                <p class="less__card-price">
                                ${item.price}
                                    <span class="less__card-oldPrice">
                                        79$
                                    </span>
                                </p>
                                <div class="less__card-purchased">
                                ${item.rating.count} people purchased
                                </div>
                            </div>
                        </div>
                    </div>
                    `
            })
        })
}

getHundretPrice()

lessBtn.addEventListener('click', () => {
    if (lessBtn.textContent === 'See more') {
        getHundretPrice(10)
        lessBtn.textContent = 'Hide'
    } else {
        getHundretPrice()
        lessBtn.textContent = 'See more'
    }
})