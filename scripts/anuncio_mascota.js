import Anuncio from "./anuncio.js";

class Anuncio_Mascota extends Anuncio{
    constructor(id, titulo, descripcion, precio, tipo, raza, fechaNacimiento, vacuna){
        super(id, titulo, descripcion, precio);
        this.tipo = tipo;
        this.raza = raza;
        this.fecha_de_nacimiento = fechaNacimiento;
        this.vacuna = vacuna;
    }

    static esIgual(anuncio1, anuncio2){
        return anuncio2 instanceof Anuncio ? anuncio1.id == anuncio2.id : false;
    }

    static ultimoIdRegistrado(lista){
        let ultimoId = 0;
        if (Array.isArray(lista) && lista.length > 0){
            for (let i = 0; i < lista.length; i++){
                if (lista[i].id > ultimoId){
                    ultimoId = lista[i].id;
                }
            }
        }
        return ultimoId;
    }

    static verificarAnuncioRegistrado(lista, anuncio){
        let indice = -1;
        if (Array.isArray(lista) && lista.length > 0){
            for (let i = 0; i < lista.length; i++){
                if (this.esIgual(lista[i], anuncio)){
                    indice = i;
                    break;
                }
            }
        }
        return indice;
    }

    static obtenerElemento(lista, id){
        let elemento = null;
        if (Array.isArray(lista) && lista.length > 0){
            for (let i = 0; i < lista.length; i++){
                if (lista[i].id == id){
                    elemento = lista[i];
                    break;
                }
            }
        }
        return elemento;
    }

    static eliminarElemento(lista, id){
        let elemento = this.obtenerElemento(lista, id);
        if (elemento != null){
            let indice = lista.findIndex((e) => e.id == elemento.id);
            lista.splice(indice, 1);
            return true;
        }
        return false;
    }

    static modificarElemento(lista, elementoNuevo){
        let modificacion = false;
        if (elementoNuevo instanceof Anuncio_Mascota){
            let indice = lista.findIndex( (element) => element.id == elementoNuevo.id);
            if (indice != -1){
                lista[indice].titulo = elementoNuevo.titulo;
                lista[indice].descripcion = elementoNuevo.descripcion;
                lista[indice].precio = elementoNuevo.precio;
                lista[indice].tipo = elementoNuevo.tipo;
                lista[indice].raza = elementoNuevo.raza;
                lista[indice].fecha_de_nacimiento = elementoNuevo.fecha_de_nacimiento;
                lista[indice].vacuna = elementoNuevo.vacuna;
                modificacion = true;
            }
        }
        return modificacion;
    }
}

export default Anuncio_Mascota;