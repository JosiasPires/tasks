function createProject(name) {
    const toDoList = [];

    toDoList.forEach((item, index) => {
        item.delete = () => {
            toDoList.splice(index, 1);
        }
    })
    
    return {name, toDoList};
}

