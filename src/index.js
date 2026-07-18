import { TodoList } from "./todolist.js";
import { seedProjects } from "./seedProjects.js";

const todoList = new TodoList("My Todo List", seedProjects);
console.log(todoList);
console.log("Initial Projects:", seedProjects);

