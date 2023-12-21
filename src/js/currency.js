let result = ""
let resultData = ""
class Currency {
  constructor() {
    /* this.url = "https://v6.exchangerate-api.com/v6/2c3f90c34a7fe432cc0f3580/latest/" */
    this.url = "http://localhost:3000/currency"
    this.url1 = "http://localhost:3000/news"
  }

  async exchangeShow(purchase1, purchase2, sale1, sale2) {
    const response = await fetch(`${this.url}`)
    const result = await response.json()
    console.log(result);
    purchase1.innerHTML = (result.conversion_rates.USD).toFixed(4)
    purchase2.innerHTML = (result.conversion_rates.EUR).toFixed(4)
    sale1.innerHTML = (result.conversion_rates.USD + 0.01).toFixed(4)
    sale2.innerHTML = (result.conversion_rates.EUR + 0.09).toFixed(4)
  }

  async exchange(amount, firstOptionValue, secondOptionValue) {
    try {
      const response = await fetch(`${this.url}`)
      if (!response.ok) {
        throw new Error(`Məlumatlar əldə edilə bilmədi. Status: ${response.status}`)
      }
      const data = await response.json()
      if (firstOptionValue == "AZN") {
        result = amount / data.conversion_rates[secondOptionValue]
      }
      else {
        result = amount * data.conversion_rates[firstOptionValue]
      }
      return result
    } catch (error) {
      console.error("Xəta baş verdi:", error)
      throw error
    }
  }

  async data() {
    try {
      const response = await fetch(`${this.url1}`)
      if (!response.ok) {
        throw new Error(`Məlumatlar əldə edilə bilmədi. Status: ${response.status}`)
      }
      const data = await response.json()
      data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })

      return data
    }

    catch (error) {
      console.error("Xəta baş verdi:", error)
      throw error
    }
  }

  async addData() {
    try {
      const response = await fetch(`${this.url1}`)
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
}