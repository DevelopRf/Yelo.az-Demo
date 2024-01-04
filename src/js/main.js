import { resultData, modal } from "./news.js"
import { credits } from "./credit.js"
import creditCards from "./credit-cards.js"
const header = document.querySelector('.header')
const headerTop = document.querySelector('.headerTop')
const leftMenuTop = document.querySelectorAll('.headerTop .navbarLeft .menu a')
const btnSearch = document.querySelector('.headerTop .navbarRight .menu li:nth-child(4) a')
const headerBottom = document.querySelector('.headerBottom')
const btnBankInter = document.querySelector('.btnBankInter')
const slider = document.querySelector('.slider')
const dots = document.querySelectorAll('.dot li')
const storyChange = document.querySelectorAll('.storyChange .changeItem')
const stories = document.querySelectorAll('.storySliders .sliderItem')
const storyCards = document.querySelectorAll('.stories .card')
const close = document.querySelector('.modal .close')
const searchClose = document.querySelector('.searchBox .close')
const searchBox = document.querySelector('.searchBox')
const mediaQuery = window.matchMedia('(min-width: 1024px)')
const langBtn = document.querySelector('.navbarRight .menu li:last-of-type')
const lang = document.querySelector('.navbarRight .languages')
const allNews = document.querySelector('.allNews')
const cashbackMain = document.querySelector('.cashbackMain')
const bigMenu = document.querySelector('.bigMenu')

let screenSize = false
let scrolling = 0
let scrollPage = 0

langBtn.addEventListener('click', () => {
    lang.classList.toggle("active")
})

function changeScreen(e) {
    (e.matches) && (screenSize = true)
}

changeScreen(mediaQuery)
mediaQuery.addEventListener('change', changeScreen)



document.addEventListener("click", (e) => {
    if (e.target == modal || e.target == close) {
        modal.classList.remove('activeModal')
    }

    if (document.body.classList.contains('active')) {
        if (e.target == document.body || e.target == searchClose) {
            document.body.classList.remove('active')
            searchBox.classList.remove('active')
        }
    }
})
btnSearch.addEventListener("click", () => {
    searchBox.classList.add('active')
    document.body.classList.add('active')
})

searchClose.addEventListener("click", () => {
    searchBox.classList.remove('active')
})

leftMenuTop.forEach((item, index) => {
    item.addEventListener("click", () => {

        for (const element of leftMenuTop) {
            element.classList.remove("active")
        }
        leftMenuTop[index].classList.add("active")
    })
})

const sliderBox = document.querySelector(".wrapper .sliderBox")

function sliderMain() {
    let indexMain = 0
    let intervalMain = null
    const firstSliderItem = sliderBox.querySelectorAll(".sliderItem")
    const goToSlide = (slideIndex) => {
        const targetSlide = firstSliderItem[slideIndex];
        if (targetSlide) {
            const slideWidth = targetSlide.offsetWidth;

            sliderBox.scrollTo({
                left: slideWidth * slideIndex,
                behavior: 'smooth'
            });

            dots.forEach(dot => dot.classList.remove('selected'));
            dots[slideIndex].classList.add('selected');
        }
    };

    const startIntervalMain = () => {
        intervalMain = setInterval(() => {
            indexMain++;
            if (indexMain > dots.length - 1) {
                indexMain = 0;
            }
            slider && goToSlide(indexMain);
        }, 10000);
    };

    dots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => {
            clearInterval(intervalMain);
            indexMain = dotIndex;
            dots && goToSlide(indexMain);
            startIntervalMain();


        });
    });

    startIntervalMain();
}

slider && sliderMain()

function moveItem() {
    let isDragging = false, startX, startScrollLeft;

    const dragStart = (e) => {
        isDragging = true
        sliderBox.classList.add("dragging")
        startX = e.clientX;
        startScrollLeft = sliderBox.scrollLeft
    }

    const dragStop = () => {
        isDragging = false
        sliderBox.classList.remove("dragging")
    }

    const dragging = (e) => {
        if (!isDragging) return;
        sliderBox.scrollLeft = startScrollLeft - (e.clientX - startX)
    }

    sliderBox.addEventListener("mousedown", dragStart)
    sliderBox.addEventListener("mousemove", dragging)
    sliderBox.addEventListener("mouseup", dragStop)
}

