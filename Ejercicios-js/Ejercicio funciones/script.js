function ejecutarStringFunctiones() {
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