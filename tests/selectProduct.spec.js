const assert = require("assert");
const { describe } = require("mocha");
const { Builder, Browser, By, until } = require("selenium-webdriver");
const { elementLocated } = require("selenium-webdriver/lib/until");

describe("Seleccionar un producto", () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("http://127.0.0.1:3000/tienda.html");
    //Se manda a llamar la lista de productos
    let listaProductos = await driver.findElements(By.css("#cards .card"));
    //Se guarda el primer producto
    let productoPrueba = listaProductos[0];
    //Se selecciona el producto
    await productoPrueba.click();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("Advertencia de seleccion de talla y color", async () => {
    //Se obtiene el boton de comprar
    let botonComprar = await driver.findElement(By.className("add-to-cart"));
    //Se hace click
    await botonComprar.click();
    //Se espera la alerta
    assert(await driver.wait(until.alertIsPresent(), 1000),
      "No se mostro la alerta");
  });

  it("Selecccionar una talla", async () => {
    //Se obtienen los botones de tallas
    let botonesTallas = await driver.findElements(By.className("modal-talla"));
    //Se guarda la primera talla
    let tallaPrueba = botonesTallas[0];
    //Se obtiene el estilo anterior del boton
    let estiloAnterior = await tallaPrueba.getCssValue("background-color");
    //Se selecciona una talla
    await tallaPrueba.click();
    //Se obtiene el estilo actual del boton
    let estiloActual = await tallaPrueba.getCssValue("background-color");

    //Se comprueba que el estilo anterior sea diferente al actual
    assert(estiloAnterior !== estiloActual,
      "El estilo anterior es igual al actual"
    );
  });

  it("Selecccionar un color", async () => {
    //Se obtienen los botones de colores
    let botonesColores = await driver.findElements(By.className("modal-color"));
    //Se guarda el primer color
    let colorPrueba = botonesColores[0];
    //Se selecciona un color
    await colorPrueba.click();
    //Se obtiene el estilo del borde actual del boton
    let estiloActual = await colorPrueba.getCssValue("border");

    //Se comprueba que existe el borde
    assert.ok(estiloActual,
      "No se mostro el borde"
    );
  });

  it("Aparece el modal del carrito de compras al agregar un producto", async () => {
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

    //Se optiene el modal de compra
    let modalCompra = await driver.wait(
      until.elementLocated(By.className("modal-carrito")),
      1000
    );
    await driver.wait(until.elementIsVisible(modalCompra), 1000);

    //Se coprueba que exista el modal
    assert.ok(modalCompra, "El modal no se mostro");
  });
});
