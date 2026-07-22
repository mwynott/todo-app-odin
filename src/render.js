//module that handles rendering of the page



export function renderTodoList(todoList, onChange) {}
export function renderProject(project, todoList, onChange) {}

export function renderTodo(todo, project, todoList, onChange) {
    const li = document.createElement("li");
    li.textContent = `{todo.title} ({todo.priority})`;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = todo.completed ? "Undo" : "Complete";
        completeBtn.addEventListener("click", () =>
            project.markTodoCompleted(todo.title);
            onChange(); //re-render after changes are made
        );
        
        li.append(completeBtn);
        return li;
}