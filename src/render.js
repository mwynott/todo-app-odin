//module that handles rendering of the page

export function renderTodoList(todoList, refresh) {
    const container = document.createElement("div");
    todoList.projects.forEach(project => {
        container.append(renderProject(project, todoList, refresh))
    });
    return container;
}

export function renderProject(project, todoList, refresh) {
    const section = document.createElement("section");
    const heading = document.createElement("h2");
    heading.textContent = project.name;
    section.append(heading);

    const list = document.createElement("ul");
    project.todos.forEach(todo => {
        list.append(renderTodo(todo, project, todoList, refresh))
    });
    section.append(list);

    return section;
}

export function renderTodo(todo, project, todoList, refresh) {
    const li = document.createElement("li");
    li.textContent = `${todo.title} (${todo.priority})`;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = todo.completed ? "Undo" : "Complete";
        completeBtn.addEventListener("click", () => {
            project.markTodoCompleted(todo.title);
            refresh(); //re-render after changes are made
    });
        
        li.append(completeBtn);

        return li;
}