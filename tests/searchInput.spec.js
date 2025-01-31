const assert = require("assert");
const { describe } = require("mocha");
const { Builder, Browser, By } = require("selenium-webdriver");

describe("Buscar productos en la tienda", () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("http://127.0.0.1:3000/tienda.html");
  });

  after(async () => {
    await driver.quit();
  });

  it("Coincidencias parciales de busqueda", async () => {
    //Se manda a llamr el componente
    let inputSearch = await driver.findElement(By.id("busqueda"));
    //Dato parcial
    let testValue = "prime";
    //Se introduce el valor parcial
    await inputSearch.sendKeys(testValue);
    //Se obtiene la lista de productos
    let listaProductos = await driver.findElements(By.className("card-title"));
    // Se itera sobre los productos
    for (let producto of listaProductos) {
      //Se obtiene su valor
      let value = await producto.getText();
      // Se comprueba que contenga el valor parcial
      assert(value.includes(testValue),
        "El producto no contiene el valor parcial");
    }
  });

  it("Coincidencias con caracteres especiales", async () => {
    let inputSearch = await driver.findElement(By.id("busqueda"));
    await inputSearch.clear();
    //Dato con caracteres especiales
    let testValue = "Andrés";
    await inputSearch.sendKeys(testValue);
    let listaProductos = await driver.findElements(By.className("card-title"));
    for (let producto of listaProductos) {
      //Se obtiene su valor
      let value = await producto.getText();
      // Se comprueba que contenga el valor con caracteres especiales
      assert(value.includes(testValue),
        "El producto no contiene el valor con caracteres especiales");
    }
  });

  it("Sin resultados de busqueda", async () => {
    let inputSearch = await driver.findElement(By.id("busqueda"));
    await inputSearch.clear();
    let testValue = "ssdsd";
    await inputSearch.sendKeys(testValue);
    let listaProductos = await driver.findElements(By.className("card-title"));
    //Se comprueba la longitud de los resultados
    assert(listaProductos.length === 0,
      "Si muestra resultados de busqueda"
    );
  });
});
