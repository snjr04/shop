
let productsRow = document.querySelector('.mens__row')
let productsPagination = document.querySelector('.mens__pagination')
let productsSearch = document.querySelector('.mens__search')
let productsFrom = document.querySelector('.mens__from')
let productsSelect = document.querySelector('.mens__select')


let page = 1

const getActiveLink = () => {
    let asideItems = document.querySelectorAll('.aside__item')
    let title = document.querySelector('.mens__title')
    Array.from(asideItems).forEach((item) => {
        if (location.search ===   item.getAttribute('href')) {
            item.classList.add('active')
            title.textContent = item.textContent
        }
    })

}

getActiveLink()

const getAllProducts = (title = '', from = 0, view = '') => {
    let select = view.length ? `&_sort=price&_order=${view}` : ''
    let category = location.search.includes('all') ? '' : `category_like=${location.search.split('=')[1]}`
    fetch(`http://localhost:3000/products?${category}&_page=${page}&_limit=5&title_like=${title}&price_gte=${from}${select}`)
        .then((response) => response.json())
        .then((response) => {
            productsRow.innerHTML = ''
            response.forEach((item) => {
                productsRow.innerHTML += `<div class="trending__card">
                        <a href="../product/index.html?product=${item.id}">
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

getAllProducts()


const getAllProductsCount = (title = '', from = 0, view = '') => {
    let select = view.length ? `&_sort=price&_order=${view}` : ''
    let category = location.search.includes('all') ? '' : `category_like=${location.search.split('=')[1]}`
    fetch(`http://localhost:3000/products?${category}&title_like=${title}&price_gte=${from}${select}`)
        .then((response) => response.json())
        .then((response) => {
            productsPagination.innerHTML = ''
            for (let i = 1; i <= Math.ceil(response.length / 5); i++) {
                productsPagination.innerHTML += `
                <button style="background: ${page === i ? '#6C3EB8' : '#212123'}" data-id="${i}" class="mens__pagination-btn btn ">
                        ${i}
                    </button>
                `
            }
            let paginationBtns = document.querySelectorAll('.mens__pagination-btn')
            Array.from(paginationBtns).forEach((item) => {
                item.addEventListener('click', () => {
                        page = +item.dataset.id

                        Array.from(paginationBtns).forEach((el) => {
                            if (page === +el.dataset.id){
                                el.style.background = '#6C3EB8'
                            } else {
                                el.style.background = '#212123'
                            }
                        })

                        getAllProducts(productsSearch.value, productsFrom.value, productsSelect.value)

                })
            })

        })
}

getAllProductsCount()


productsSearch.addEventListener('input', () => {
    getAllProducts(productsSearch.value, productsFrom.value, productsSelect.value)
    getAllProductsCount(productsSearch.value, productsFrom.value, productsSelect.value)
})

productsFrom.addEventListener('input', () => {
    getAllProducts(productsSearch.value, productsFrom.value, productsSelect.value)
    getAllProductsCount(productsSearch.value, productsFrom.value, productsSelect.value)
})


productsSelect.addEventListener('change', () => {
    getAllProducts(productsSearch.value, productsFrom.value, productsSelect.value)
    getAllProductsCount(productsSearch.value, productsFrom.value, productsSelect.value)
})