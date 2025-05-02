const projectsContainer = document.querySelector("#projects");
const main = document.querySelector("main");
const modal = document.querySelector("#modal");
const toDoInputs = document.querySelector('.toDoInputs');
const cancelBtn = document.querySelector("#cancel");
const submitBtn = document.querySelector("#submit");

cancelBtn.addEventListener('click', () => {
    modal.classList.toggle('hidden');
})
submitBtn.addEventListener('click', () => {
    modal.classList.toggle('hidden');
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
    const removeBtn = document.createElement('button');

    title.textContent = project.name;
    removeBtn.textContent = 'X'
    removeBtn.addEventListener('click', (e) => {
        project.remove();
        container.remove();
    })

    container.appendChild(title);
    container.appendChild(removeBtn);
    projectsContainer.appendChild(container)
}

function renderToDo(toDo) {
    const container = document.createElement('div');
    const title = document.createElement('h4');
    const editBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    title.textContent = toDo.title;
    editBtn.textContent = "Edit"
    removeBtn.textContent = "X"
    container.style.backgroundColor='red';

    container.addEventListener('click', (e) => {
        if (toDo.check()) container.style.backgroundColor='green';
        else container.style.backgroundColor='red';
        console.log(toDo.isDone);
    })
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
    })
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toDo.remove();
        container.remove();
    })
    
    container.appendChild(title);
    container.appendChild(editBtn);
    container.appendChild(removeBtn);
    main.appendChild(container)
}

function renderModal(object, formType) {
    modal.classList.toggle('hidden');
    if ("description" in object) {
        toDoInputs.innerHTML = toDoHtml;
    }
    if (formType == "edit") {
        for (let prop in object) {
            modal.elements[prop].value = object[prop];
        }
    }
}

export {renderProject, renderToDo, renderModal}