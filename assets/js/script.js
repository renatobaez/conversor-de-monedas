
const selectIndicators = document.getElementById("indicators")
const btnSearch = document.querySelector("button")
const txtCLP = document.querySelector("input")
const lblResult = document.querySelector("#result")
const apiURL = "https://mindicador.cl/api/"
const indicatorsJson = [];
const nf = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2, roundingIncrement: 5 })

const getData = async (url) => {
  try{
    const res = await fetch(url)
    return await res.json()
  } catch (error){
    console.error(error)
  }
}

const getIndicators = async () => {
    const results = await getData(apiURL)
    for (let i in results) {
      if(typeof results[i] === "object"){
        let option = document.createElement("option")
        option.value = results[i].codigo
        option.text = results[i].nombre
        selectIndicators.add(option)
        indicatorsJson.push({code: results[i].codigo, date: results[i].fecha, value: results[i].valor})
      }
    }
}

getIndicators()
console.log(indicatorsJson);
btnSearch.addEventListener("click", () => {
  if(txtCLP.value === ""){
    alert("Debes ingresar el mondo en CLP")
    txtCLP.focus()
  }else if(selectIndicators.value === ""){
      alert("Debes seleccionar una moneda a convertir")
      selectIndicators.focus()
  }else{
    const indexIndicators = indicatorsJson.findIndex( searchIndex => searchIndex.code === selectIndicators.value)
	  lblResult.textContent = "Resultado: " + nf.format(txtCLP.value / indicatorsJson[indexIndicators].value)
  }
})