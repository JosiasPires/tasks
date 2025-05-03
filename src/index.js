import "./style.css";
import { ToDo } from "./todo.js";
import { createProject } from "./project.js";
import { createProjectManager } from "./projectsManager.js";
import { renderModal, renderProject, renderToDo } from "./render.js";

const addProjectBtn = document.querySelector('#addProjectBtn');
const addToDoBtn = document.querySelector('#addToDoBtn');
const modal = document.querySelector('#modal');
const projectManager = createProjectManager();
const toDoContainer = document.querySelector("#todos");
let currentProject = {};
let editTarget = {};
let formTarget = '';
let formState = 'create';

export function changeFormState(newState) {
    formState = newState;
}
export function changeCurrentProject(newProject) {
    currentProject = newProject;
    toDoContainer.innerHTML = '';
    currentProject.toDoList.forEach(todo => {
        renderToDo(todo);
    });
}
export function changeEditTarget(newTarget) {
    editTarget = newTarget;
}

addProjectBtn.addEventListener('click', () => {
    formState = "create";
    formTarget = 'project';
    renderModal(formState, formTarget);
})

addToDoBtn.addEventListener('click', () => {
    formState = "create";
    formTarget = 'todo';
    renderModal(formState, formTarget);
})

modal.addEventListener("submit", (e) => {
    e.preventDefault();
    if (formState == "create") {
        if (formTarget == 'project') {
            currentProject = projectManager.addProject(createProject( modal.elements["title"].value )) 
            renderProject(currentProject);
            toDoContainer.innerHTML = '';
        }
        else {
            currentProject.addToDo(new ToDo(modal.elements['title'].value, modal.elements['description'].value, modal.elements['dueDate'].value, modal.elements['priority'].value));
            renderToDo(currentProject.toDoList[currentProject.toDoList.length - 1]);
        }
    }
    if (formState == "edit") {
        for (let prop of modal.elements) {
            if (prop.name in editTarget || prop.name in editTarget.project) {
                editTarget.project[prop.name] = prop.value;
                editTarget[prop.name].textContent = prop.value;
            }
        }
    }
})

currentProject = projectManager.addProject(createProject("Default"));

renderProject(projectManager.projectList[0]);
