//variables
let frutas = [
    {id: 0, nombre:"anana", precio:36, path_img:'img/anana.jpg'},
    {id: 1, nombre:"arandano", precio:32, path_img:'img/arandano.jpg'},
    {id: 2, nombre:"banana", precio:24, path_img:'img/banana.jpg'},
    {id: 3, nombre:"frambuesa", precio:30, path_img:'img/frambuesa.png'},
    {id: 4, nombre:"frutilla", precio:27, path_img:'img/frutilla.jpg'},
    {id: 5, nombre:"kiwi", precio:42, path_img:'img/kiwi.jpg'},
    {id: 6, nombre:"mandarina", precio:24, path_img:'img/mandarina.jpg'},
    {id: 7, nombre:"manzana", precio:30, path_img:'img/manzana.jpg'},
    {id: 8, nombre:"naranja", precio:24, path_img:'img/naranja.jpg'},
    {id: 9, nombre:"pera", precio:32, path_img:'img/pera.jpg'},
    {id: 10, nombre:"pomelo-amarillo", precio:48, path_img:'img/pomelo-amarillo.jpg'},
    {id: 11, nombre:"pomelo-rojo", precio:42, path_img:'img/pomelo-rojo.jpg'},
    {id: 12, nombre:"sandia", precio:56, path_img:'img/sandia.jpg'},
];

let carrito = [];
let bajas = [];
let state = false;

let barAuthor = document.querySelector("#barAuthor");
let containerFrutas = document.querySelector("#containerFrutas");
let containerCarrito = document.querySelector("#carrito");
let elementosCarrito = document.querySelector("#elementos-carrito");
let barSearch = document.querySelector("#barSearch");
let datos = document.querySelector("#storage");
let btnNombre = document.querySelector("#btnNombre");
let btnPrecio = document.querySelector("#btnPrecio");

let yo = {dni:"42.778.074", nombre:"santiago", apellido:"basso"};

//funciones
function mostrarFrutas(array) {
  let cardFruta = "";
  array.forEach((f) => {
    cardFruta += `
        <div class="card-fruta">
            <img src="${f.path_img}" alt="${f.nombre}" />
            <h3>${f.nombre}</h3>
            <p>$ ${f.precio}</p>
            <button onclick="agregarCarrito(${f.id})">Agregar al carrito</button>
        </div> `;
  });
  containerFrutas.innerHTML = cardFruta;
};

function agregarCarrito(id){
    let fruta = frutas.find(f => f.id === id);
    carrito.push(fruta);
    // console.log("agregar carrito: ");
    // console.log(`id del producto: ${id}`);
    //console.log(frutaElegida.nombre + "agregada.");
    console.log(JSON.stringify(carrito));
    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

function mostrarCarrito(){
    let cardCarrito = "<ul>";
    let total = 0;
    carrito.forEach((elemento, indice) => {
        cardCarrito += `
        <li class="bloque-item">
            <p class="nombre-item">${elemento.nombre} - $ ${elemento.precio}</p>
            <button class="boton-eliminar" onclick="eliminarElemento(${indice})">Eliminar</button>
        </li>`
        document.getElementById("elementos-carrito").innerText = `carrito: ${indice+1}`
        total += elemento.precio;
    });
    cardCarrito += "</ul><button onclick='vaciarCarrito()'> Vaciar carrito </button>";
    cardCarrito += `<br></ul>precio totalitario: $ ${total}`
    containerCarrito.innerHTML = cardCarrito;

    console.log("mostrar carrito: "+ JSON.stringify(carrito));
    //console.log(cartaCarrito);
    //console.table(carrito);
};

function eliminarElemento(indice){
    console.log(`eliminar fruta: id:${indice}`);
    carrito.splice(indice, 1);
    frutas.forEach((f, i) => {
        if(f.id == indice){ 
            bajas.push(f);
        }
    })
    localStorage.setItem("bajas", JSON.stringify(bajas));
    //console.table(carrito);
    mostrarCarrito();
}

function vaciarCarrito(){
    carrito = [];
    containerCarrito.innerHTML = "";
    elementosCarrito.innerHTML = "carrito: 0";
}

barSearch.addEventListener("keyup", () => {
    filtrarProductos();
    //alerta();
});

function filtrarProductos(){
    let valor = barSearch.value;
    console.log("filtrado frutas: "+ valor);
    let frutasFiltradas = frutas.filter(f => f.nombre.includes(valor));
    mostrarFrutas(frutasFiltradas);
}

//usando variable state hago q los botones alternen entre ordenamientos
btnNombre.addEventListener('click', () => {
    if(state == true){
        mostrarFrutas(frutas.sort((a, b)=>{
            if(a.nombre > b.nombre) return 1;
            if(a.nombre < b.nombre) return -1;
            return 0;
        }));
        state = false;
    }
    else{
        mostrarFrutas(frutas.sort((a, b) => {
            if(a.nombre > b.nombre) return -1;
            if(a.nombre < b.nombre) return 1;
            return 0;
        }));
        state = true;
    }
});
btnPrecio.addEventListener('click', () => {
    if(state == true){
        mostrarFrutas(frutas.sort((a, b) => {
            if(a.precio > b.precio) return -1;
            if(a.precio < b.precio) return 1;
            return 0;
        }));
        state = false;
    }
    else{
        mostrarFrutas(frutas.sort((a, b)=>{
            if(a.precio > b.precio) return 1;
            if(a.precio < b.precio) return -1;
            return 0;
        }));
        state = true;
    }
});

function imprimirDatosAlumno(){
    barAuthor.textContent = `${yo.nombre} ${yo.apellido}`
    console.log(`${yo.nombre} ${yo.apellido}`);
}

//main funcion
function init(){
    imprimirDatosAlumno();
    mostrarFrutas(frutas);
    datos.innerHTML = localStorage.getItem("carrito").length;
};

// métodos de localStorage :
// 1. Guardar datos: localStorage.setItem(key, value)
// 2. Leer datos: localStorage.getItem(key)
// 3. Eliminar un dato: localStorage.removeItem(key)
// 4. Eliminar todos los datos: localStorage.clear()

init();