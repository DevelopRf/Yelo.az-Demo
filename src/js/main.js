import cashbackMain from "./cashback.js"
import { exchange } from "./exchange.js"
import { credits } from "./credit.js"
import creditCards from "./credit-cards.js"
import { modal } from "./news.js"
import { range, calcItems } from "./functions.js"
const header = document.querySelector('.header')
const headerTop = document.querySelector('.headerTop')
const leftMenuTop = document.querySelectorAll('.headerTop .navbarLeft .menu a')
const btnSearch = document.querySelector('.headerTop .navbarRight .menu li:nth-child(4) a')
const headerBottom = document.querySelector('.headerBottom')
const btnBankInter = document.querySelector('.btnBankInter')
const slider = document.querySelector('.slider')
const storyChange = document.querySelectorAll('.storyChange .changeItem')
const storyCards = document.querySelectorAll('.stories .card')
const close = document.querySelector('.modal .close')
const searchClose = document.querySelector('.searchBox .close')
const searchBox = document.querySelector('.searchBox')
const mediaQuery = window.matchMedia('(min-width: 1024px)')
const langBtn = document.querySelector('.navbarRight .menu li:last-of-type')
const lang = document.querySelector('.navbarRight .languages')
const allNews = document.querySelector('.allNews')
const bigMenu = document.querySelector('.bigMenu')
const useful = document.querySelector(".useful")
const allExchange = document.querySelector(".allExchange")
let screenSize = false
let scrolling = 0
let scrollPage = 0

slider && new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3500
    },
    pagination: {
        el: ".dot",
        clickable: true,
    }
});

const swiper = document.querySelector('.mySwiper1') && new Swiper(".mySwiper1", {
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 10000
    },
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".next",
        prevEl: ".prev"
    }
});

if (useful || allExchange) {
    exchange()

}

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

function timeBar(barİndex) {
    const progress = document.querySelectorAll('.progressBar li .progress')
    for (const item of progress) {
        item.classList.remove('active')
    }
    progress[barİndex].classList.add('active')
}


function sliderStories() {

    const slideritem = document.querySelectorAll(".mySwiper1 [data-index]")

    slideritem.forEach(item => {
        if (item.dataset.index === "0") {
            item.style.backgroundColor = "#81BD5B"
        }
        else if (item.dataset.index === "1") {
            item.style.backgroundColor = "#0071C7"
        }
        else if (item.dataset.index === "2") {
            item.style.backgroundColor = "#D82A34"
        }
    })
    const prevSlider = document.querySelector('.modal .prev')
    const nextSlider = document.querySelector('.modal .next')
    storyCards.forEach((dot, sliderIndex) => {
        dot.addEventListener("click", () => {
            swiper.slideToLoop(sliderIndex)
            modal.classList.add('activeModal')
            swiper.autoplay.start()
            timeBar(swiper.realIndex)
        })
    })

    prevSlider && prevSlider.addEventListener("click", () => {
        timeBar(swiper.realIndex)
    })

    nextSlider && nextSlider.addEventListener("click", () => {

        timeBar(swiper.realIndex)
    })

    storyChange.forEach((item, sliderIndex) => {
        item.addEventListener("click", () => {
            swiper.slideToLoop(sliderIndex)
        })
    })

    swiper.on("slideChange", () => {

        timeBar(swiper.realIndex)
    })
}

document.querySelector('.mySwiper1') && sliderStories()

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


range(calcItems)



function headerEffect() {

    document.addEventListener('scroll', () => {
        scrolling = window.scrollY
        if (scrolling > scrollPage) {
            headerTop.classList.add('active')
            btnBankInter.classList.add('active')
        }
        else {
            headerTop.classList.remove('active')
            btnBankInter.classList.remove('active')
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

    if (window.scrollY > 0) {
        headerBottom.classList.add('active')
        header.classList.add('active')
    }
    else {
        headerBottom.classList.remove('active')
        header.classList.remove('active')
    }

}

headerEffect()
const mobAppDesk = document.querySelector('.mobAppDesk')
function removeEffect() {
    mobAppDesk.classList.remove("active")
    slider && slider.classList.remove('active')
    allNews && allNews.classList.remove('active')
    credits && credits.classList.remove('active')
    creditCards && creditCards.classList.remove('active')
    cashbackMain && cashbackMain.classList.remove('.active')
    bigMenu.classList.remove("active-position")
    allExchange && allExchange.classList.remove("active")
    header && header.classList.remove("position")
}
function addEffect() {
    mobAppDesk.classList.add("active")
    slider && slider.classList.add("active")
    allNews && allNews.classList.add('active')
    credits && credits.classList.add('active')
    creditCards && creditCards.classList.add('active')
    cashbackMain && cashbackMain.classList.add('.active')
    bigMenu.classList.add("active-position")
    allExchange && allExchange.classList.add("active")
    header && header.classList.add("position")
}

function mobilApp() {
    let active
    const mobileTopClose = document.querySelector('.mobAppDesk .close')
    const mobApp = document.querySelector('.mobApp')
    const mobAppClose = document.querySelector('.mobApp .close')
    mobileTopClose.addEventListener('click', () => {
        sessionStorage.setItem("status", active)
        removeEffect()
        active = false
    })
    mobAppClose.addEventListener('click', () => {
        mobApp.classList.remove('active')
        active = false
        sessionStorage.setItem("status", active)
    })
    setTimeout(() => {
        if (screenSize) {
            if (sessionStorage.getItem("status")) {
                removeEffect()
            }
            else {
                addEffect()
            }
        }
        else {
            mobAppDesk.classList.remove("active")
            header.style.top = 0
            slider && slider.classList.remove('active')
            allNews && allNews.classList.remove('active')

            if ((sessionStorage.getItem("status"))) {
                mobApp.classList.remove('active')
            }
            else {
                mobApp.classList.add('active')
            }

        }
    }, 2500);
}

mobilApp()

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