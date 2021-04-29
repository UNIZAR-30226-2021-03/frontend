/*
*   @param {int} length longitud de la contraseña
*   @param {bool} lower true en caso de que la contraseña pueda contener caracteres en minusculas
*   @param {bool} upper true en caso de que la contraseña pueda contener caracteres en mayusculas
*   @param {bool} number true en caso de que la contraseña pueda contener caracteres numericos
*   @param {string} caracteres adicionales que pueda tener la contraseña
*   
*   @return {string,int} {password,entropy} devuelve un objeto que guarda la contraseña generada y su robustez 
*/
const generatePassword = (length,lower,upper,number,special) => {
    let alphabet = special;
    let password = "";
    if(lower){
        alphabet += "abcdefghijklmnopqrstuvwxyz"
    }
    if(upper){
        alphabet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  
    }
    if(number){
        alphabet += "0123456789"
    }
    for(let i = 0; i < length; i++){
        password += alphabet[Math.floor(Math.random() * alphabet.length)]
    }
    const entropy = length * Math.log2(alphabet.length)
    return {password,entropy};
} 

export {generatePassword};