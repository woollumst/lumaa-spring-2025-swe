class Task {
    constructor(id, title, description, isComplete = false, userId){
        this.id = id; // task id
        this.title = title;
        this.description = description;
        this.isComplete = isComplete; // false by default
        this.userId = userId; // user Id that created task
    }
}

export default Task;