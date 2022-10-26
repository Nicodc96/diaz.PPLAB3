class Anuncio{
    constructor(id, titulo, descripcion, precio){
        this.id = parseInt(id);
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = parseFloat(precio);
    }
}

export default Anuncio;