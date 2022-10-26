import crearTabla from "./tablaDinamica.js";
import Anuncio_Mascota from "./anuncio_mascota.js";
import { validarPrecio, validarCampoVacio, validarCaracteres, validarSelect, validarFecha } from "./validaciones.js";

const entidades = JSON.parse(localStorage.getItem("mascotas")) || [];
const $container = document.querySelector("#lista-entidades");
const $frmEntidad = document.forms[0];
const $titulo = document.querySelector("#titulo-form");
const $btnSubmit = document.querySelector("#btnGuardar");
const $btnEliminar = document.querySelector("#btnEliminar");
const $spinner = document.createElement("img");
$spinner.setAttribute("src", "./images/loading.gif");
$spinner.setAttribute("height", "64px");
$spinner.setAttribute("width", "64px");

actualizarStorage(entidades);
actualizarTabla(entidades, $container);  
limpiarForm();

$frmEntidad.addEventListener("submit", (e) => {
    e.preventDefault();
    /* Modificar los datos segun los inputs */
    const { txtId, txtTitulo, txtDescripcion, rdoMascota, txtPrecio, txtRaza, txtFechaNacimiento, selectVacuna} = $frmEntidad;
    console.log(txtId.value);
    if (validarCampoVacio([txtTitulo, txtDescripcion, txtPrecio, txtRaza, txtFechaNacimiento]) && validarFecha(txtFechaNacimiento) && validarSelect(selectVacuna)){
        if (txtId.value == ""){
            const newMascota = new Anuncio_Mascota(
                Anuncio_Mascota.ultimoIdRegistrado(entidades) + 1, txtTitulo.value, txtDescripcion.value, txtPrecio.value,
                rdoMascota.value, txtRaza.value, txtFechaNacimiento.value, selectVacuna.options[selectVacuna.selectedIndex].text
                );
            if (Anuncio_Mascota.verificarAnuncioRegistrado(entidades, newMascota) == -1){
                entidades.push(newMascota);
                actualizarStorage(entidades);
                limpiarForm();
            }
        } else{
            /* Modificar nombres de auto por la nueva entidad */
            const mascotaModify = new Anuncio_Mascota(txtId.value, txtTitulo.value, txtDescripcion.value, txtPrecio.value,
                rdoMascota.value, txtRaza.value, txtFechaNacimiento.value, selectVacuna.options[selectVacuna.selectedIndex].text);
            if (Anuncio_Mascota.modificarElemento(entidades, mascotaModify)){
                limpiarForm();
                actualizarStorage(entidades);
            }
        }
    } else{
        alert("Error en los datos. Verifique que:\n- No haya espacios vacíos\n- Titulo y la descripción tengan como máximo 25 caracteres\n- Precio mínimo $0, máximo $50.000\n- Haber seleccionado un opción de vacuna\n- Fecha correcta dd/mm/aaa, ceros incluídos (separados por '-' o '/')");
    }
    actualizarTabla(entidades, $container);
});

window.addEventListener("click", (e) => {
    const target = e.target;
    if(target.matches("tr td")){
        const id = e.target.parentElement.dataset.id;
        cargarDatos(Anuncio_Mascota.obtenerElemento(entidades, parseInt(id)));
        $titulo.textContent = "Modificación del anuncio";
        $btnEliminar.removeAttribute("disabled");
        $btnSubmit.setAttribute("id", "btnModificar");
        $btnSubmit.childNodes[2].textContent = "MODIFICAR";
    }
    if (target.matches("#btnCancelar") || target.parentElement.matches("#btnCancelar")){
        e.preventDefault();
        limpiarForm();
    }
    if (target.matches("#btnEliminar") || target.parentElement.matches("#btnEliminar")){
        if(Anuncio_Mascota.eliminarElemento(entidades, parseInt($frmEntidad.txtId.value))){
            console.log(entidades);
            limpiarForm();
            actualizarStorage(entidades);
            actualizarTabla(entidades, $container);
        }
    }
});
/* Funciones para el formulario */
function cargarDatos(elemento){
    if (elemento instanceof Object){
        const { txtId, txtTitulo, txtDescripcion, rdoMascota, txtPrecio, txtRaza, txtFechaNacimiento, selectVacuna} = $frmEntidad;
        txtId.value = elemento.id;
        txtTitulo.value = elemento.titulo;
        txtDescripcion.value = elemento.descripcion;
        txtPrecio.value = elemento.precio;
        rdoMascota.value = elemento.tipo;
        txtRaza.value = elemento.raza;
        txtFechaNacimiento.value = elemento.fecha_de_nacimiento;
        switch(elemento.vacuna){
            case "Si":
                selectVacuna.options.selectedIndex = 1;
                break;
            case "No":
                selectVacuna.options.selectedIndex = 2;
                break;
        }
    } else{
        alert("El elemento seleccionado no es un anuncio!");
    }
}

function limpiarForm(){
    $titulo.textContent = "Complete el formulario según corresponda:";
    $btnSubmit.setAttribute("id", "btnGuardar");
    $btnSubmit.childNodes[2].textContent = "GUARDAR";
    $btnEliminar.setAttribute("disabled", "");
    $frmEntidad.reset();
    $frmEntidad.txtId.value = "";
}
/* ------------------------------------------ */

/* Funciones para la tabla y el local storage */

function actualizarStorage(lista){
    localStorage.setItem("mascotas", JSON.stringify(lista));
}

function actualizarTabla(lista, contenedor){
    let anuncioContainer = document.querySelector(".entidad-container");
    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstElementChild);
    }
    anuncioContainer.appendChild($spinner);
    setTimeout(() => {
        anuncioContainer.removeChild($spinner);
        let data = document.querySelector("#lista-entidades");
        if (data){
            contenedor.appendChild(crearTabla(lista));
        }
    }, 3000);
}
/* ------------------------------------------ */