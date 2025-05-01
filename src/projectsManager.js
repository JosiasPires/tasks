function createProjectManager() {
    const projectList = [];
    const addProject = (project) => {
        projectList.push(project);
        project.remove = () => {
            const index = toDoList.findIndex((item) => project == item);
            toDoList.splice(index, 1);
        }
    };
    return {projectList, addProject};
}

export {createProjectManager};