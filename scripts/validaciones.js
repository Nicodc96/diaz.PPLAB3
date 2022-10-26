const validarCampoVacio = (arrayInputs) => {
    let validado = true;
    if (Array.isArray(arrayInputs)){
        for(let i = 0; i < arrayInputs.length; i++){
            if (arrayInputs[i].value == ""){
                return false;
            }
        }
    }
    return validado;
}

const validarCaracteres = (input) => {
    return input.value.length <= 25;
}

const validarPrecio = (input) => {
    return parseFloat(input.value) >= 0 && parseFloat(input.value) <= 50000;
}

const validarSelect = (input) => {
    return input.options.selectedIndex == 1 || input.options.selectedIndex == 2;
}

const validarFecha = (input) => {
    let patron = /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/;
    return patron.test(input.value);
}

export {validarCampoVacio, validarCaracteres, validarPrecio, validarSelect, validarFecha};