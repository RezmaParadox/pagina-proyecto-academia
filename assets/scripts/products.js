let arrayProductos = [];
let carrito = sessionStorage.getItem("carrito")
  ? JSON.parse(sessionStorage.getItem("carrito"))
  : [];

async function cargarProductos() {
  try {
    // Cargar el archivo JSON
    const response = await fetch("../assets/data/productos.json");
    const productos = await response.json();

    // Guardar los productos en el array
    arrayProductos = productos;

    // Mostrar los productos
    mostrarProductos(productos);
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
}

function mostrarProductos(productos) {
  // Obtener el contenedor donde se agregarán las tarjetas
  const cardsContainer = document.getElementById("cards");

  // Limpiar las tarjetas anteriores (si las hay)
  cardsContainer.innerHTML = "";

  // Iterar sobre los productos y crear las tarjetas
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("card"); // Añadir una clase para la tarjeta

    // Estructura de la tarjeta
    card.innerHTML = `
        <div class="card-image-container">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="card-image">
        </div>
        <div class="card-body">
        <h3 class="card-title">${producto.nombre}</h3>
        <p class="card-price">$${producto.precio} USD</p>
        </div>
    `;

    // Agregar el evento de clic a la tarjeta
    card.addEventListener("click", () => {
      // Crear el modal con la información del producto
      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = `
        <div class="modal-container">
            <div class="modal-content">
                <button class="close-modal"><i class="fa-solid fa-xmark"></i></button>
                <div class="modal-image-container">
                    <img src="${producto.imagen}" alt="${
        producto.nombre
      }" class="modal-image">
                </div>
                <div class="modal-body">
                    <h3 class="modal-title">${producto.nombre}</h3>
                    <p><strong>TALLA</strong></p>
                    <div class="modal-talla-container">
                      ${Object.entries(producto.existeciasTalla)
                          .map(
                            ([talla]) =>
                              `<button class="modal-talla" talla="${talla}">${talla}</button> `
                          )
                          .join("")}
                    </div>
                    <div class="modal-color-container">
                      <p><strong>COLOR</strong></p>
                      <button class="modal-color" style="background-color: ${producto.color}" color="${producto.color}"></button>
                    </div>
                    <p class="modal-price">$${producto.precio} USD</p>
                    <button class="add-to-cart">AGREGAR AL CARRITO</button>
                    <p class="modal-description">${producto.descripcion}</p>
                </div>
            </div>
 
        </div>
        `;

      // Agregar el evento de clic al cerrar el modal
      const closeButton = modal.querySelector(".close-modal");
      const nameModal = ".modal";
      closeButton.addEventListener("click", () => cerrarModal(nameModal));

      // Seleccionar la talla del producto
      const modalTallas = modal.querySelectorAll(".modal-talla");
      modalTallas.forEach((talla)=>{
        talla.addEventListener("click",()=>{
          modalTallas.forEach((talla)=> talla.classList.remove("selected"));
          talla.classList.add("selected")
          producto.tallaSelect = talla.getAttribute("talla");
        })
      });

      // Seleccionar el color del producto
      const modalColores = modal.querySelectorAll(".modal-color");
      modalColores.forEach((color)=>{
        color.addEventListener("click",()=>{
          modalColores.forEach((color) => color.classList.remove("selected"));
          color.classList.add("selected");
          producto.colorSelect = color.getAttribute("color");
        })
      });

      // Agregar el evento de clic al agregar al carrito
      const addToCartButton = modal.querySelector(".add-to-cart");
      addToCartButton.addEventListener("click", () => {
          if(producto.tallaSelect && producto.colorSelect){
            agregarAlCarrito(producto);
          }else{
            alert("Seleccione una talla y un color");
          }
      });

      // Agregar el modal al cuerpo del documento
      document.body.appendChild(modal);
    });

    // Agregar la tarjeta al contenedor de tarjetas
    cardsContainer.appendChild(card);
  });
}

function agregarAlCarrito(producto) {
  // Verificar si el producto ya existe en el carrito
  const existingProduct = carrito.find(
    (item) => item.nombre === producto.nombre
  );
  if (existingProduct) {
    existingProduct.cantidad++;
  } else {
    // Agregar el producto al carrito
    carrito.push({ ...producto, cantidad: 1 });
  }
  console.log(carrito);
  // Actualizar el carrito en el localStorage
  sessionStorage.setItem("carrito", JSON.stringify(carrito));

  const modal = ".modal";
  //Cerrar el modal
  cerrarModal(modal);

  // Mostrar el carrito
  mostrarCarrito();
}

