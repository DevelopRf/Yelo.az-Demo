import { range, tilt, cardShadow } from "./functions.js"

const credits = document.querySelector('.credits')
let resultData = ""
const getCredits = () => {
    const getCreditData = async () => {
        const url = "http://localhost:3000/db-credits"

        const response = await fetch(url)
        try {
            if (!response.ok) {
                throw new Error(`Məlumatlar əldə edilə bilmədi. Status: ${response.status}`)
            }
            const data = await response.json()
            return data
        }
        catch (error) {
            console.error("Xəta baş verdi:", error)
            throw error
        }
    }
    const wrapper = document.querySelector(".credits .wrapper")

    const shortForm = `<form class="shortCalc">
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
                        <div class="formItem"><input type="text" name="name" placeholder="Ad">
                        <span>Doldurulması vacibdir</span>
                        </div>
                        <div class="formItem"><input type="text" name="surname" placeholder="Soyad">
                        <span>Doldurulması vacibdir</span>
                        </div>
                    </div>
                    <div class="calcItems">
                        <div class="formItem"><input type="text" name="workplace" placeholder="İş yeri">
                        <span>Doldurulması vacibdir</span>
                        </div>
                        <div class="formItem"><input type="text" name="phone" placeholder="+994 __ ___ __ __">
                        <span>Doldurulması vacibdir</span>
                        </div>
                    </div>
                    <div class="btnBox">
                        <div class="text" style="background-image: url('./img/Credits/ok.svg');">
                            <p>“Sifariş et” basmaqla Azərbaycan Kredit Bürosundan kredit tarixçəsi və Asan
                                finansdan fərdi məlumatların alınmasına razılıq verirəm.</p>
                        </div>
                        <button type="submit" class="btnOrder">Sifariş et</button>
                    </div>
                </form>`

    const longForm = `<form class="longCalc">
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
                    <div class= "formItem"><input type="text" name="name-consumption" id="name-consumption" placeholder="Ad">
                    <span>Doldurulması vacibdir</span>
                    </div>
                    <div class="formItem"><input type="text" name="surname" id="surname" placeholder="Soyad">
                    <span>Doldurulması vacibdir</span>
                    </div>
                </div>
                <div class="calcItems">
                    <div class= "formItem"><input type="text" name="workplace-consumption" id="workplace-consumption" placeholder="İş yeri">
                    <span>Doldurulması vacibdir</span>
                    </div>
                    <div class= "formItem"><input type="text" name="phone-consumption" id="phone-consumption" placeholder="+994 __ ___ __ __">
                    <span>Doldurulması vacibdir</span>
                    </div>
                </div>
                <div class="btnBox">
                    <div class="text" style="background-image: url('./img/Credits/ok.svg');">
                        <p>“Sifariş et” basmaqla Azərbaycan Kredit Bürosundan kredit tarixçəsi və Asan
                            finansdan fərdi məlumatların alınmasına razılıq verirəm.</p>
                    </div>
                    <button type="submit" class="btnOrder">Sifariş et</button>
                </div>
                </form>`

    getCreditData()
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
                            <div class="info ${item.title1_Text.length > 19 || item.title2_Text.length > 19 || item.title3_Text.length > 19 ? `active` : ``}">
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
                                <a href="${item.url}" class="btnOrderCalc">
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
                      ${item.hasAForm && item.isAShort ? `<div class="calcs">${shortForm}</div>` : ""}
                      ${item.hasAForm && !item.isAShort ? `<div class="calcs">${longForm}</div>` : ""}
                    </div>`
            })

            wrapper.innerHTML = resultData

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

            const creditItem = document.querySelectorAll(".creditItem")
            const formCalc = document.querySelectorAll(".calcs")
            creditItem.forEach(item => {
                item.querySelector(".content .btnOrderCalc").addEventListener("click", () => {
                    const calcs = item.querySelector(".creditItem .calcs")
                    const message = item.querySelectorAll("span")

                    if (calcs && calcs.classList.contains("active")) {
                        calcs.classList.remove("active")
                    }
                    else {
                        formCalc.forEach(form => {
                            form.classList.remove("active")
                            
                            const formItem = form.querySelectorAll(".formItem")
                            form.addEventListener("submit", (e) => {
                                e.preventDefault();
                                
                                formItem.forEach(item => {
                                    const message = item.querySelector("span")
                                    if (item.querySelector("input[type=text]").value.trim() === "") message.classList.add("active")
                                })
                            })
                        })
                        calcs && calcs.classList.add("active")
                    }
                    message.forEach(msg=>{
                        if (msg.classList.contains("active")) {
                            console.log("isledi");
                            msg.classList.remove("active")
                        }
                    })
                })
            })



            tilt()
            cardShadow()
            const calcItems = document.querySelectorAll('.calcItems .item')
            range(calcItems)
        })
}

credits && getCredits()

export { credits }