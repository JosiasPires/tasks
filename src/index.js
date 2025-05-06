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
let currentProject = false;
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
    if (currentProject) currentProject.container.classList.toggle('selected');
    newProject.container.classList.toggle('selected');
    currentProject = newProject;
    toDoContainer.innerHTML = '';
    currentProject.project.toDoList.forEach(todo => {
        renderToDo(todo);
    });
}
export function changeEditTarget(newTarget) {
    editTarget = newTarget;
}
export function saveState() {
    localStorage.setItem('save', JSON.stringify(projectManager.projectList))
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
            currentProject.project = projectManager.addProject(createProject( modal.elements["title"].value ));
            changeCurrentProject({container: renderProject(currentProject.project), project: currentProject.project});
            toDoContainer.innerHTML = '';
        }
        else {
            currentProject.project.addToDo(new ToDo(modal.elements['title'].value, modal.elements['description'].value, date, modal.elements['priority'].value));
            renderToDo(currentProject.project.toDoList[currentProject.project.toDoList.length - 1]);
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
    saveState();
})

const save = JSON.parse(localStorage.getItem('save'));

if (!save || save.length == 0) {
    const defaultProject = projectManager.addProject(createProject("Default"))
    const defaultContainer = renderProject(projectManager.projectList[0]);
    
    changeCurrentProject({container: defaultContainer, project: defaultProject});
}

else {
    save.forEach(savedProject => {
        const project = projectManager.addProject(createProject(savedProject.title));
        renderProject(project);
        savedProject.toDoList.forEach(savedToDo => {
            const todo = new ToDo(savedToDo.title, savedToDo.description, savedToDo.dueDate, savedToDo.priority)
            todo.isDone = savedToDo.isDone;
            project.addToDo(todo);
        })
    })
}