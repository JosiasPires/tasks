const sidebar = document.querySelector("#sidebar");

function renderProject(project) {
    const container = document.createElement('div');
    const title = document.createElement('h3');
    const removeBtn = document.createElement('button');

    title.textContent = project.name;
    removeBtn.addEventListener('click', (e) => {
        project.remove();
        container.remove();
    })
    
    container.appendChild(title);
    container.appendChild(removeBtn);
    sidebar.appendChild(container)
}

export {renderProject}