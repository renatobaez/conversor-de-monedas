
const selectIndicadores = document.getElementById("indicadores")
const apiURL = "https://mindicador.cl/api/"

const getData = async (url) => {
  const res = await fetch(url)
  return await res.json()
}

const getIndicadores = async () => {
  try{
    const results = await getData(apiURL)
    for (let i in results) {
      if(typeof results[i] === "object"){
        let option = document.createElement("option")
        option.value = results[i].codigo
        option.text = results[i].nombre
        selectIndicadores.add(option)
      }
    }
  } catch (error){
    console.error(error)
  }
}

getIndicadores()