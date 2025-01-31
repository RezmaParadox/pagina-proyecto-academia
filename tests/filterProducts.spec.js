const assert = require("assert");
const { describe } = require("mocha");
const { Builder, Browser, By } = require("selenium-webdriver");

describe("Ordenar los productos por precio", () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("http://127.0.0.1:3000/tienda.html");
  });

  after(async () => {
    await driver.quit();
  });

  it("De mayor a menor", async () => {
    //Se manda a llamar el componente
    let selector = await driver.findElement(By.id("ordenar"));
    //Se selecciona la opcion de mayor a menor
    await selector.findElement(By.css("option[value='mayor']")).click();
    //Se obtiene la lista de productos
    let listaProductos = await driver.findElements(By.className("card-price"));
    // Se itera sobre los productos para obtener su precio
    let precios = await Promise.all(listaProductos.map(async producto => {
        // Se obtiene el contenido del componente
        let text = await producto.getText();
        // Se eliminan los caracteres adicionales
        return parseFloat(text.replace(/[\$USD]/g,"").trim());
    }))
    console.log(precios)
    // Comprueba que el precio del anterior sea mayor
    assert(precios.every( (precio, index) => index === 0 || precio <= precios[index-1]),
      "Los precios de los productos no se ordenan de mayor a menor")
  });

  it("De menor a mayor", async () => {
    //Se manda a llamar el componente
    let selector = await driver.findElement(By.id("ordenar"));
    //Se selecciona la opcion de mayor a menor
    await selector.findElement(By.css("option[value='menor']")).click();
    //Se obtiene la lista de productos
    let listaProductos = await driver.findElements(By.className("card-price"));
    // Se itera sobre los productos para obtener su precio
    let precios = await Promise.all(listaProductos.map(async producto => {
        // Se obtiene el contenido del componente
        let text = await producto.getText();
        // Se eliminan los caracteres adicionales
        return parseFloat(text.replace(/[\$USD]/g,"").trim());
    }))
    console.log(precios)
    // Comprueba que el precio del anterior sea mayor
    assert(precios.every( (precio, index) => index === 0 || precio >= precios[index-1]),
      "Los precios de los productos no se ordenan de menor a mayor")
  });
});