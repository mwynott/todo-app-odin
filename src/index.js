import { TodoList } from "./todoList.js";
import { seedProjects } from "./seedProjects.js";
import { Project } from "./project.js";
import { Todo } from "./todo.js";

const todoList = new TodoList("My Todo List", seedProjects);
console.log(todoList);
console.log("Initial Projects:", seedProjects);

