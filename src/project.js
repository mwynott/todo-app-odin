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

    findTodo(title) {
        return this.todos.find(todo => todo.title === title);
    }

    markTodoCompleted(title) {
        const todo = this.findTodo(title);
        if (todo) {
            todo.completed = true;
        }
    }
}

