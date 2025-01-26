const sumar = function(a, b) {
    return a + b;
}

console.log(5,6)

const persona = function (nombre,apellido){
    return {nombre,apellido}
}

const p1=persona("Juan","Perez")
console.log(p1)

const persona2 = function(nombre,apellido){
    let p = new Object();
    p.nombre = nombre;
    p.apellido = apellido;
    return p;
}

const p2=persona2("Juan","Perez")
console.log(p2)

const persona3 = function(nombre,apellido){
    let p = new Object();
    p["nombre"]=nombre;
    p["apellido"]=apellido;
    return p;
}

const p3=persona3("Juan","Perez")
console.log(p2)


const persona4 = function  (nombre,apellido){
    return {
        nombre,
        apellido,
        nombreCompleto: function (){
            return this.nombre + " " + this.apellido
        }
    }
}

const p4=persona4("Juan","Perez")
console.log(p4.nombreCompleto())


function Persona (nombre,apellido,edad, estatura)
{
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.estatura = estatura;
}

const p5 = new Persona("Juan","Perez",20,1.80)
