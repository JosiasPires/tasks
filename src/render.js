const projectsContainer = document.querySelector("#projects");
const main = document.querySelector("main");

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

export {renderProject, renderToDo}