import "./style.css";
import { ToDo } from "./todo.js";
import { createProject } from "./project.js";
import { createProjectManager } from "./projectsManager.js";
import { renderModal, renderProject, renderToDo } from "./render.js";

const addProjectBtn = document.querySelector('#addProjectBtn');
const modal = document.querySelector('#modal');
const projectManager = createProjectManager();
let target = {};
let formState = 'create';

export function changeFormState(newState) {
    formState = newState;
}
export function changeTarget(newTarget) {
    target = newTarget;
}

addProjectBtn.addEventListener('click', () => {
    formState = "create";
    renderModal(formState);
})


modal.addEventListener("submit", (e) => {
    e.preventDefault();
    if (formState == "create") {
        renderProject(projectManager.addProject(createProject( modal.elements["title"].value )));
    }
    if (formState == "edit") {
        for (let prop of modal.elements) {
            if (prop.name in target || prop.name in target.project) {
                target.project[prop.name] = prop.value;
                target[prop.name].textContent = prop.value;
            }
        }
    }
})

