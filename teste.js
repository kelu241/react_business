let chave = "doce"
let frutas = {"gostosa":"manga", "azeda":"limão", "doce":"uva"}

let frutascopy = {...frutas, "vermelha":"maçã", [chave]:"abacaxi"} 

console.log(frutascopy)

let {gostosa, azeda,doce} = frutas

console.log(gostosa)
console.log(azeda)
console.log(doce)