slider || stories || moveItem()




function timeBar(barİndex) {
    const progress = document.querySelectorAll('.progressBar li .progress')
    for (const item of progress) {
        item.classList.remove('active')
    }
    progress[barİndex].classList.add('active')
}

function sliderStories() {
    let interval = null
    const prevSlider = document.querySelector('.modal .prev')
    const nextSlider = document.querySelector('.modal .next')

    const goToSlideStories = (slideIndex) => {
        for (const element of stories) {
            element.style.transform = `translateX(-${slideIndex * 100}%)`;
        }
        timeBar(slideIndex)
    };

    storyCards.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => {
            modal.classList.add('activeModal')
            clearInterval(interval);
            index = dotIndex;
            goToSlideStories(index);
            startInterval();
        })
    })

    storyChange.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => {
            clearInterval(interval);
            index = dotIndex;
            goToSlideStories(index);
            startInterval();
        })
    })

    const startInterval = () => {
        interval = setInterval(() => {
            index++;
            if (index > stories.length - 1) {
                index = 0;
            }
            goToSlideStories(index);
        }, 10000);
    };

    prevSlider && prevSlider.addEventListener("click", () => {
        clearInterval(interval);
        index--
        if (index < 0) {
            index = stories.length - 1
        }
        for (const element of stories) {
            element.style.transform = `translateX(-${index * 100}%)`
        }
        timeBar(index)
        startInterval()
    })

    nextSlider && nextSlider.addEventListener("click", () => {
        clearInterval(interval);
        index++
        if (index > stories.length - 1) {
            index = 0
        }
        for (const element of stories) {
            element.style.transform = `translateX(-${index * 100}%)`
        }
        timeBar(index)
        startInterval()
    })
}

stories && sliderStories()

const amountInput = document.querySelector("#sale");
const firstOption = document.querySelector("#currencyReceived")
const secondOption = document.querySelector("#soldCurrency")
const inputResult = document.querySelector("#inputResult")
const currency = new Currency()
amountInput && amountInput.addEventListener('input', exchange)
if (firstOption) {

    firstOption.addEventListener("change", exchange)

    firstOption.addEventListener("input", () => {
        if (firstOption.value !== "AZN") {
            secondOption.innerHTML = `<option value = "AZN">AZN</option>`
        }
        else {
            secondOption.innerHTML = `<option value = "USD">USD</option>`
            secondOption.innerHTML += `<option value = "EUR">EUR</option>`
        }
    })

    function showData() {
        const purchase = document.querySelectorAll(".purchase h5")
        const sale = document.querySelectorAll(".sale h5")
        currency.exchangeShow(purchase[0], purchase[1], sale[0], sale[1])
    }

    showData()
}

function exchange() {
    const amount = Number(amountInput.value)
    const firstOptionValue = firstOption.options[firstOption.selectedIndex].textContent
    const secondOptionValue = secondOption.options[secondOption.selectedIndex].textContent

    currency.exchange(amount, firstOptionValue, secondOptionValue)
        .then((result => {

            inputResult.value = result.toFixed(0)
            if (amountInput.value == "") {
                inputResult.value = ""
            }
        }))
}

const btnClose = document.querySelector('.btnClose')

btnClose && btnClose.addEventListener('click', () => {
    btnClose.classList.toggle('effectToggle')

    if (btnClose.classList.contains('effectToggle')) {
        bigMenu.classList.add('active')
        headerTop.classList.remove('active')
        headerBottom.classList.add('active')
        document.body.style.overflowY = 'hidden'
    }
    else {
        bigMenu.classList.remove('active')
        document.body.style.overflowY = 'scroll'
    }
})

