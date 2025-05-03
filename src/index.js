import "./style.css";
import { ToDo } from "./todo.js";
import { createProject } from "./project.js";
import { createProjectManager } from "./projectsManager.js";
import { renderModal, renderProject, renderToDo } from "./render.js";
import { format } from "date-fns";


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
export function changeFormTarget(newFormTarget) {
    formTarget = newFormTarget;
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
    let date;
    if (formTarget == 'todo') {
        if (!modal.elements['dueDate'].value) date = format(new Date(), "yyyy-MM-dd");
        else date = format(modal.elements['dueDate'].value, "yyyy-MM-dd");
    }
    if (formState == "create") {
        if (formTarget == 'project') {
            currentProject = projectManager.addProject(createProject( modal.elements["title"].value )) 
            renderProject(currentProject);
            toDoContainer.innerHTML = '';
        }
        else {
            currentProject.addToDo(new ToDo(modal.elements['title'].value, modal.elements['description'].value, date, modal.elements['priority'].value));
            renderToDo(currentProject.toDoList[currentProject.toDoList.length - 1]);
        }
    }
    if (formState == "edit") {
        if (formTarget == 'project') {
            editTarget.title.textContent = editTarget.project.title = modal.elements['title'].value;
        }
        else {
            editTarget.title.textContent = editTarget.todo.title = modal.elements['title'].value;
            editTarget.dueDate.textContent = editTarget.todo.dueDate = date;
            editTarget.todo.description = modal.elements['description'].value;
            editTarget.todo.priority = modal.elements['priority'].value;
            editTarget.container.style.borderColor = editTarget.todo.priority == 0 ? 'yellow' : editTarget.todo.priority == 1 ? 'orange' : 'red';
        }
    }
})

currentProject = projectManager.addProject(createProject("Default"));

renderProject(projectManager.projectList[0]);
