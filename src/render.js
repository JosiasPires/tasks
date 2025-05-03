import { changeFormState, changeEditTarget, changeCurrentProject, changeFormTarget } from "./index.js";

const projectsContainer = document.querySelector("#projects");
const toDoContainer = document.querySelector("#todos");
const modal = document.querySelector("#modal");
const toDoInputs = document.querySelector('.toDoInputs');
const cancelBtn = document.querySelector("#cancel");
const submitBtn = document.querySelector("#submit");

cancelBtn.addEventListener('click', () => {
    modal.className = modal.className == 'hidden' ? 'grid' : 'hidden';
})
submitBtn.addEventListener('click', () => {
    modal.className = modal.className == 'hidden' ? 'grid' : 'hidden';
})

const toDoHtml = `<label for="description">Description:</label>
            <textarea name="description" id="description"></textarea>
            <label for="dueDate">Due date:</label>
            <input type="date" name="dueDate" id="dueDate">
            <label for="priority">Priority:</label>
            <select name="priority" id="priority">
                <option value="0" >Low</option>
                <option value="1" selected="selected">Normal</option>
                <option value="2">High</option>
            </select>`

function renderProject(project) {
    const container = document.createElement('div');
    const title = document.createElement('h3');
    const editBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    title.textContent = project.title;
    editBtn.textContent = "Edit";
    removeBtn.textContent = 'X';
    container.addEventListener('click', () => {
        changeCurrentProject(project);
    })
    editBtn.addEventListener('click', () => {
        changeFormState('edit');
        changeFormTarget('project');
        changeEditTarget({title, project});
        renderModal("edit", 'project', project);

    })
    removeBtn.addEventListener('click', (e) => {
        project.remove();
        container.remove();
    })

    container.appendChild(title);
    container.appendChild(editBtn);
    container.appendChild(removeBtn);
    projectsContainer.appendChild(container);
}

function renderToDo(todo) {
    const container = document.createElement('div');
    const title = document.createElement('h4');
    const dueDate = document.createElement('p');
    const editBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    title.textContent = todo.title;
    dueDate.textContent = todo.dueDate;
    editBtn.textContent = "Edit"
    removeBtn.textContent = "X"
    container.style.backgroundColor = 'white';
    if (todo.priority == 0) container.style.border='2px solid yellow';
    if (todo.priority == 1) container.style.border='2px solid orange';
    if (todo.priority == 2) container.style.border='2px solid red';

    container.addEventListener('click', () => {
        if (todo.check()) {
            container.style.filter = 'brightness(0.8)';
            title.style.color = 'gray';
            title.style.textDecoration = "line-through";
        }
        else {
            container.style.filter = 'brightness(1)';
            title.style.color = 'black';
            title.style.textDecoration = "none";
        }
    })
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        changeFormState('edit');
        changeFormTarget('todo');
        changeEditTarget({title, dueDate, todo});
        renderModal("edit", 'todo', todo);
    })
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        todo.remove();
        container.remove();
    })
    
    container.appendChild(title);
    container.appendChild(dueDate);
    container.appendChild(editBtn);
    container.appendChild(removeBtn);
    toDoContainer.appendChild(container)
}

function renderModal(formType, formTarget, object={}) {
    modal.className = modal.className == 'hidden' ? 'grid' : 'hidden';
    if (formTarget == 'todo') {
        toDoInputs.innerHTML = toDoHtml;
    }
    else toDoInputs.innerHTML = '';
    if (formType == "edit") {
        for (let prop of modal.elements) {
            prop.value = object[prop.name];
        }
    }
}

export {renderProject, renderToDo, renderModal}