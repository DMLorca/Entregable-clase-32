
//const random = (req, res, next) => {

process.on('message', cantDatos  =>{

    let arrayA = [], arrayB = {}, range = 1000, cont = 0;
    
    //Si cant no se ingresa, calcula 100 millones
    if(cantDatos == null){ cantDatos=100000000}

    //Numeros aleatorios de 1 a range=1000
    for (let i = 0; i < cantDatos; i++) { arrayA[i] = Math.floor(Math.random() * range) + 1; }

    //Agrega cantidad de veces que se repite
    for (let i = 1; i <= range; i++) {
        cont = 0;
        for (let j = 0; j < arrayA.length; j++) {
            if ((i) == arrayA[j]) {
                cont++;
            }
        }
        arrayB[i] = cont;
    }

    process.send(arrayB);
    
})

//module.exports = {random};