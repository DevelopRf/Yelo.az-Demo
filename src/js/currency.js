let result = ""
let resultData = ""
class Currency {
    constructor() {
        this.url = "https://v6.exchangerate-api.com/v6/2c3f90c34a7fe432cc0f3580/latest/"
        this.url1 = "http://localhost:3000/news?"
    }

    async exchangeShow(purchase1, purchase2, sale1, sale2) {
        const response = await fetch(`${this.url}AZN`)
        const result = await response.json()
        purchase1.innerHTML = (result.conversion_rates.USD).toFixed(4)
        purchase2.innerHTML = (result.conversion_rates.EUR).toFixed(4)
        sale1.innerHTML = (result.conversion_rates.USD + 0.01).toFixed(4)
        sale2.innerHTML = (result.conversion_rates.EUR + 0.09).toFixed(4)
    }

    async exchange(amount, firstOptionValue, secondOptionValue) {
        try {
            const response = await fetch(`${this.url}AZN`)
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
            return data

        } catch (error) {
            console.error("Xəta baş verdi:", error)
            throw error
        }
    }

    async addData()
    {
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

/* let isUpdate= false //isUpdate deye bir deyisenin olacaq bu deyisen ile update olunur yoxsa teze elave olunur deye bildirmelisen cunki update edende addNewsMOdali acilacaq
addNewsForm.addEventListener("submit", function (event) { //formun olacaq orda submit edende bu kod isleyecek
    event.preventDefault();
    let isNotNull = false; //bu ise eger textarea boshdursa onu yoxsalyir bosh olanda submit islemir
    if (!isUpdate) {
      const formData = {}; // burda object yaradirsan
      if (!textArea.value == "")  {
        formData[textArea.name] = textArea.value; //icine ancaq textarea.valuesu ve date-i de bu gunun iso-dateni alirirq id de default olaraq gelir
        const currentDate = new Date();
        const isoDate = currentDate.toISOString();
        formData.date = isoDate;// burda date adl objecte key ve value elave edirsen
        isNotNull = true;// bosh olamdigini qeyd edirsen
      } else {
        textArea.style.borderColor = "red"; //bpsh olsa qirmizi olur border
      }
      if (isNotNull) {
        fetch("http://localhost:3000/NEWS", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(formData),// burda json formatina cevirdik
        });
        setInterval(() => {
          getNews();
        }, 1000);// 1 saniyeden de tezden butun render edirsen
        
      }
    } else {
      let data; // burda da eyni sey edirsen
      if (!textArea.value == "") {
        data ={
          title:`${textArea.value}`
        }
        isNotNull = true;
      } else {
        textArea.style.borderColor = "red";
      }
      if (isNotNull) {
        fetch(`http://localhost:3000/NEWS/${updatedId}`, {  // updateId ni ise yuxarida qeyd edisen hansi id-di deye
          method: "PACTH",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(data),
        });
        setInterval(() => {
          getNews();
        }, 1000);
        addNews.classList.remove("show");
        body.classList.remove("o-hidden");
        newsModal.style.top = "0px";
      }
    }
    isUpdate = false;
  }); */
