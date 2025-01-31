const assert = require("assert");
const { describe } = require("mocha");
const { Builder, Browser, By, until } = require("selenium-webdriver");
const { elementLocated } = require("selenium-webdriver/lib/until");

describe("Funciones del carrito de compras", () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("http://127.0.0.1:3000/tienda.html");
    //Se manda a llamar la lista de productos
    let listaProductos = await driver.findElements(By.css("#cards .card"));
    //Se guardan los productos
    let productoPrueba = listaProductos[0];
    //Se selecciona el producto
    await productoPrueba.click();
    //Se obtienen los botones de tallas
    let botonesTallas = await driver.findElements(By.className("modal-talla"));
    //Se guarda la primera talla
    let tallaPrueba = botonesTallas[0];
    //Se obtienen los botones de colores
    let botonesColores = await driver.findElements(By.className("modal-color"));
    //Se guarda el primer color
    let colorPrueba = botonesColores[0];

    await tallaPrueba.click();
    await colorPrueba.click();

    //Se obtiene el boton de comprar
    let botonComprar = await driver.findElement(By.className("add-to-cart"));
    //Se hace click
    await botonComprar.click();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("Aumentar la cantidad y precio de un producto", async () => {
    //Se manda a llamar el boton de aumentar, cantidad y precio
    let botonAumentar = await driver.findElement(
      By.className("increase-button")
    );
    let cantidadA = await driver
      .findElement(By.className("quantity"))
      .getText();
    let precioProductoA = await driver
      .findElement(By.id("precio-producto"))
      .getText();
    let precioTotalA = await driver
      .findElement(By.id("precio-total"))
      .getText();

    precioProductoA = extraerPrecio(cantidadA);
    precioTotalA = extraerPrecio(cantidadA);

    await botonAumentar.click();

    let cantidadD = await driver
      .findElement(By.className("quantity"))
      .getText();
    let precioProductoD = await driver
      .findElement(By.id("precio-producto"))
      .getText();
    let precioTotalD = await driver
      .findElement(By.id("precio-total"))
      .getText();

    precioProductoD = extraerPrecio(cantidadD);
    precioTotalD = extraerPrecio(cantidadD);

    assert.ok(
      cantidadA < cantidadD &&
        precioProductoA < precioProductoD &&
        precioTotalA < precioTotalD,
      "No aumento la cantidad y el precio del producto"
    );
  });

  it("Disminuir la cantidad y precio de un producto", async () => {
    //Se aumenta la catidad primero del producto
    let botonAumentar = await driver.findElement(
        By.className("increase-button")
    );
    await botonAumentar.click();
    //Se manda a llamar el boton de disminuir, cantidad y precio
    let botonDisminuir = await driver.findElement(
      By.className("decrease-button")
    );
    let cantidadA = await driver
      .findElement(By.className("quantity"))
      .getText();
    let precioProductoA = await driver
      .findElement(By.id("precio-producto"))
      .getText();
    let precioTotalA = await driver
      .findElement(By.id("precio-total"))
      .getText();

    precioProductoA = extraerPrecio(cantidadA);
    precioTotalA = extraerPrecio(cantidadA);

    await botonDisminuir.click();

    let cantidadD = await driver
      .findElement(By.className("quantity"))
      .getText();
    let precioProductoD = await driver
      .findElement(By.id("precio-producto"))
      .getText();
    let precioTotalD = await driver
      .findElement(By.id("precio-total"))
      .getText();

    precioProductoD = extraerPrecio(cantidadD);
    precioTotalD = extraerPrecio(cantidadD);

    assert.ok(
      cantidadA > cantidadD &&
        precioProductoA > precioProductoD &&
        precioTotalA > precioTotalD,
      "No disminuyo la cantidad y el precio del producto"
    );
  });

  it("Eliminar producto, carrito vacio", async () => {
    //Se manda a llamar el boton eliminar
    let botonEliminar = await driver.findElement(By.className("fa-trash"));
    await botonEliminar.click();
    let listaCarrito = await driver.findElements(By.css(".modal-body li"));

    assert(listaCarrito.length === 0,
      "El producto no se elimino"
    );
  });

  it("Redirigir a la pagina de detalles de compra", async () => {
    //Se manda a llamar el boton de finalizar compra
    let botonFinalizar = await driver.findElement(By.className("buy-button"));
    await botonFinalizar.click();

    await driver.wait(until.urlContains("compra.html"), 1000);

    let urlActual = await driver.getCurrentUrl();

    assert(urlActual.includes("compra.html"),
      "No se redirigio a la pagina de compra");
  });

  function extraerPrecio(num) {
    return parseFloat(num.replace(/[\$USD]/g, "").trim());
  }
});
