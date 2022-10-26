import { crearTarjeta } from "./card.js";

const $contenedorTarjetas = document.querySelector(".tarjetas");
const entidades = JSON.parse(localStorage.getItem("mascotas")) || [];

if (entidades.length > 0){
    entidades.forEach((mascota) => {
        $contenedorTarjetas.appendChild(crearTarjeta(mascota.titulo,
            mascota.descripcion,
            mascota.precio.toString(),
            mascota.raza,
            mascota.fecha_de_nacimiento,
            mascota.vacuna));
    });
}
