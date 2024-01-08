let resultData = ""
const exchangeData = async () => {
    const url = "http://localhost:3000/exchange"
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

function exchange() {
    const amountInput = document.querySelector(".sell");
    const firstOption = document.querySelector(".currencyReceived")
    const secondOption = document.querySelector(".sellingCurrency")
    const inputResult = document.querySelector(".inputResult")
    const curName = document.querySelector(".currencies .curName")
    const purchase = document.querySelector(".currencies .purchase")
    const sell = document.querySelector(".currencies .sell")
    const useful = document.querySelector(".useful")
    const allExchange = document.querySelector(".allExchange")


    exchangeData()
        .then(data => {
            function getLimitedExchange() {
                data.forEach(item => {
                    if (item.currency === "USD" || item.currency === "EUR") {
                        curName.innerHTML += `<h5>${item.currency}</h5>`
                        purchase.innerHTML += `<h5>${item.purchase}</h5>`
                        sell.innerHTML += `<h5>${item.sell}</h5>`
                        firstOption.innerHTML += `<option value = "${item.currency}">${item.currency}</option>`
                        secondOption.innerHTML += `<option value = "${item.currency}">${item.currency}</option>`
                        firstOption.addEventListener("change", () => {
                            if (firstOption.value !== "AZN") {
                                secondOption.innerHTML = `<option value = "AZN">AZN</option>`
                                resultData = ""
                            }
                            else {
                                resultData += `<option value = "${item.currency}">${item.currency}</option>`
                                secondOption.innerHTML = resultData
                            }
                            exchangeCalc()
                        })
                        secondOption.addEventListener("click", exchangeCalc)
                    }
                });
            }

            useful && getLimitedExchange()

            function getAllExchange() {
                data.forEach(element => {
                    const table = document.querySelector(".currencies table tbody")
                    console.log(table);
                    firstOption.innerHTML += `<option value = "${element.currency}">${element.currency}</option>`
                    secondOption.innerHTML += `<option value = "${element.currency}">${element.currency}</option>`
                    table.innerHTML += `<tr>
                    <td>${element.currency}</td>
                    <td>${element.purchase}</td>
                    <td>${element.sell}</td>
                    <td>${element.MB}</td>
                    </tr>`
                    firstOption.addEventListener("change", () => {
                        if (firstOption.value !== "AZN") {
                            secondOption.innerHTML = `<option value = "AZN">AZN</option>`
                            resultData = ""
                        }
                        else {
                            resultData += `<option value = "${element.currency}">${element.currency}</option>`
                            secondOption.innerHTML = resultData
                        }

                        exchangeCalc()
                    })
                    secondOption.addEventListener("change", () => {
                        exchangeCalc()
                    })
                });
                const exchangeType = document.querySelectorAll(".exchange-type a")

                exchangeType.forEach((item) => {
                    item.addEventListener("click", () => {
                        for(const el of exchangeType)
                        {
                            el.classList.remove("active")
                        }
                        item.classList.add("active")
                    })
                })

            }
            allExchange && getAllExchange()

            amountInput.addEventListener('input', exchangeCalc)


            amountInput.addEventListener("keypress", (e) => {
                if (e.which != 8 && e.which != 0 && e.which < 48 || e.which > 57) {
                    e.preventDefault()
                }
            })

            function exchangeCalc() {
                const amount = Number(amountInput.value)
                const firstOptionValue = firstOption.options[firstOption.selectedIndex].textContent
                amount === ""
                if (firstOptionValue === "AZN") {
                    const secondOptionValue = secondOption.options[secondOption.selectedIndex].textContent

                    const selectedCurrency = data.find(cur => cur.currency === secondOptionValue)
                    if (selectedCurrency) {
                        const result = amount / selectedCurrency.purchase
                        inputResult.value = result.toFixed(2)
                    }
                }
                else {
                    const selectedCurrency = data.find(cur => cur.currency === firstOptionValue)
                    if (selectedCurrency) {
                        const result = amount * selectedCurrency.purchase
                        inputResult.value = result.toFixed(2)
                    }
                }
                amountInput.value === "" && (inputResult.value = "");
            }
        })
}



export { exchange }