const currentLocation = location.href
const menuItem = document.querySelectorAll(".headerBottom .navbar .menu a")
for (let index = 0; index < menuItem.length; index++) {
    if (menuItem[index].href === currentLocation)
        menuItem[index].classList.add("active")
}

const calcItems = document.querySelectorAll('.calcItems .item')

if (calcItems) {
    function range() {
        const result = document.querySelector('.result p:last-of-type')
        const amount = document.querySelector('.calcItems .item:first-of-type .number')
        const month = document.querySelector('.calcItems .item:nth-of-type(2) .number')
        const percent = document.querySelector('.calcItems .item:last-of-type .number')

        const totalResult = () => {
            const amountValue = parseFloat(amount.value)
            const monthValue = parseFloat(month.value)
            const percentValue = parseFloat(percent.value)
            result && (result.innerHTML = `${(((amountValue + monthValue) * percentValue / 100)).toFixed(0).toString()} <span>AZN</span>`)
        }

        function handleRangeInput(item) {
            item.style.setProperty("--val", item.value);
            item.previousElementSibling.previousElementSibling.value = item.value;
        }
        function handleNumberInput(item) {
            item.nextElementSibling.nextElementSibling.value = item.value;
            item.nextElementSibling.nextElementSibling.style.setProperty("--val", item.value);
        }

        calcItems.forEach(item => {

            const range = item.querySelector('.range')
            const number = item.querySelector('.number')

            range.value = number.value
            totalResult()

            number.addEventListener('input', () => {
                if (number.value.trim() == "") {
                    number.value = 0
                }
                else if (number.value.startsWith('0')) {
                    number.value = number.value.replace(/^0+/, '')
                }
                handleNumberInput(number)
                totalResult()
            })

            range.addEventListener('input', () => {
                handleRangeInput(range)
                totalResult()
            })
        })
    }
    range()
}


function headerEffect() {

    document.addEventListener('scroll', () => {
        scrolling = scrollY

        if (scrolling > scrollPage) {
            addEffect()
        }
        else {
            removeEffect()
        }

        if (scrolling == 0) {
            headerBottom.classList.remove('active')
            header.classList.remove('active')
        }
        else {
            headerBottom.classList.add('active')
            header.classList.add('active')
        }

        scrollPage = scrolling
    })
}

headerEffect()

function addEffect() {
    headerTop.classList.add('active')
    btnBankInter.classList.add('active')
}

function removeEffect() {
    headerTop.classList.remove('active')
    btnBankInter.classList.remove('active')
}

function mobilApp() {
    let active
    const mobileTopClose = document.querySelector('.mobAppDesk .close')
    const mobAppDesk = document.querySelector('.mobAppDesk')
    const mobApp = document.querySelector('.mobApp')
    const mobAppClose = document.querySelector('.mobApp .close')
    setTimeout(() => {
        if (screenSize) {
            if (localStorage.getItem("status")) {
                mobAppDesk.classList.remove("active")
                header.style.top = 0
                slider && slider.classList.remove('active')
                allNews && allNews.classList.remove('active')
                credits && credits.classList.remove('active')
                creditCards && creditCards.classList.remove('active')
                cashbackMain && cashbackMain.classList.remove('.active')
                bigMenu.classList.remove("active-position")
            }
            else {
                mobAppDesk.classList.add("active")
                header.style.top = `${mobAppDesk.clientHeight}px`
                slider && slider.classList.add("active")
                allNews && allNews.classList.add('active')
                credits && credits.classList.add('active')
                creditCards && creditCards.classList.add('active')
                cashbackMain && cashbackMain.classList.add('.active')
                bigMenu.classList.add("active-position")
            }
        }
        else {
            mobAppDesk.classList.remove("active")
            header.style.top = 0
            slider && slider.classList.remove('active')
            allNews && allNews.classList.remove('active')

            if ((localStorage.getItem("status"))) {
                mobApp.classList.remove('active')
            }
            else {
                mobApp.classList.add('active')
            }

        }
    }, 2500);

    mobileTopClose.addEventListener('click', () => {
        header.style.top = 0
        mobAppDesk.style.height = 0
        slider.classList.remove("active")
        active = false

        localStorage.setItem("status", active)
    })
    mobAppClose.addEventListener('click', () => {
        mobApp.classList.remove('active')
        active = false
        localStorage.setItem("status", active)
    })
}

