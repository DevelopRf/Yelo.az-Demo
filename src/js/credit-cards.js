const creditCards = document.querySelector('.creditCards')
let resultData = ""
const cardData = new Cards()
const getCards = () => {
    const wrapper = document.querySelector(".creditCards .wrapper")
    cardData.cardData()
        .then(data => {
            data.forEach(item => {

                resultData += `<div class="creditCardItem">
                <div class="card">
                    <div class="image" style="background-image: url('./img/app_block.svg');">
                        <div class="img" data-tilt >
                            <img src="${item.img}" alt="">
                        </div>
                    </div>
                    <div class="content">
                        <div class="title">
                            <h2>${item.name}</h2>
                            <p>${item.description}</p>
                        </div>
                        <div class="info">
                            <div class="infoItem">
                                <span>${item.title1}</span>
                                <p>${item.title1_Text}</p>
                            </div>
                            <div class="infoItem">
                                <span>${item.title2}</span>
                                <p>${item.title2_Text}</p>
                            </div>
                            <div class="infoItem">
                                <span>${item.title3}</span>
                                <p>${item.title3_Text}</p>
                            </div>
                        </div>
                        <div class="btn">
                            <a href="javascript:void(0)" class="btnOrder">
                                <span>Sifariş et</span>
                            </a>
                            <a href="#" class="btnMore">
                                <svg width="35px" height="16px" viewBox="0 0 35 16" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <title>Group 3</title>
                                    <desc>Created with Sketch.</desc>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none"
                                        fill-rule="evenodd">
                                        <g id="home(dark)" transform="translate(-521.000000, -407.000000)"
                                            fill="#000000">
                                            <g id="Group-7-Copy" transform="translate(420.000000, 405.000000)">
                                                <g id="Group-3"
                                                    transform="translate(118.300006, 10.000000) scale(-1, 1) translate(-118.300006, -10.000000) translate(100.800006, 2.000000)">
                                                    <rect id="Rectangle" x="2.54545465" y="6.93636395"
                                                        width="31.8909104" height="2.12727281"></rect>
                                                    <polygon id="Rectangle"
                                                        transform="translate(4.736915, 4.817631) rotate(-45.000000) translate(-4.736915, -4.817631) "
                                                        points="-0.730515406 3.85075039 10.1770732 3.72747281 10.204346 5.88201835 1.32652258 5.90778838">
                                                    </polygon>
                                                    <polygon id="Rectangle"
                                                        transform="translate(4.736915, 11.182370) scale(1, -1) rotate(-45.000000) translate(-4.736915, -11.182370) "
                                                        points="-0.730515406 10.2154899 10.1770732 10.0922123 10.204346 12.2467579 1.32652258 12.2725279">
                                                    </polygon>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                Daha ətraflı
                            </a>
                        </div>
                    </div>
                </div>
                </div>`

            })
            wrapper.insertAdjacentHTML('beforeend', resultData)
            tilt()
            cardShadow()
        })
}

creditCards && getCards()

function tilt() {
    const dataTilt = document.querySelectorAll('[data-tilt]')
    VanillaTilt.init(dataTilt, {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
        transition: true,
        perspective: 630,
        easing: "cubic-bezier(.13,.58,.52,.79)",
        scale: 1.07
    });
    console.log(dataTilt)
}

function cardShadow() {
    const imgCard = document.querySelectorAll(".image .img")

    imgCard.forEach(item => {
        if (item.querySelector("img")) {
            item.addEventListener("mouseover", () => {
                item.classList.add("active")
            })
            item.addEventListener("mouseout", () => {
                item.classList.remove("active")
            })
        }
    })
}

export default creditCards