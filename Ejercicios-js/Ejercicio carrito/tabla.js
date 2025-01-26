function executeStringFunctions() {
  const inputString = document.getElementById("inputString").value;
  const inputIndex = parseInt(document.getElementById("inputIndex").value, 10);
  const results = [];

  // Validaciones básicas
  const safeIndex =
    !isNaN(inputIndex) && inputIndex >= 0 && inputIndex < inputString.length;

  // Aplicar funciones
  results.push(`<strong>.length:</strong> ${inputString.length}`);
  results.push(
    `<strong>.charAt(${inputIndex}):</strong> ${
      safeIndex ? inputString.charAt(inputIndex) : "Índice fuera de rango"
    }`
  );
  results.push(
    `<strong>.charCodeAt(${inputIndex}):</strong> ${
      safeIndex ? inputString.charCodeAt(inputIndex) : "Índice fuera de rango"
    }`
  );
  results.push(`<strong>.toUpperCase():</strong> ${inputString.toUpperCase()}`);
  results.push(`<strong>.toLowerCase():</strong> ${inputString.toLowerCase()}`);
  results.push(`<strong>.trim():</strong> ${inputString.trim()}`);
  results.push(`<strong>.slice(0, 5):</strong> ${inputString.slice(0, 5)}`);
  results.push(
    `<strong>.substring(0, 5):</strong> ${inputString.substring(0, 5)}`
  );
  results.push(`<strong>.repeat(2):</strong> ${inputString.repeat(2)}`);
  results.push(
    `<strong>.replace('A', 'X'):</strong> ${inputString.replace("A", "X")}`
  );
  results.push(
    `<strong>.split(''):</strong> ${inputString.split("").join(", ")}`
  );
  results.push(`<strong>.indexOf('C'):</strong> ${inputString.indexOf("C")}`);
  results.push(`<strong>.concat('123'):</strong> ${inputString.concat("123")}`);

  // Mostrar resultados
  document.getElementById("results").innerHTML = results
    .map((result) => `<p>${result}</p>`)
    .join("");
}

//   let hex = "0x1234563n";
//   let oct = "0o1234563n";
//   let bin = "0b10101010";

//   console.log(hex, oct, bin);

//   let num = 10.98475;
//   console.log(num.toFixed(2));

//   console.log(num.toPrescision(3));

//   // ValueOf  se utiliza para obtener el valor primitivo de un objeto
//   let value = "10";
//   let value2 = 10;
//   console.log(value.valueOf() === value2.valueOf());

//   let value3 = Number('10.5');
//   let value4 = Number(true);

//   console.log(typeof value3 , value4);

//   //typeof se utiliza para obtener el tipo de dato de un valor

const carrito = [
  { id: 1, descripcion: "Galletas", precio: 45, descuento: 5, cantidad: 2 },
  {
    id: 2,
    descripcion: "Jabon en polvo",
    precio: 32,
    descuento: 10,
    cantidad: 9,
  },
  {
    id: 3,
    descripcion: "Papel Higienico",
    precio: 64,
    descuento: 5,
    cantidad: 3,
  },
  {
    id: 4,
    descripcion: "Frijol en bolsa",
    precio: 21,
    descuento: 15,
    cantidad: 5,
  },
  {
    id: 5,
    descripcion: "Caja de leche ",
    precio: 34,
    descuento: 0,
    cantidad: 2,
  },
];

let copiaCarrito = [...carrito];

function agregarProducto() {
  let campos = llamarCampos();

  let descripcion = campos.descripcion;
  let precio = campos.precio;
  let descuento = campos.descuento;
  let cantidad = campos.cantidad;


  if (!validacionCampos()) {
    alert("Todos los campos son obligatorios y deben ser validos");
    return;
  }

  let producto = {
    id: carrito.length + 1,
    descripcion: descripcion,
    precio: precio,
    descuento: descuento,
    cantidad: cantidad,
  };

  carrito.push(producto);

  limpiar();
  mostrarCarrito();
}

function llamarCampos() {
  let descripcion = document.getElementById("descripcion").value;
  let precio = parseInt(document.getElementById("precio").value);
  let descuento = parseInt(document.getElementById("descuento").value);
  let cantidad = parseInt(document.getElementById("cantidad").value);

  return { descripcion, precio, descuento, cantidad };
}

