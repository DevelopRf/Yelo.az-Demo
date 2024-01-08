let resultData = ""
const cashbackMain = document.querySelector('.cashbackMain')
const container = document.querySelector(".cashbackCards .container")
const cards = document.querySelector(".cashbackCards .cards")
const getCashback = () => {

    const getCashbackData = async () => {
        const url = "http://localhost:3000/cashback"
        const response = await fetch(url)

        try {
            if (!response.ok) {
                throw new Error(`Məlumatlar əldə edilə bilmədi. Status: ${response.status}`)
            }
            const data = await response.json()
            return data

        } catch (error) {
            console.error("Xəta baş verdi:", error)
            throw error
        }
    }

    let arrLength = 21
    let indexArr = 21
    let filter = ""
    let selectFilter = ""
    let searchFilter = ""
    const searchInput = document.querySelector(".filters .search input")
    const search = document.querySelector(".filters .search")
    const btnFilter = document.querySelectorAll(".filters .btnFilter li")
    const btnMoreCard = document.querySelector(".cashbackCards .btnMoreCard")
    getCashbackData()
        .then(data => {

            function getCashbackData(item) {
                resultData = ""
                if (item.length > 21) {
                    for (let i = 0; i < 21; i++) {
                        resultData +=
                            `<div class="card">
                            <a href = "#"><div class="cardImage" style ="background-image: url(${item[i].img})"></div></a>
                        <div class="content">
                            <div class="info">
                                <h3><a href = "#">${item[i].name}</a></h3>
                                <p>${item[i].category}</p>
                            </div>
                            <div class="discount">
                                <p>${item[i].discount}</p>
                                <span>${item[i].currency}</span>
                            </div>
                        </div>
                      </div>`
                    }
                    btnMoreCard.classList.remove("visibility")
                }
                else {
                    item.forEach(el => {
                        resultData +=
                            `<div class="card">
                        <a href = "#"><div class="cardImage" style ="background-image: url(${el.img})"></div></a>
                        <div class="content">
                            <div class="info">
                            <a href = "#"><h3>${el.name}</h3></a>
                                <p>${el.category}</p>
                            </div>
                            <div class="discount">
                                <p>${el.discount}</p>
                                <span>${el.currency}</span>
                            </div>
                        </div>
                      </div>`
                    })
                    btnMoreCard.classList.add("visibility")
                }
                cards && (cards.innerHTML = resultData)
            }

            getCashbackData(data)

            btnFilter.forEach(btn => {

                const btnfilterCash = data.filter(item => item.category === btn.innerText)

                btn.addEventListener("click", () => {
                    resultData = ""
                    cards.innerHTML = ""
                    container.classList.add("active")
                    btnMoreCard.classList.add("visibility")
                    btnfilterCash.forEach(filter => {
                        resultData += `<div class="card">
                        <div class="cardImage">
                        <a href = "#"><div class="cardImage" style ="background-image: url(${filter.img})"></div></a>
    
                        </div>
                        <div class="content">
                            <div class="info">
                            <h3><a href = "#">${filter.name}</a></h3>
                                <p>${filter.category}</p>
                            </div>
                            <div class="discount">
                                <p>${filter.discount}</p>
                                <span>${filter.currency}</span>
                            </div>
                        </div>
                    </div>`
                    })
                    setTimeout(() => {
                        cards.innerHTML = resultData
                    }, 1500)
                })
            })

            function getSearchResult(search) {

                resultData = ""
                searchFilter = search.filter(item => item.name.toLowerCase().includes(searchInput.value.toLowerCase()))
                searchFilter.length < 21 ? btnMoreCard.classList.add("visibility") : btnMoreCard.classList.remove("visibility")
                searchFilter.forEach(filter => {
                    resultData += `<div class="card">
                        <a href = "#"><div class="cardImage" style ="background-image: url(${filter.img})"></div></a>
                        <div class="content">
                            <div class="info">
                            <h3><a href = "#">${filter.name}</a></h3>
                                <p>${filter.category}</p>
                            </div>
                            <div class="discount">
                                <p>${filter.discount}</p>
                                <span>${filter.currency}</span>
                            </div>
                        </div>
                    </div>`
                })
                cards.innerHTML = resultData
            }

            let timer, timer1;

            searchInput && searchInput.addEventListener("input", () => {
                clearTimeout(timer1)
                clearTimeout(timer)
                let searchResult
                const startTimer = () => {
                    timer = setInterval(() => {
                        search.classList.add("search-active")
                    }, 1500)
                    timer1 = setTimeout(() => {
                        console.log(filter);
                        if (filter === "" || filter === "all") {
                            if (searchInput.value === "") {
                                getCashbackData(data)
                            }
                            else {
                                getSearchResult(data)
                            }
                        }

                        else {
                            if (searchInput.value === "") {
                                getCashbackData(selectFilter)                                
                                indexArr = 21
                                arrLength = 21
                            }
                            else {
                                getSearchResult(selectFilter)
                            }
                        }
                        console.log(searchFilter.length);

                        if (searchFilter.length === 0 && searchInput.value !== "") {
                            searchResult = document.createElement("h2")
                            cards.appendChild(searchResult)
                            searchResult.setAttribute("class", "result")
                            searchResult.innerHTML = "Nəticə tapılmadı"
                            cards.classList.add("active")
                        }
                        else {
                            cards.classList.remove("active")
                            searchResult && cards.removeChild(searchResult)
                        }
                        search.classList.remove("search-active")
                        clearTimeout(timer)

                    }, 3000)
                }
                startTimer()
            })

            const cats = data.map(item => {

                const category = item.category
                const value = item.value
                const newData = { category, value }
                return newData
            })

            function removeDuplicates(array, property) {
                const uniqueValues = new Set();

                const categories = array.filter(item => {
                    if (!uniqueValues.has(item[property])) {
                        uniqueValues.add(item[property]);
                        return true;
                    }
                    return false;
                });

                return categories;
            }
            let categories = removeDuplicates(cats, 'category');

            const selectCat = document.querySelector("#category")

            categories.forEach(element => {
                selectCat && (selectCat.innerHTML += `<option value=${element.value}>${element.category}</option>`)
            })


            selectCat && selectCat.addEventListener("change", () => {
                arrLength = 21
                indexArr = 21

                btnMoreCard.classList.add("visibility")
                container.classList.add("active")
                resultData = ""
                cards.innerHTML = resultData
                selectFilter = data.filter(item => item.value === selectCat.value)

                if (selectCat.value === "allCategory") {
                    filter = "all"
                    setTimeout(() => {
                        getCashbackData(data)
                        container.classList.remove("active")
                        data.length < 21 ? btnMoreCard.classList.add("visibility") : btnMoreCard.classList.remove("visibility")
                    }, 1500);
                }
                else {
                    filter = "change"
                    setTimeout(() => {
                        getCashbackData(selectFilter)
                        container.classList.remove("active")
                        selectFilter.length < 21 ? btnMoreCard.classList.add("visibility") : btnMoreCard.classList.remove("visibility")
                    }, 1500);
                }
            })

            function getMoreCards(dataItem) {
                if (arrLength < dataItem.length) {
                    indexArr += 21
                    if (indexArr > dataItem.length) {
                        indexArr = indexArr - 21 + dataItem.length % 21
                        btnMoreCard.classList.add("visibility")
                    }
                    else {
                        btnMoreCard.classList.remove("visibility")
                    }

                    for (let i = arrLength; i < indexArr; i++) {
                        resultData +=
                            `<div class="card">
                            <a href = "#"><div class="cardImage" style ="background-image: url(${dataItem[i].img})"></div></a>
                            <div class="content">
                                <div class="info">
                                <h3><a href = "#">${dataItem[i].name}</a></h3>
                                    <p>${dataItem[i].category}</p>
                                </div>
                                <div class="discount">
                                    <p>${dataItem[i].discount}</p>
                                    <span>${dataItem[i].currency}</span>
                                </div>
                            </div>
                        </div>`
                    }
                    cards.innerHTML = resultData
                    arrLength += 21
                }
                else {
                    indexArr = 21
                    arrLength = 21
                }
            }


            function more() {
                btnMoreCard && btnMoreCard.addEventListener("click", () => {
                    btnMoreCard.classList.add("active")
                    setTimeout(() => {
                        btnMoreCard.classList.remove("active")
                        filter === "" || filter === "all" && getMoreCards(data)
                        filter === "change" && getMoreCards(selectFilter)
                    }, 1500);
                })
            }
            more()

        })
}

cards && getCashback()

export default cashbackMain