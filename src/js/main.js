const header = document.querySelector('.header')
const headerTop = document.querySelector('.headerTop')
const leftMenuTop = document.querySelectorAll('.headerTop .navbarLeft .menu a')
const btnSearch = document.querySelector('.headerTop .navbarRight .menu li:nth-child(4) a')
const headerBottom = document.querySelector('.headerBottom')
const btnBankInter = document.querySelector('.btnBankInter')
const BankInterText = document.querySelector('.btnBankInter span')
const slider = document.querySelector('.slider')
const sliders = document.querySelectorAll('.slider .sliderItem')
const dots = document.querySelectorAll('.dot li')
const storyChange = document.querySelectorAll('.storyChange .changeItem')
const stories = document.querySelectorAll('.storySliders .sliderItem')
const dot = document.querySelector('.dot')
const shortNumber = document.querySelector('.navbarRight .menu li:nth-child(3) a')
const storyCards = document.querySelectorAll('.stories .card')
const modal = document.querySelector('.modal')
const close = document.querySelector('.modal .close')
const searchClose = document.querySelector('.searchBox .close')
const searchBox = document.querySelector('.searchBox')
const mediaQuery = window.matchMedia('(min-width: 1024px)')
const langBtn = document.querySelector('.navbarRight .menu li:last-of-type')
const lang = document.querySelector('.navbarRight .languages')
const allNews = document.querySelector('.allNews')
const credits = document.querySelector('.credits')

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

const currency = new Currency()

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

