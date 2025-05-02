function createProject(title) {
    const toDoList = [];
    const addToDo = (todo) => {
        toDoList.push(todo);
        todo.remove = () => {
            const index = toDoList.findIndex((item) => todo == item);
            toDoList.splice(index, 1);
        }
    };
    return {title, toDoList, addToDo};
}

export {createProject};