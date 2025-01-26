let alumnos = [
    {
      nombre: "Juan",
      apellido: "Perez",
      calificacion: 8,
    },
    {
      nombre: "Maria",
      apellido: "Gonzalez",
      calificacion: 9,
    },
    {
      nombre: "Pedro",
      apellido: "Lopez",
      calificacion: 7,
    },
  ];
  
  let mostrarAlumnos = function () {
    alumnos.forEach((alumno) => {
      let fila = document.createElement("tr");
      let celda1 = document.createElement("td");
      let celda2 = document.createElement("td");
      let celda3 = document.createElement("td");
  
      celda1.textContent = alumno.nombre;
      celda2.textContent = alumno.apellido;
      celda3.textContent = alumno.calificacion;
  
      fila.appendChild(celda1);
      fila.appendChild(celda2);
      fila.appendChild(celda3);
  
      document.getElementById("tabla-calificaciones").appendChild(fila);
    });
  };
  
  mostrarAlumnos();
  
  let alumno = function (nombre, apellido, calificacion) {
    return {
      nombre,
      apellido,
      calificacion,
    };
  };
  
  let agregarAlumno = function (alumno) {
    alumnos.push(alumno);
  };
  
  let botonAgregar = document.getElementById("agregar");
  
  botonAgregar.addEventListener("click", function () {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let calificacion = document.getElementById("calificacion").value;
  
    let nuevoAlumno = alumno(nombre, apellido, calificacion);
  
    agregarAlumno(nuevoAlumno);
  
    let fila = document.createElement("tr");
    let celda1 = document.createElement("td");
    let celda2 = document.createElement("td");
    let celda3 = document.createElement("td");
  
    celda1.textContent = nuevoAlumno.nombre;
    celda2.textContent = nuevoAlumno.apellido;
    celda3.textContent = nuevoAlumno.calificacion;
  
    fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
  
    document.getElementById("tabla-calificaciones").appendChild(fila);
    
    alert("Alumno agregado correctamente");

    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("calificacion").value = "";
  });