function sliderMain() {
    let indexMain = 0
    let intervalMain = null
    const goToSlide = (slideIndex) => {
        for (const element of sliders) {
            element.style.transform = `translateX(-${slideIndex * 100}%)`;
        }
        for (const dot of dots) {
            dot.classList.remove('selected');
        }
        dots[slideIndex].classList.add('selected');
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

sliderMain()

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

sliderStories()

const amountInput = document.querySelector("#sale");
const firstOption = document.querySelector("#currencyReceived")
const secondOption = document.querySelector("#soldCurrency")
const inputResult = document.querySelector("#inputResult")

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
const bigMenu = document.querySelector('.bigMenu')
btnClose && btnClose.addEventListener('click', () => {
    btnClose.classList.toggle('effectToggle')

    if (btnClose.classList.contains('effectToggle')) {
        bigMenu.classList.add('active')
        headerTop.classList.remove('active')
        document.body.style.overflowY = 'hidden'
    }
    else {
        bigMenu.classList.remove('active')
        document.body.style.overflowY = 'scroll'
    }
})

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
            }
            else {
                mobAppDesk.classList.add("active")
                header.style.top = `${mobAppDesk.clientHeight}px`
                slider && slider.classList.add("active")
                allNews && allNews.classList.add('active')
                credits && credits.classList.add('active')
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

function convertDateFormat(dateString) {
    const months = [
        "yanvar", "fevral", "mart", "aprel", "may", "iyun",
        "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"
    ];

    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
}


const news = document.querySelector('.news .cards')

function showNews() {

    currency.data()
        .then(data => {
            for (let index = 0; index < 3; index++) {
                const acceptDate = new Date(data[index].date)
                const showDate = convertDateFormat(acceptDate)
                resultData +=
                    `<div class="card">
                            <div class="innerCard">
                                <div class="content">
                                    <p>${data[index].title}</p>
                                </div>
                                <div class="bottomInfo">
                                    <div class="btn">
                                        <a href="#" class="btnMore">Daha
                                            ətraflı
                                            <svg width="29px" height="13px" viewBox="0 0 29 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink">
                                                <!-- Generator: Sketch 64 (93537) - https://sketch.com -->
                                                <title>Group 3</title>
                                                <desc>Created with Sketch.</desc>
                                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g id="home(dark)" transform="translate(-1211.000000, -1529.000000)" fill="#0091FE">
                                                        <g id="Group-3" transform="translate(1225.500000, 1535.500000) scale(-1, 1) translate(-1225.500000, -1535.500000) translate(1211.000000, 1528.000000)">
                                                            <rect id="Rectangle" x="2.12121212" y="6.61363636" width="26.5757576" height="1.77272727"></rect>
                                                            <polygon id="Rectangle" transform="translate(3.947429, 4.848025) rotate(-45.000000) translate(-3.947429, -4.848025) " points="-0.608762814 4.04229183 8.48089403 3.93956052 8.5036213 5.73501506 1.10543544 5.75649009"></polygon>
                                                            <polygon id="Rectangle" transform="translate(3.947429, 10.151975) scale(1, -1) rotate(-45.000000) translate(-3.947429, -10.151975) " points="-0.608762814 9.34624123 8.48089403 9.24350991 8.5036213 11.0389645 1.10543544 11.0604395"></polygon>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </div>
                                    <time>
                                        ${showDate}
                                    </time>
                                </div>
                            </div>
                    </div>`
            }
            news && (news.innerHTML = resultData)
        })
}

news && showNews()
const newsCards = document.querySelector('.allNews .cards')
const btnMoreNews = document.querySelector('.btnMoreNews')
let arrLength = 0
let indexArr = 0

function getAllNews(callback) {
    currency.data()
        .then(data => {
            if (arrLength < data.length) {
                indexArr += 15
                if (indexArr > data.length) {
                    indexArr = indexArr - 15 + data.length % 15
                    btnMoreNews.style.display = "none"
                }
                for (let index = arrLength; index < indexArr; index++) {
                    const acceptDate = new Date(data[index].date)
                    const showDate = convertDateFormat(acceptDate)
                    resultData +=
                        `<div class="card">
                        <ul class = "tool">
                            <li>                            
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
                            </li>
                            <li data-id=${data[index].id}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z"/></svg>
                            </li>
                            <li data-id=${data[index].id}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg> 
                            </li>                            
                        </ul>
                        <div class="innerCard">
                            <div class="content">
                                <p>${data[index].title}</p>
                            </div>
                            <div class="bottomInfo">
                                <div class="btn">
                                    <a href="javascript: void(0)" class="btnMore">Daha
                                        ətraflı
                                        <svg width="29px" height="13px" viewBox="0 0 29 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink">
                                            <!-- Generator: Sketch 64 (93537) - https://sketch.com -->
                                            <title>Group 3</title>
                                            <desc>Created with Sketch.</desc>
                                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <g id="home(dark)" transform="translate(-1211.000000, -1529.000000)" fill="#0091FE">
                                                    <g id="Group-3" transform="translate(1225.500000, 1535.500000) scale(-1, 1) translate(-1225.500000, -1535.500000) translate(1211.000000, 1528.000000)">
                                                        <rect id="Rectangle" x="2.12121212" y="6.61363636" width="26.5757576" height="1.77272727"></rect>
                                                        <polygon id="Rectangle" transform="translate(3.947429, 4.848025) rotate(-45.000000) translate(-3.947429, -4.848025) " points="-0.608762814 4.04229183 8.48089403 3.93956052 8.5036213 5.73501506 1.10543544 5.75649009"></polygon>
                                                        <polygon id="Rectangle" transform="translate(3.947429, 10.151975) scale(1, -1) rotate(-45.000000) translate(-3.947429, -10.151975) " points="-0.608762814 9.34624123 8.48089403 9.24350991 8.5036213 11.0389645 1.10543544 11.0604395"></polygon>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                                <time>
                                    ${showDate}
                                </time>
                            </div>
                        </div>
                     </div>`
                }

                newsCards && (newsCards.innerHTML = resultData)
                arrLength += 15
            }
            else {
                indexArr = 0
            }
            callback()
        })
}

newsCards && getAllNews(getCard)

const btnBox = document.querySelector('.header .btnBox')
newsCards && window.addEventListener('load', () => {
    btnBox.style.gap = 0
})

btnMoreNews && btnMoreNews.addEventListener("click", () => {
    getAllNews(getCard)
})

let updateDb = false
let deleteDb = false
let newsId
let text

const btnSubmit = document.querySelector('.formContent')
const textArea = document.querySelector('#newsContent')
const loader = document.querySelector('.loader')

function getCard() {

    const tool = document.querySelectorAll('.tool')

    tool.forEach(item => {
        item.querySelector(".tool li:first-child").addEventListener("click", () => {
            tool.forEach(toolitem => {
                if (toolitem !== item && toolitem.classList.contains("active")) {
                    toolitem.classList.remove("active")
                }
            })


            if (item.classList.contains("active")) {
                item.classList.remove("active")
            }
            else {
                item.classList.add("active")
            }
        })
    })
    const showModal = () => modal.classList.add('activeModal')
    const addNewsB = document.querySelector('.headerNews .addNews')
    addNewsB && addNewsB.addEventListener("click", () => {
        showModal()
        textArea.innerHTML = ""
    })

    const btnUpdaate = document.querySelectorAll('.tool li:nth-child(2)')
    const btnDelete = document.querySelectorAll(".tool li:nth-child(3)")
    const errorMessage = document.querySelector(".formContent .btn p")

    textArea.addEventListener("input", () => {
        text = textArea.value
        errorMessage.innerHTML = ""
        textArea.classList.remove("error")
    })

    btnUpdaate.forEach(update => {
        update.addEventListener('click', () => {
            textArea.innerHTML = update.parentElement.nextElementSibling.firstElementChild.firstElementChild.textContent
            showModal()
            updateDb = true
            newsId = update.dataset.id
        })
    })

    btnDelete.forEach(del => {
        del.addEventListener("click", () => {
            const deleteQuestion = window.confirm("Xəbəri silməyinizə əminsiniz?")
            deleteDb = true
            newsId = del.dataset.id
            if (deleteQuestion) {
                loader.classList.add("active")
                setTimeout(() => {
                    fetch(`http://localhost:3000/news/${newsId}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                    loader.classList.remove("active")
                }, 1500);
            }
            else {
                return
            }
        })
    })
}


function submit() {
    btnSubmit.addEventListener("submit", (e) => {
        e.preventDefault();
        const d = new Date()
        let data = {
            title: textArea.value,
            date: d.toISOString()
        }
        if (text != null) {
            modal.classList.remove('activeModal')
            loader.classList.add("active")

            if (!updateDb) {
                setTimeout(() => {
                    fetch("http://localhost:3000/news", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })
                    loader.classList.remove("active")
                }, 1500);
            }

            else {
                const updateQuestion = window.confirm("Xəbərin məzmunu dəyişəcək. Əminsiniz?")
                if (updateQuestion) {
                    setTimeout(() => {
                        fetch(`http://localhost:3000/news/${newsId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })
                        loader.classList.remove("active")
                    }, 1500);
                }
                else { return }
            }
        }
        else {
            e.preventDefault()
            textArea.classList.add("error")
            errorMessage.innerHTML = "Boş məzmun əlavə edilə bilməz..."
        }
        updateDb = false
    })
}

newsCards && submit()

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

const creditItem = document.querySelectorAll(".creditItem")
const calc = document.querySelectorAll(".creditItem .calc")
creditItem.forEach(item => {
    item.querySelector(".creditItem .calc") &&
        item.querySelector(".btnOrder").addEventListener("click", () => {

            for (const element of calc) {
                if (element.classList.contains("active")) {
                    element.classList.remove("active")
                }
            }
            item.querySelector(".calc").classList.toggle("active")
        })

})