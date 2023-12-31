const calcItems = document.querySelectorAll('.calcItems .item')

function range(rangeItems) {
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

    rangeItems.forEach(item => {
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









export { range, calcItems, tilt, cardShadow}