mobilApp()

const elCalcItem = document.querySelectorAll(".calcItems")
function calcItem() {

    elCalcItem.forEach(item => {
        if (item.querySelector("input[type=text]") || item.querySelector("select")) {
            item.classList.add("input-active")
        }
        else {
            item.classList.add("range-active")
        }
    })
}

elCalcItem && calcItem()

const cashback = new Cashback()
const getCashback = () => {
    const search = document.querySelector(".filters .search input")
    cashback.getCashback()
        .then(data => {
            const cards = document.querySelector(".cashbackCards .cards")
            const container = document.querySelector(".cashbackCards .container")
            const btnMoreCard = document.querySelector(".cashbackCards .btnMoreCard")
            function getCashbackData() {
                for (let i = 0; i < 30; i++) {
                    resultData += `<div class="card">
                    <div class="cardImage">
                        <a href = ""><img src="${data[i].img}" alt="">

                    </div>
                    <div class="content">
                        <div class="info">
                            <h3>${data[i].name}</h3>
                            <p>${data[i].category}</p>
                        </div>
                        <div class="discount">
                            <p>${data[i].discount}</p>
                            <span>${data[i].currency}</span>
                        </div>
                    </div>
                </div>`
                    cards.innerHTML = resultData
                }
            }

            getCashbackData()

            function getFilter() {

                resultData = ""
                const filterName = data.filter(item => item.name.toLowerCase().includes(search.value.toLowerCase()))

                filterName.forEach(filter => {
                    resultData += `<div class="card">
                        <div class="cardImage">
                            <img src="${filter.img}" alt="">
    
                        </div>
                        <div class="content">
                            <div class="info">
                                <h3>${filter.name}</h3>
                                <p>${filter.category}</p>
                            </div>
                            <div class="discount">
                                <p>${filter.discount}</p>
                                <span>${filter.currency}</span>
                            </div>
                        </div>
                    </div>`
                })
                search.value === "" && getCashbackData()
                cards.innerHTML = resultData
            }
            search.addEventListener("input", () => {
                getFilter()
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
                selectCat.innerHTML += `<option value=${element.value}>${element.category}</option>`
            })


            selectCat.addEventListener("change", () => {
                btnMoreCard.classList.add("active")
                container.classList.add("active")
                resultData = ""
                cards.innerHTML = resultData
                const cashbackData = data.filter(item => item.value === selectCat.value)
                cards.classList.add("active")
                if (selectCat.value === "allCategory") {
                    setTimeout(() => {
                        cards.classList.add("active")
                        getCashbackData()
                    }, 1500);
                }
                else {
                    cashbackData.forEach(item => {
                        resultData += `<div class="card">
                        <div class="cardImage">
                            <img src="${item.img}" alt="">

                        </div>
                        <div class="content">
                            <div class="info">
                                <h3>${item.name}</h3>
                                <p>${item.category}</p>
                            </div>
                            <div class="discount">
                                <p>${item.discount}</p>
                                <span>${item.currency}</span>
                            </div>
                        </div>
                    </div>`
                    })
                }

                setTimeout(() => {
                    cards.innerHTML = resultData
                    resultData = ""
                    container.classList.remove("active")
                    btnMoreCard.classList.remove("active")
                }, 1500);
            })
        })
}

cashbackMain && getCashback()


function getAboutCredit() {
    const txtMore = document.querySelector(".txtMore")
    const aboutCreditShort = document.querySelector(".aboutCreditShort")
    const aboutCredit = document.querySelector(".aboutCredit")

    txtMore && txtMore.addEventListener("click", () => {
        aboutCredit.classList.add("active")
        aboutCreditShort.classList.add("active")
    })
}

getAboutCredit()



export { resultData }