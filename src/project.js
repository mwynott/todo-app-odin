export class Project {
    constructor(name, todos = []) {
        this.name = name;
        this.todos = todos;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todo) {
        const index = this.todos.indexOf(todo);
        if (index > -1) {
            this.todos.splice(index, 1);
        }
    }
}
