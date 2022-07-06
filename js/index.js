// colocá las declaraciones acá


let boton = document.getElementById("agregar");

let inputTarea = document.getElementById("task");

let inputPrioridad = document.getElementById("prioridad");

let ul = document.getElementById("lista-de-tareas");

let subTaskTitle = document.getElementById("subTaskTitle")

let subListContainer = document.getElementById("container-subtareas");

let subListUl = document.getElementById("lista-de-subtareas");

let subTaskForm = document.getElementById("subTaskForm")

let inputSubTarea = document.getElementById("subtask");

let buttonSubTarea = document.getElementById("subTaskButton");

const LOCAL_STORAGE_KEY_VALUE = "task.list";

const LOCAL_STORAGE_KEY_VALUE_ID = "task.listId";

let listaDeTareas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_VALUE)) || [];

let selectedListId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_VALUE_ID)) || null;



//declaramos el class Tarea

class Task {
    constructor(nombre, prioridad) {
        this.nombre= nombre,
        this.prioridad= prioridad,
        this.subTareas= [],
        this.id= Date.now().toString()

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

let eliminarSubTask = (item, task, obj)=> {

    subListUl.removeChild(item);
    let posicion = obj.subTareas.indexOf(task)
    obj.subTareas.splice(posicion, 1);
    localStorage.setItem(LOCAL_STORAGE_KEY_VALUE_ID, JSON.stringify(selectedListId))
    localStorage.setItem(LOCAL_STORAGE_KEY_VALUE, JSON.stringify(listaDeTareas))
    mostrarSubLista();
    mostrarLista(); 
};



let mostrarLista = ()=> {

    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }

    listaDeTareas.map(obj => {
        let item = document.createElement("li");
        item.dataset.listId = obj.id;
        item.innerText = obj.prioridad == "Prioridad" 
        ? `${obj.nombre} - Sin prioridad` 
        : `${obj.nombre} - ${obj.prioridad}`;
        if(obj.id === selectedListId) { 
            const title = obj.nombre.split("-")
        subTaskTitle.innerText = title[0]; 
            item.classList.add("active-item");
            let button = document.createElement("button");
            button.innerText = "X";
            button.classList.add("deleteButton");
            button.addEventListener("click", ()=> {
                eliminar(item, obj)
                selectedListId = null;
                localStorage.setItem(LOCAL_STORAGE_KEY_VALUE_ID, JSON.stringify(selectedListId))
                localStorage.setItem(LOCAL_STORAGE_KEY_VALUE, JSON.stringify(listaDeTareas))
                mostrarSubLista();
                mostrarLista(); 
            });
            item.appendChild(button)
        }
        ul.appendChild(item)
        console.log(selectedListId)
    });

    };


    let mostrarSubLista = () => {
        if (!selectedListId) {
            subListContainer.style.display = "none";
        } else {
            subListContainer.style.display = "flex";}
    
        while (subListUl.firstChild) {
            subListUl.removeChild(subListUl.firstChild);
              }
    
        listaDeTareas.map(obj => {
            if(obj.id === selectedListId) {

                    obj.subTareas.map(task => {
                        const item = document.createElement("li");
                        const button = document.createElement("button");
                        button.innerText = "X";
                        button.classList.add("subTaskDelete");
                        button.addEventListener("click", () => {
                            eliminarSubTask(item, task, obj);
                        })
                        item.innerText = task;
                        item.appendChild(button)
                        subListUl.appendChild(item)
                    });     
            }
        })
    };
    
    subTaskForm.addEventListener("submit", e => {

        e.preventDefault();

        const inputValue = inputSubTarea.value;

        inputSubTarea.value = "";


        if(inputValue === null || inputValue === "") return;

        listaDeTareas.map(obj => {
            if(obj.id === selectedListId) {
                obj.subTareas.push(inputValue) 
            }})
        localStorage.setItem(LOCAL_STORAGE_KEY_VALUE, JSON.stringify(listaDeTareas))    
        mostrarSubLista();  
        mostrarLista();    
    })

    mostrarSubLista();
    mostrarLista();

let toDoList = ()=> {

    let task = new Task(inputTarea.value, inputPrioridad.value);
    task.agregarTarea(task);
    inputTarea.value = "";
    inputPrioridad.value = "Prioridad"
    localStorage.setItem(LOCAL_STORAGE_KEY_VALUE, JSON.stringify(listaDeTareas))
    mostrarSubLista();
    mostrarLista();
};




boton.addEventListener('click', ()=> inputTarea.value === "" 
? alert("Debes agregar una tarea") 
: toDoList());

ul.addEventListener("click", e => {
    if (e.target.tagName.toLowerCase() === "li") {
        selectedListId = e.target.dataset.listId;  
        // const title = e.target.innerText.split("-")
        // subTaskTitle.innerText = title[0]; 
        localStorage.setItem(LOCAL_STORAGE_KEY_VALUE_ID, JSON.stringify(selectedListId))
        mostrarSubLista();
        mostrarLista();
    }
})


