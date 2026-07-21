export class Project {
    constructor(name, todos = []) {
        this.name = name;
        this.todos = todos;
    }

    addTodo(todo) {
        if (this.findTodo(todo.title)) {
            throw new Error(`Todo with title "${todo.title}" already exists in project "${this.name}"!`);
        }
        this.todos.push(todo);
    }

    removeTodo(title) {
        const index = this.todos.findIndex(todo => todo.title === title);
        if (index > -1) {
            this.todos.splice(index, 1);
        }
    }

    findTodo(title) {
        return this.todos.find(t => t.title.toLowerCase() === title.toLowerCase());
    }

    markTodoCompleted(title) {
        const todo = this.findTodo(title);
        if (todo) {
            todo.completed = true;
        }
    }
}