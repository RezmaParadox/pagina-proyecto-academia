const listaCompra = JSON.parse(sessionStorage.getItem("compra"));

console.log(listaCompra);
let copiaLista = [...listaCompra];

// function agregarProducto() {
//   let campos = llamarCampos();

//   let descripcion = campos.descripcion;
//   let precio = campos.precio;
//   let descuento = campos.descuento;
//   let cantidad = campos.cantidad;

//   if (!validacionCampos()) {
//     alert("Todos los campos son obligatorios y deben ser validos");
//     return;
//   }

//   let producto = {
//     id: carrito.length + 1,
//     descripcion: descripcion,
//     precio: precio,
//     descuento: descuento,
//     cantidad: cantidad,
//   };

//   carrito.push(producto);

//   limpiar();
//   mostrarCarrito();
// }

// function llamarCampos() {
//   let descripcion = document.getElementById("descripcion").value;
//   let precio = parseInt(document.getElementById("precio").value);
//   let descuento = parseInt(document.getElementById("descuento").value);
//   let cantidad = parseInt(document.getElementById("cantidad").value);

//   return { descripcion, precio, descuento, cantidad };
// }

// function validacionCampos() {
//   let campos = llamarCampos();

//   let descripcion = campos.descripcion;
//   let precio = campos.precio;
//   let descuento = campos.descuento;
//   let cantidad = campos.cantidad;

//   if (descripcion.length > 0 && precio > 0 && descuento >= 0 && cantidad > 0) {
//     return true;
//   } else {
//     return false;
//   }
// }

// editarProducto = (id) => {
//   let producto = carrito.find((producto) => producto.id === id);
//   let index = carrito.findIndex((producto) => producto.id === id);
//   console.log(producto);
//   let descripcion = document.getElementById("descripcion");
//   let precio = document.getElementById("precio");
//   let descuento = document.getElementById("descuento");
//   let cantidad = document.getElementById("cantidad");

//   descripcion.value = producto.descripcion;
//   precio.value = producto.precio;
//   descuento.value = producto.descuento;
//   cantidad.value = producto.cantidad;

//   let buttonGuardar = document.getElementById("guardar-carrito");
//   buttonGuardar.style.display = "inline-block";

//   buttonGuardar.onclick = () => {
//     let productoActualizado = {
//       id: producto.id,
//       descripcion: document.getElementById("descripcion").value,
//       precio: parseInt(document.getElementById("precio").value),
//       descuento: parseInt(document.getElementById("descuento").value),
//       cantidad: parseInt(document.getElementById("cantidad").value),
//     };

//     carrito[index] = productoActualizado;
//     limpiar();
//     buttonGuardar.style.display = "none";
//     mostrarCarrito();
//   };

//   document.getElementById("datos-producto").appendChild(buttonGuardar);
// };

eliminarProducto = (index) => {
  listaCompra.splice(index, 1);
  if(listaCompra.length === 0) {
    window.location.href = "tienda.html";
  }
  mostrarCarrito();
};

function mostrarCarrito(copia) {
  let carritoBody = document.getElementById("carrito-body");
  carritoBody.innerHTML = "";

  let totalDescuento = 0;
  let subtotalGeneral = 0;
  let totalGeneral = 0;

  let array = copia !== undefined ? copia : listaCompra;

  array.forEach((producto, index) => {
    let fila = document.createElement("tr");
    let subtotal = producto.precio * producto.cantidad;
    let total = subtotal * (1 - producto.descuento / 100);

    array[index].subtotal = subtotal;
    array[index].total = total;

    totalDescuento += subtotal - total;
    subtotalGeneral += subtotal;
    totalGeneral += total;

    fila.innerHTML = `
          <td>${index + 1}</td>
          <td>${producto.nombre}</td>
          <td>${producto.tallaSelect}</td>
          <td><button class="modal-color" style="background-color: ${
            producto.color
          }""></button></td>
          <td>$${producto.precio}</td>
          <td>${producto.cantidad}</td>
          <td>${producto.descuento ? producto.descuento : 0}%</td>
          <td>$${subtotal}</td>
          <td>$${!isNaN(total) ? total.toFixed(2) : subtotal}</td>
          <td>
            <div class="btn-group">
                <button class="btn btn-danger" onclick="eliminarProducto(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
          </td>
          `;

    carritoBody.appendChild(fila);
  });

  totalporcentaje = (totalDescuento / subtotalGeneral) * 100;

  let totalfila = document.createElement("tr");
  totalfila.innerHTML = `
          ${
            !isNaN(totalporcentaje)
              ? `<td colspan="5"><strong>Total Descuento:</strong><br>${totalporcentaje.toFixed(
                  2
                )}% = $${totalDescuento.toFixed(2)}</td>`
              : "<td colspan='5'><strong>Sin descuentos</strong><br></td>"
          }
          <td><strong>Subtotal General:</strong><br>$${subtotalGeneral.toFixed(
            2
          )}</td>
          ${!isNaN(totalGeneral) ? `<td colspan="4"><strong>Total General:</strong><br>$${totalGeneral.toFixed(
            2
          )}</td>` :  `<td colspan="4"><strong>Total General:</strong><br>$${subtotalGeneral.toFixed(2)}</td>`}
      `;

  carritoBody.appendChild(totalfila);
}

function aplicarCupon(){
  let cupon = document.getElementById("cupon").value;
  if(cupon === "OFERTAS10"){
    let descuento = 10;
    listaCompra.forEach(producto =>{
      producto.descuento = descuento;
      mostrarCarrito();
    })
  }
}

function ordenar(tipo, campo) {
  let arrayOrdenado;

  if (tipo == "asc-letras") {
    arrayOrdenado = copiaLista.sort((a, b) =>
      a[campo].localeCompare(b[campo])
    );
    mostrarCarrito(arrayOrdenado);
  }

  if (tipo == "desc-letras") {
    arrayOrdenado = copiaLista.sort((a, b) =>
      b[campo].localeCompare(a[campo])
    );
    mostrarCarrito(arrayOrdenado);
  }

  if (tipo == "asc-num") {
    arrayOrdenado = copiaLista.sort((a, b) => a[campo] - b[campo]);
    mostrarCarrito(arrayOrdenado);
  }

  if (tipo == "desc-num") {
    arrayOrdenado = copiaLista.sort((a, b) => b[campo] - a[campo]);
    mostrarCarrito(arrayOrdenado);
  }
}

function limpiar() {
  document.getElementById("descripcion").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("descuento").value = "";
  document.getElementById("cantidad").value = "";
}

mostrarCarrito();
