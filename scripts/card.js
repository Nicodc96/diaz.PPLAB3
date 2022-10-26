/* Modificar la tarjeta segun sea necesario */
function crearTarjeta(card_titulo, card_desc, card_valor, card_raza, card_fechaNacimiento, card_vacuna){
    const $mainCard = createElementCustom("section", ["card"], "", {});
    $mainCard.appendChild(createElementCustom("h3", ["card-title"], card_titulo, {}));
    $mainCard.appendChild(createElementCustom("p", ["description"], card_desc, {}));
    $mainCard.appendChild(createElementCustom("p", ["valor"], `$${card_valor}`, {}));
    $mainCard.appendChild(cardElementos(card_raza, card_fechaNacimiento, card_vacuna));
    $mainCard.appendChild(createElementCustom("button", ["btn-mascota"], "Ver Mascota", {}));
    return $mainCard;
}

function cardElementos(raza, fechaNacimiento, vacuna){
    const $cardElementos = createElementCustom("div", ["elementos"], )
    $cardElementos.appendChild(newElemento("raza", "raza", raza));
    $cardElementos.appendChild(newElemento("nacimiento", "nacimiento", fechaNacimiento));
    $cardElementos.appendChild(newElemento("potencia", "vacuna", vacuna));
    return $cardElementos;
}

function newElemento(nombre_clase, tipo, valor){
    const $element = createElementCustom("div", [nombre_clase], "", {});
    switch(tipo){
        case "raza":
            $element.appendChild(createElementCustom("img", [], "", {"src":"./images/raza.png", "width":"50px", "alt":"raza"}));
            $element.appendChild(createElementCustom("p", [], valor, {}));
            break;
        case "nacimiento":
            $element.appendChild(createElementCustom("img", [], "", {"src":"./images/nacimiento.png", "width":"50px", "alt":"fecha_nacimiento"}));
            $element.appendChild(createElementCustom("p", [], valor, {}));
            break;
        case "vacuna":
            $element.appendChild(createElementCustom("img", [], "", {"src":"./images/vacuna.png", "width":"50px", "alt":"vacuna"}));
            $element.appendChild(createElementCustom("p", [], valor, {}));
            break;
    }
    return $element;
}

function createElementCustom(tipoElemento, clases, contenidoTexto, atributos){
    const newElement = document.createElement(tipoElemento);
    if (Array.isArray(clases) && clases.length > 0){
        newElement.classList.add(...clases);
    }
    if (contenidoTexto != null && contenidoTexto != undefined && contenidoTexto.length > 0){
        newElement.textContent = contenidoTexto;
    }
    if (typeof(atributos) == "object"){
        Object.keys(atributos).forEach((atributo) => {
            newElement.setAttribute(atributo, atributos[atributo]);
        })
    }
    return newElement;
}

export { crearTarjeta };