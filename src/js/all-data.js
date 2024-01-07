let result = ""

class Currency {
  constructor() {
/*     this.url = "https://v6.exchangerate-api.com/v6/2c3f90c34a7fe432cc0f3580/latest/"
 */    this.url = "currency"
    this.url1 = "http://localhost:3000/news"
  }

/*   async exchangeShow() {
    try {
      const response = await fetch(`${this.url}`) // AZN
      if (!response.ok) {
        throw new Error(`Məlumatlar əldə edilə bilmədi. Status: ${response.status}`)
      }
      const result = await response.json()
      return result
    } catch (error) {
      console.error("Xəta baş verdi:", error)
      throw error
    }
  } */

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
}