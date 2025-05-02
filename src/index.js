import "./style.css";
import { ToDo } from "./todo.js";
import { createProject } from "./project.js";
import { createProjectManager } from "./projectsManager.js";
import { renderModal, renderProject, renderToDo } from "./render.js";

const addProjectBtn = document.querySelector('#addProjectBtn');
const modal = document.querySelector('#modal');
const projectManager = createProjectManager();
let target = 'new';
let formState = 'create';

addProjectBtn.addEventListener('click', () => {
    formState = "create";
    renderModal(formState);
})

modal.addEventListener("submit", (e) => {
    e.preventDefault();
    if (formState == "create") {
        renderProject(projectManager.addProject(createProject( modal.elements["title"].value )));
        
    }
})

