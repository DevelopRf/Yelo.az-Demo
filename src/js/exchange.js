const exchange = async ()=>{
    const url = "http://localhost:3000/conversion_rates"

    const response = await fetch(url)
    try {
        if(!response.on)
        {
            throw new Error (`Məlumatlar əldə edilə bilmədi. Status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Xəta baş verdi:", error)
        throw error
    }

}

