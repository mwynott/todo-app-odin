import { TodoList } from "./todoList.js";
import { seedProjects } from "./seedProjects.js";
import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { renderTodoList, renderProject, renderTodo } from "./render.js";

function saveTodoList(todoList) {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function loadTodoList() {
    const rawData = JSON.parse(localStorage.getItem("todoList"));
    if (!rawData) return new TodoList("My Todo List", seedProjects);

    const projects = rawData.projects.map(p =>
        new Project(p.name, p.todos.map(t =>
            new Todo(t.title, t.description, t.dueDate, t.notes, t.priority, t.completed)
        ))
    );
    return new TodoList(rawData.name, projects);
}

function refresh() {
    saveTodoList(todoList);
    const app = document.getElementById("app");
    app.innerHTML = "";
    app.append(renderTodoList(todoList));
}

const todoList = loadTodoList();

