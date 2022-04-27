// colocá las declaraciones acá
let listaDeTareas = [];

let boton = document.getElementById("agregar")

let inputTarea = document.getElementById("task");

let inputPrioridad = document.getElementById("prioridad");

let ul = document.getElementById("lista-de-tareas");

//declaramos el class Tarea

class Tarea {
    constructor(nombre, prioridad) {
        this.nombre= nombre,
        this.prioridad= prioridad
};
    agregarTarea(obj) {
        listaDeTareas.push(obj);
    }
};

// funciones --------------------------

let eliminar = (item, obj)=> {

    ul.removeChild(item);
    let posicion = listaDeTareas.indexOf(obj)
    listaDeTareas.splice(posicion, 1)
};

let mostrarLista = ()=> {

    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }

    listaDeTareas.map(obj => {
        let item = document.createElement("li")
        item.innerText = `${obj.nombre} ${obj.prioridad}`;
        ul.appendChild(item)
        item.addEventListener("click", ()=> {
            eliminar(item, obj)
        })
    })

    };

let toDoList = ()=> {

    let task = new Tarea(inputTarea.value, inputPrioridad.value);

    task.agregarTarea(task);

    mostrarLista();

};


boton.addEventListener('click', ()=> toDoList());



