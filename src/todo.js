class ToDo {
    constructor(title, description='', dueDate, priority=0) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = false;
    }
    check() {
        this.isDone = !this.isDone;
    }
}

export {ToDo};