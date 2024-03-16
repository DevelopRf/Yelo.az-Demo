const wrapper = document.querySelector(".deposits .wrapper")
function getDepositData() {
    let resultData = ""
    const getDeposits = async () => {
        const url = "http://localhost:3000/db-deposits"
        const response = await fetch(url)
        try {
            if (!response) {
                throw new Error(`Məlumatlar əldə edilə bilmədi. Status: ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error("Xəta baş verdi:", error)
            throw error
        }
    }

    getDeposits()
        .then(data => {
            data.forEach(item => {
                resultData += `<div class="depositItem">
            <div class="card">
                <div class="image" style="background-image: url('./img/app_block.svg');">
                    <div class="img" style="background-image: url(${item.img})">
                    </div>
                </div>
                <div class="content">
                    <div class="title">
                        <h2>${item.name}</h2>
                        <p>${item.description}</p>
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
            wrapper.innerHTML = resultData
        })
}

getDepositData()