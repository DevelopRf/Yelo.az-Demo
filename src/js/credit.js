const credits = document.querySelector('.credits')
let resultData = ""
const credit = new Credits()
let calc = false
const getCredits = () => {
    const wrapper = document.querySelector(".credits .wrapper")
    credit.creditData()
        .then(data => {

            data.forEach(item => {
                resultData += `
                    <div class="creditItem">
                        <div class="card">
                        <div class="image" style="background-image: url('./img/app_block.svg');">
                            ${!item.isACard ? `<div class="img" style = "background-image: url('${item.img}')">
                            </div>` : `<div class="img" data-tilt>
                            <img src="${item.img}" alt="">
                            </div>`}
                        </div>
                        <div class="content">
                            <div class="title">
                                <h2>
                                    ${item.name}
                                </h2>
                                <p>
                                    ${item.description}
                                </p>
                            </div>
                            <div class="info ${item.title1_Text.length > 19 ? `active` : ``}">
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
                      ${item.hasAForm ? `<div class="calcContainer"></div>` : ""}
                    </div>`
                item.hasAForm && console.log(calc);
            })

            wrapper.innerHTML = resultData
            const creditItem = document.querySelectorAll(".creditItem")
            creditItem.forEach(item => {
                item.querySelector(".card .btnOrder").addEventListener("click", () => {
                    item.querySelector(".calcContainer").classList.toggle("active")

                })
            })
            tilt()
            cardShadow()
            const shortForm = `<form class="calc">
                    <div class="calcItems">
                        <div class="item">
                            <span>Aylıq əməkhaqqı</span>
                            <input type="number" name="salary" value="2500" class="number">
                            <p>AZN</p>
                            <input type="range" class="range" min="350" max="5000" step="50" value=""
                                style="--min: 350; --max: 5000; --val: 2500">
                        </div>
                        <div class="item">
                            <span>Kredit məbləği</span>
                            <input type="number" name="amount" value="15000" class="number">
                            <p>Ay</p>
                            <input type="range" class="range" min="400" max="50100" step="100" value=""
                                style="--min: 400; --max: 50100; --val: 15000">
                        </div>
                    </div>
                    <div class="calcItems">
                        <input type="text" name="name-consumption" id="name-consumption" placeholder="Ad">
                        <input type="text" name="surname" id="surname" placeholder="Soyad">
                    </div>
                    <div class="calcItems">
                        <input type="text" name="workplace-consumption" id="workplace-consumption" placeholder="İş yeri">
                        <input type="text" name="phone-consumption" id="phone-consumption" placeholder="+994 __ ___ __ __">
                    </div>
                    <div class="btnBox">
                        <div class="text" style="background-image: url('./img/Credits/ok.svg');">
                            <p>“Sifariş et” basmaqla Azərbaycan Kredit Bürosundan kredit tarixçəsi və Asan
                                finansdan fərdi məlumatların alınmasına razılıq verirəm.</p>
                        </div>
                        <button type="submit" class="btnOrder">Sifariş et</button>
                    </div>
                </form>`

            const longForm = `<form class="calc">
                <div class="calcItems">
                    <div class="item">
                        <span>Aylıq əməkhaqqı</span>
                        <input type="number" name="salary" value="2500" class="number">
                        <p>AZN</p>
                        <input type="range" class="range" min="350" max="5000" step="50" value=""
                            style="--min: 350; --max: 5000; --val: 2500">
                    </div>
                    <div class="item">
                        <span>Kredit məbləği</span>
                        <input type="number" name="amount" value="15000" class="number">
                        <p>Ay</p>
                        <input type="range" class="range" min="400" max="50100" step="100" value=""
                            style="--min: 400; --max: 50100; --val: 15000">
                    </div>
                    <div class="item">
                        <span>Kredit məbləği</span>
                        <input type="number" name="amount" value="15000" class="number">
                        <p>Ay</p>
                        <input type="range" class="range" min="400" max="50100" step="100" value=""
                            style="--min: 400; --max: 50100; --val: 15000">
                    </div>
                </div>
                <div class="calcItems">
                    <input type="text" name="name-consumption" id="name-consumption" placeholder="Ad">
                    <input type="text" name="surname" id="surname" placeholder="Soyad">
                </div>
                <div class="calcItems">
                    <input type="text" name="workplace-consumption" id="workplace-consumption" placeholder="İş yeri">
                    <input type="text" name="phone-consumption" id="phone-consumption" placeholder="+994 __ ___ __ __">
                </div>
                <div class="btnBox">
                    <div class="text" style="background-image: url('./img/Credits/ok.svg');">
                        <p>“Sifariş et” basmaqla Azərbaycan Kredit Bürosundan kredit tarixçəsi və Asan
                            finansdan fərdi məlumatların alınmasına razılıq verirəm.</p>
                    </div>
                    <button type="submit" class="btnOrder">Sifariş et</button>
                </div>
                </form>`

        })
}

credits && getCredits()

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

export {credits}