function createProjectManager() {
    const projectList = [];
    const addProject = (project) => {
        projectList.push(project);
        project.remove = () => {
            const index = projectList.findIndex((item) => project == item);
            projectList.splice(index, 1);
        }
    };
    return {projectList, addProject};
}

export {createProjectManager};