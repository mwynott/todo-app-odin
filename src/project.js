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

    removeTodo(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index > -1) {
            this.todos.splice(index, 1);
        }
    }

    findTodo(title) {
        return this.todos.find(t => t.title.toLowerCase() === title.toLowerCase());
    }

    markTodoCompleted(id) {
        const todo = this.findTodoById(id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }

    searchTodos(query) {
        const q = query.trim().toLowerCase();
        if(!q) return this.todos;
        return this.todos.filter(t => t.title.toLowerCase().includes(q));
    }

    rename(newName) {
        if (typeof newName !== "string" || newName.trim() == "") {
            throw new Error ("Project name cannot be empty!");
        }
        this.name = newName;
    }
}