function mostrarCarrito() {
  // Cerrar el modal
  const modal = ".modal-carrito";
  cerrarModal(modal);
  
  const modalCarrito = document.createElement("div");

  if(carrito.length !== 0){
    // Crear el modal con la información del carrito
    modalCarrito.classList.add("modal-carrito");
    modalCarrito.innerHTML = `
          <div class="modal-container-carrito">
              <div class="modal-content">
                  <div class="modal-header">
                      <h2>Mi Carrito</h2>
                      <button class="close-modal"><i class="fa-solid fa-xmark"></i></button>
                  </div>
                  <div class="modal-body">
                      <ul>
                          ${carrito
                            .map(
                              (producto , index) =>
                                `<li>
                                <img src="${producto.imagen}" alt="${producto.nombre}">
                                <div class="product-info">
                                  ${producto.nombre}
                                  <p>Talla: ${producto.tallaSelect}</p>
                                  <div class="product-color">
                                    <p>Color:</p><button class="modal-color" style="background-color: ${producto.color}"></button>
                                  </div>
                                  <div class="product-quantity">
                                    <button class="decrease-button" index="${index}">-</button>
                                    <span class="quantity">${producto.cantidad}</span>
                                    <button class="increase-button" index="${index}">+</button>
                                    <button class="remove-button" index="${index}"><i class="fa-solid fa-trash"></i></button>
                                  </div>
                                </div>
                                <p id="precio-producto">$${producto.precio * producto.cantidad} USD</p>
                              </li>`
                            )
                            .join("")}
                      </ul>
                  </div>
                  <div class="modal-footer">
                      <div class="total-container">
                          <p>TOTAL</p>
                          <p id="precio-total">
                          $${carrito.reduce(
                            (total, producto) => total + (producto.precio * producto.cantidad),
                            0
                          )} USD
                          </p>
                      </div>
                      <button class="buy-button">FINALIZAR COMPRA</button>
                  </div>
              </div>
          </div>
      `;
  }else{
    modalCarrito.classList.add("modal-carrito");
    modalCarrito.innerHTML = `
          <div class="modal-container-carrito">
              <div class="modal-content">
                  <div class="modal-header">
                      <h2>Mi Carrito</h2>
                      <button class="close-modal"><i class="fa-solid fa-xmark"></i></button>
                  </div>
                  <div class="modal-body">
                      <figure>
                        <img src="/assets/images/Carrito-Vacio-.png" alt="Carrito vacio">
                        <figcaption>Carrito vacio</figcaption>
                      </figure>
                  </div>
              </div>
          </div>
      `;
  }

  //Agregar el modal al cuerpo del documento
  document.body.appendChild(modalCarrito);

  // Agregar el evento de clic al cerrar el modal
  const closeButton = modalCarrito.querySelector(".close-modal");
  const nameModal = ".modal-carrito";
  closeButton.addEventListener("click", () => cerrarModal(nameModal));

  //Agregar evento para disminuir la cantidad del producto
  const decreaseButton = modalCarrito.querySelectorAll(".decrease-button");
  decreaseButton.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("index");
      const producto = carrito[index];
      producto.cantidad--;
      if (producto.cantidad === 0) {
        carrito.splice(index, 1);
      }
      sessionStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    })
  })

  //Agregar evento para aumentar la cantidad del producto
  const increaseButton = modalCarrito.querySelectorAll(".increase-button");
  increaseButton.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("index");
      const producto = carrito[index];
      producto.cantidad++;
      sessionStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    })
  })

  //Agregar evento para eliminar el producto del carrito
  const removeButton = modalCarrito.querySelectorAll(".remove-button");
  removeButton.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("index");
      carrito.splice(index, 1);
      sessionStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    })
  })

  // Agregar el evento de clic al botón de compra
  const buyButton = modalCarrito.querySelector(".buy-button");
  buyButton.addEventListener("click", () => {
    //Guardar el carrito en compra con sessionStorage
    sessionStorage.setItem("compra", JSON.stringify(carrito))
    //vaciar el carrito
    carrito = [];
    sessionStorage.setItem("carrito",JSON.stringify(carrito));
    //redirigir a la pagina de compra
    window.location.href = "compra.html";
  });
}

function buscarProducto(busqueda) {
  const productosFiltrados = arrayProductos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  mostrarProductos(productosFiltrados);
}


function ordenarProductos(opcion) {

  const copiaArrayProductos = [...arrayProductos];

  if (opcion === "mayor") {
    copiaArrayProductos.sort((a, b) => b.precio - a.precio);
  } else if (opcion === "menor") {
    copiaArrayProductos.sort((a, b) => a.precio - b.precio);
  }
  mostrarProductos(copiaArrayProductos);
}

function cerrarModal(nameModal) {
  const modal = document.querySelector(nameModal);
  // Eliminar el modal del cuerpo del documento
  if (modal) {
    document.body.removeChild(modal);
  }
}

// Llamar a la función para cargar los productos cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();

  // Agregar el evento de clic al botón del carrito
  const buttonCarrito = document.getElementById("cart-btn");
  buttonCarrito.addEventListener("click", () => {
    mostrarCarrito();
  });

  // Agregar funcionalidad de busqueda
  const searchInput = document.getElementById("busqueda");
  searchInput.addEventListener("input", () => {
    buscarProducto(searchInput.value);
  });

  // Agregar funcion de ordenamiento
  const sortSelect = document.getElementById("ordenar");
  sortSelect.addEventListener("change", (event) => {
    let opcion = event.target.value;
    ordenarProductos(opcion);
  })
});
