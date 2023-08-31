
const selectIndicators = document.getElementById("indicators")
const btnSearch = document.querySelector("button")
const txtCLP = document.querySelector("input")
const lblResult = document.querySelector("#result")
const indicatorChart = document.getElementById("indicatorChart")
let myChart = ""
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
    renderChart()
  }
})

async function getDataToChart() {
  try{
    const res = await fetch(apiURL + selectIndicators.value)
    return await res.json()
  } catch (error){
    console.error(error)
  }
}
async function renderChart() {
  const data = await getDataToChart()
  const size = 10;
  const labels = data.serie.slice(0, size).map(i => {
    return i.fecha.slice(0,10)
  })
  const values = data.serie.slice(0, size).map(i => {
    return i.valor
  })
  if (myChart) {
    myChart.destroy()
  }
  indicatorChart.style.backgroundColor = "white"
  myChart = new Chart(indicatorChart, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: selectIndicators.options[selectIndicators.selectedIndex].text,
        data: values,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    }
  })
}


