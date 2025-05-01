function createProject(name) {
    const toDoList = [];
    const addToDo = (todo) => {
        toDoList.push(todo);
        todo.remove = () => {
            const index = toDoList.findIndex((item) => todo == item);
            toDoList.splice(index, 1);
        }
    } 
    
    return {name, toDoList, addToDo};
}
