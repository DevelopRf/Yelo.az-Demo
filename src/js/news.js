const newsCards = document.querySelector('.allNews .cards')
const btnMoreNews = document.querySelector('.btnMoreNews')
const btnBox = document.querySelector('.header .btnBox')
const modal = document.querySelector('.modal')
let resultData = ""
console.log("kjlkjblhjbljb");
btnMoreNews && btnMoreNews.addEventListener("click", () => {
    getAllNews(getCard)
})

const currency = new Currency()
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

                newsCards.innerHTML = resultData
                console.log("jgkjhkjhj");
                arrLength += 15
            }
            else {
                indexArr = 0
            }
            callback()
        })
}

newsCards && getAllNews(getCard)

newsCards && window.addEventListener('load', () => {
    btnBox.classList.add("active")
})

let updateDb = false
let deleteDb = false
let newsId
let text

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
    const btnSubmit = document.querySelector('.formContent')
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
            news.innerHTML = resultData
        })
}

news && showNews()

export { resultData, modal }