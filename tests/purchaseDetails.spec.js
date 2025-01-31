const assert = require("assert");
const { describe } = require("mocha");
const { Builder, Browser, By, until } = require("selenium-webdriver");
const { elementLocated } = require("selenium-webdriver/lib/until");

describe("Funciones de los detalles de compra", () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("http://127.0.0.1:3000/tienda.html");
    //Se manda a llamar la lista de productos
    let listaProductos = await driver.findElements(By.css("#cards .card"));
    //Cantidad de productos
    let cantidadPrueba = 2;

    for (let i = 0; i < cantidadPrueba; i++) {
      //Se guardan los productos
      let productoPrueba = listaProductos[i];
      await productoPrueba.click();

      await driver.wait(until.elementLocated(By.className("modal")));

      //Se obtienen los botones de tallas
      let botonesTallas = await driver.findElements(
        By.className("modal-talla")
      );
      //Se guarda la primera talla
      let tallaPrueba = botonesTallas[0];
      //Se obtienen los botones de colores
      let botonesColores = await driver.findElements(
        By.className("modal-color")
      );
      //Se guarda el primer color
      let colorPrueba = botonesColores[0];

      await tallaPrueba.click();
      await colorPrueba.click();

      //Se obtiene el boton de comprar
      let botonComprar = await driver.findElement(By.className("add-to-cart"));
      //Se hace click
      await botonComprar.click();

      //Se obtiene el boton cerrar
      let botonCerrar = await driver.findElement(By.className("close-modal"));
      //Se hace click
      await botonCerrar.click();
    }

    //Se obtiene el boton de carrito
    let botonCarrito = await driver.findElement(By.id("cart-btn"));
    await botonCarrito.click();

    //Se manda a llamar el boton de finalizar compra
    let botonFinalizar = await driver.findElement(By.className("buy-button"));
    await botonFinalizar.click();
  });

  after(async () => {
    await driver.quit();
  });

  it("Ordenar los productos por precio ascendente", async () => {
    //Se manda a llamar el boton de ascendente
    let botonesAscendente = await driver.findElements(By.id("btn-asc"));
    let botonPrecio = botonesAscendente[3];
    await botonPrecio.click();

    let tabla = await driver.findElement(By.className("carrito-table"));

    let filas = await tabla.findElements(By.css("tr"));

    let precios = [];

    for (let i = 1; i < filas.length; i++) {
      let celdas = await filas[i].findElements(By.css("td"));

      if (celdas.length > 4) {
        let precio = await celdas[4].getText();
        precio = precio.replace("$", "");
        precios.push(parseFloat(precio));
      }
    }

    assert(
      precios.every(
        (precio, index) => index === 0 || precio <= precios[index - 1]
      ),
      "Los precios de los productos no se ordenan de mayor a menor"
    );
  });

  it("Ordenar los productos por precio descendente", async () => {
    //Se manda a llamar el boton de descendente
    let botonesDescendente = await driver.findElements(By.id("btn-desc"));
    let botonPrecio = botonesDescendente[3];
    await botonPrecio.click();

    let tabla = await driver.findElement(By.className("carrito-table"));

    let filas = await tabla.findElements(By.css("tr"));

    let precios = [];

    for (let i = 1; i < filas.length; i++) {
      let celdas = await filas[i].findElements(By.css("td"));

      if (celdas.length > 4) {
        let precio = await celdas[4].getText();
        precio = precio.replace("$", "");
        precios.push(parseFloat(precio));
      }
    }

    assert(
      precios.every(
        (precio, index) => index === 0 || precio >= precios[index - 1]
      ),
      "Los precios de los productos no se ordenan de menor a mayor"
    );
  });

  it("Ordenar el nombre de los productos alfabeticamente", async () => {
    //Se manda a llamar el boton de ascendente
    let botonesAscendente = await driver.findElements(By.id("btn-asc"));
    let botonAlfabeticamente = botonesAscendente[2];
    await botonAlfabeticamente.click();

    let tabla = await driver.findElement(By.className("carrito-table"));

    let filas = await tabla.findElements(By.css("tr"));

    let nombres = [];

    for (let i = 1; i < filas.length; i++) {
      let celdas = await filas[i].findElements(By.css("td"));

      if (celdas.length > 4) {
        let nombre = await celdas[1].getText();
        nombres.push(nombre);
      }
    }

    assert(
      nombres.every(
        (nombre, index) =>
          index === 0 || nombre.localeCompare(nombres[index - 1]) > 0
      ),
      "Los nombres de los productos no se ordenan alfabeticamente"
    );
  });

  it("Ordenar el nombre de los productos alfabeticamente en reversa", async () => {
    //Se manda a llamar el boton de descendente
    let botonAlfabeticamenteD = await driver.findElement(
      By.id("btn-desc-letra")
    );
    await botonAlfabeticamenteD.click();

    let tabla = await driver.findElement(By.className("carrito-table"));

    let filas = await tabla.findElements(By.css("tr"));

    let nombres = [];

    for (let i = 1; i < filas.length; i++) {
      let celdas = await filas[i].findElements(By.css("td"));

      if (celdas.length > 4) {
        let nombre = await celdas[1].getText();
        nombres.push(nombre);
      }
    }

    assert(
      nombres.every(
        (nombre, index) =>
          index === 0 || nombre.localeCompare(nombres[index - 1]) < 0
      ),
      "Los nombres de los productos no se ordeno en reversa"
    );
  });

  it("Eliminar producto", async () => {
    //Se manda a llamar el boton de eliminar y la lista de productos
    let tabla = await driver.findElement(By.className("carrito-table"));

    let filasAntes = await tabla.findElements(By.css("tr"));

    let elementoEliminar = filasAntes[1];

    await elementoEliminar.findElement(By.className("btn-danger")).click();

    let filasDespues = await tabla.findElements(By.css("tr"));

    assert(
      filasAntes.length !== filasDespues.length,
      "El producto no se elimino"
    );
  });
});
