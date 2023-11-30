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
let screenSize = false

let scrolling = 0
let scrollPage = 0

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

if (slider) {

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
                goToSlide(indexMain);
            }, 10000);
        };

        dots.forEach((dot, dotIndex) => {
            dot.addEventListener("click", () => {
                clearInterval(intervalMain);
                indexMain = dotIndex;
                goToSlide(indexMain);
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

        prevSlider.addEventListener("click", () => {
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

        nextSlider.addEventListener("click", () => {
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

    function range() {
        const calcItems = document.querySelectorAll('.calcItems .item')
        let result = document.querySelector('.result p:last-of-type')
        const amount = document.querySelector('.calcItems .item:first-of-type .number')
        const month = document.querySelector('.calcItems .item:nth-of-type(2) .number')
        const percent = document.querySelector('.calcItems .item:last-of-type .number')

        for (const item of calcItems) {
            const range = item.querySelector('.range')
            const number = item.querySelector('.number')

            range.value = number.value
            result.innerHTML = ((amount.value / 2 + percent.value / 2 + month.value / 2) * 100).toFixed(2)


            range.addEventListener('input', () => {
                number.value = range.value
                result.innerHTML = ((amount.value / 2 + percent.value / 2 + month.value / 2) * 100).toFixed(2)
            })

            number.addEventListener('input', () => {
                number.value == "" && (number.value = 0)
                range.value = number.value
                result.innerHTML = ((amount.value / 2 + percent.value / 2 + month.value / 2) * 100).toFixed(2)
            })
        }
    }

    range()



    const amountInput = document.querySelector("#sale");
    const firstOption = document.querySelector("#currencyReceived")
    const secondOption = document.querySelector("#soldCurrency")
    const inputResult = document.querySelector("#inputResult")

    amountInput.addEventListener('input', exchange)
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

    function exchange() {
        const amount = Number(amountInput.value)
        const firstOptionValue = firstOption.options[firstOption.selectedIndex].textContent
        const secondOptionValue = secondOption.options[secondOption.selectedIndex].textContent



        currency.exchange(amount, firstOptionValue, secondOptionValue)
            .then((result => {
                inputResult.value = result.toFixed(2)
                if (amountInput.value == "") {
                    inputResult.value = ""
                }
            }))
    }

    function showData() {
        const purchase = document.querySelectorAll(".purchase h5")
        const sale = document.querySelectorAll(".sale h5")
        currency.exchangeShow(purchase[0], purchase[1], sale[0], sale[1])
    }

    showData()

    const btnClose = document.querySelector('.btnClose')
    const bigMenu = document.querySelector('.bigMenu')
    btnClose.addEventListener('click', () => {
        btnClose.classList.toggle('effectToggle')

        if (btnClose.classList.contains('effectToggle')) {
            bigMenu.classList.add('active')
            headerBottom.classList.remove('active')
            headerTop.classList.remove('active')
            document.body.style.overflowY = 'hidden'
        }
        else {
            bigMenu.classList.remove('active')
            document.body.style.overflowY = 'scroll'
        }
    })
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
            headerBottom.classList.add('active')
            header.classList.add('active')
        }
        else {
            headerBottom.classList.remove('active')
            header.classList.remove('active')
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
                mobAppDesk.style.display = 'none'
                header.style.top = 0
                slider && slider.classList.add('active')
            }
            else {
                mobAppDesk.style.display = 'blok'
                mobAppDesk.style.height = `120px`
                header.style.top = `120px`
                slider && (slider.style.margin = `120px 0 0`)
            }
        }
        else {
            mobAppDesk.style.display = 'none'
            header.style.top = 0
            slider.classList.remove('active')

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
        slider.style.margin = 0
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

function showNews() {
    const news = document.querySelector('.news .cards')
    const allNews = document.querySelector('.allNews .cards')
    currency.data()
        .then(data => {
            for (let index = 0; index < 3; index++) {
                const acceptDate = new Date(data[index].date)
                const showDate = convertDateFormat(acceptDate)
                resultData += `
                <div class="card">
                    
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

    currency.data()
        .then(data => {
            resultData = ""
            data = data.reverse()
            data.forEach(element => {
                const acceptDate = new Date(element.date)
                const showDate = convertDateFormat(acceptDate)
                resultData += `
                <div class="card">
                    
                        <div class="innerCard">
                            <div class="content">
                                <p>${element.title}</p>
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
            });
            allNews && (allNews.innerHTML = resultData)
        })
    const btnBox = document.querySelector('.header .btnBox')
    allNews && window.addEventListener('load', () => {
        btnBox.style.gap = 0
    })
}
showNews()



const addNews = document.querySelector('.headerNews .addNews')
const btnSubmit = document.querySelector('.formContent')
const textArea = document.querySelector('#newsContent')
addNews && addNews.addEventListener("click", () => {
    modal.classList.add('activeModal')
})

let isUpdate = false
btnSubmit && btnSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    let isNotNull = false;
    if (!isUpdate) {
        const formData = {};
        if (!textArea.value == "") {
            formData[textArea.name] = textArea.value;
            const currentDate = new Date();
            const isoDate = currentDate.toISOString();
            formData.date = isoDate;
            isNotNull = true;
        }
        else {
            textArea.style.borderColor = "red";
        }
        if (isNotNull) {
            fetch("http://localhost:3000/news", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(formData),
            });
            setInterval(() => {
                getNews();
            }, 1000);
        }
    }

    else {
        let data;
        if (!textArea.value == "") {
            data = {
                title: `${textArea.value}`
            }
            isNotNull = true;
        } else {
            textArea.style.borderColor = "red";
        }
        if (isNotNull) {
            fetch(`http://localhost:3000/news/${updatedId}`, {
                method: "PACTH",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(data),
            });
            setInterval(() => {
                getNews();
            }, 1000);
        }
    }
    isUpdate = false;
})