function validacionCampos() {
  let campos = llamarCampos();

  let descripcion = campos.descripcion;
  let precio = campos.precio;
  let descuento = campos.descuento;
  let cantidad = campos.cantidad;

  if (
    descripcion.length > 0 &&
    precio > 0 &&
    descuento >= 0 &&
    cantidad > 0
  ) {
    return true;
  } else {
    return false;
  }
}

editarProducto=(id) =>{
  let producto = carrito.find((producto) => producto.id === id );
  let index = carrito.findIndex((producto) => producto.id === id);
  console.log(producto)
  let descripcion = document.getElementById("descripcion");
  let precio = document.getElementById("precio");
  let descuento = document.getElementById("descuento");
  let cantidad = document.getElementById("cantidad");

  descripcion.value = producto.descripcion;
  precio.value = producto.precio;
  descuento.value = producto.descuento;
  cantidad.value = producto.cantidad;

  let buttonGuardar = document.getElementById("guardar-carrito");
  buttonGuardar.style.display = "inline-block";

  buttonGuardar.onclick=()=>{
    let productoActualizado = {
      id:producto.id,
      descripcion: document.getElementById("descripcion").value,
      precio: parseInt(document.getElementById("precio").value),
      descuento: parseInt(document.getElementById("descuento").value),
      cantidad: parseInt(document.getElementById("cantidad").value),
    }

    carrito[index] = productoActualizado;
    limpiar();
    buttonGuardar.style.display = "none";
    mostrarCarrito();
  }

  document.getElementById("datos-producto").appendChild(buttonGuardar);
}


eliminarProducto = (id) => {
  let index = carrito.findIndex((producto) => producto.id === id);
  carrito.splice(index, 1);
  mostrarCarrito();
};



function mostrarCarrito(copia) {

  let carritoBody = document.getElementById("carrito-body");
  carritoBody.innerHTML = "";

  let totalDescuento = 0;
  let subtotalGeneral = 0;
  let totalGeneral = 0;

  let array = copia !== undefined ? copia : carrito;


  array.forEach((producto,index) => {
    let fila = document.createElement("tr");
    let subtotal = producto.precio * producto.cantidad;
    let total = subtotal * (1 - producto.descuento / 100);

    array[index].subtotal=subtotal;
    array[index].total=total;

    totalDescuento += subtotal - total;
    subtotalGeneral += subtotal;
    totalGeneral += total;

    fila.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.descripcion}</td>
        <td>$${producto.precio}</td>
        <td>${producto.descuento}%</td>
        <td>${producto.cantidad}</td>
        <td>$${subtotal}</td>
        <td>$${total.toFixed(2)}</td>
        <td>
          <div class="btn-group">
              <button class="btn btn-warning" onclick="editarProducto(${producto.id})">Editar</button>
              <button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
          </div>
        </td>
        `;

    carritoBody.appendChild(fila);
  });

  totalporcentaje = (totalDescuento / subtotalGeneral) * 100;

  let totalfila = document.createElement("tr");
  totalfila.innerHTML = `
        <td colspan="5"><strong>Total Descuento:</strong><br>${totalporcentaje.toFixed(
          2
        )}% = $${totalDescuento.toFixed(2)}</td>
        <td><strong>Subtotal General:</strong><br>$${subtotalGeneral.toFixed(
          2
        )}</td>
        <td colspan="2"><strong>Total General:</strong><br> $${totalGeneral.toFixed(2)}</td>
    `;

  carritoBody.appendChild(totalfila);
}

function ordenar(tipo, campo){
  let arrayOrdenado

  if(tipo =="asc-letras"  ){
    arrayOrdenado = copiaCarrito.sort((a,b) => a[campo].localeCompare(b[campo]))
    mostrarCarrito(arrayOrdenado);
  }
  
  if(tipo == "desc-letras"){
    arrayOrdenado = copiaCarrito.sort((a,b) => b[campo].localeCompare(a[campo]))
    mostrarCarrito(arrayOrdenado);
  }

  if(tipo == "asc-num"){
    arrayOrdenado = copiaCarrito.sort((a,b) => a[campo] - b[campo])
    mostrarCarrito(arrayOrdenado);
  }
  
  if(tipo == "desc-num"){
    arrayOrdenado = copiaCarrito.sort((a,b) => b[campo] - a[campo])
    mostrarCarrito(arrayOrdenado);
  }
}

function limpiar(){
  document.getElementById("descripcion").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("descuento").value = "";
  document.getElementById("cantidad").value = "";
}

mostrarCarrito();
