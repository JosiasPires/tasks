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
    update(changes) {
        for (let key in changes) {
            this[key] = changes[key];
        }
    }
}

export {ToDo};