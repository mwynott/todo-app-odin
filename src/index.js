import { TodoList } from "./todoList.js";
import { seedProjects } from "./seedProjects.js";
import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { renderSearchBar, renderTodoList, renderTodo } from "./render.js";

let searchQuery = "";
let editProjectName = null;
let editTodo = null; 
let isAddingProject = false;
let addingTodoToProject = null; 

function refresh() {
    saveTodoList(todoList);
    const app = document.getElementById("app");
    app.textContent = "";

    function onEditProject(name) {
        editProjectName = name;
        refresh();
    }

    function onEditTodo(id) {
        editTodo = id;
        refresh();
    }

    function onStartAddProject() {
        isAddingProject = true;
        refresh();
    }

    function onStartAddTodo(projectName) {
        addingTodoToProject = projectName;
        refresh();
    }

function onAddProject(name) {
    if (name === null) {
        isAddingProject = false; //no input, cancel adding project
        refresh();
        return;
    } 
    try {
        todoList.addProject(new Project(name));
        isAddingProject = false;
        refresh();
    } catch (error) {
        alert(error.message);
    }
}

function onAddTodo(projectName, todoData) {
    if (todoData === null) {
        addingTodoToProject = null; //no input, cancel adding todo
        refresh();
        return;
    }
    try {
        const project = todoList.findProject(projectName);
        project.addTodo(new Todo(todoData.title, todoData.description,
            todoData.dueDate, todoData.notes, todoData.priority
            ));
        addingTodoToProject = null;
        refresh();
    } catch (error) {
        alert(error.message);
    }
}

    const filteredProjects = todoList.searchProjects(searchQuery);
    const filteredList = new TodoList(todoList.name, filteredProjects);

    const searchBar = renderSearchBar(searchQuery, query => {
        searchQuery = query;
        refresh();
    });

    app.append(searchBar);

    searchBar.focus();
    searchBar.setSelectionRange(searchQuery.length, searchQuery.length);
    app.append(renderTodoList(filteredList, refresh, editProjectName, onEditProject, editTodo,
         onEditTodo, isAddingProject, onStartAddProject, onAddProject, addingTodoToProject, onStartAddTodo, onAddTodo));
}

function saveTodoList(todoList) {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function loadTodoList() {
    const rawData = JSON.parse(localStorage.getItem("todoList"));
    if (!rawData) return new TodoList("My Todo List", seedProjects);

    const projects = rawData.projects.map(p =>
        new Project(p.name, p.todos.map(t =>
            new Todo(t.title, t.description, t.dueDate, t.notes, t.priority, t.completed, t.id)
        ))
    );
    return new TodoList(rawData.name, projects);
}



const todoList = loadTodoList();
refresh();