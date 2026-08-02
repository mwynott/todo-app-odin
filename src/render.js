//module that handles rendering of the page

export function renderTodoList(todoList, refresh, editProjectName, onEditProject, editTodo, onEditTodo) {
    const container = document.createElement("div");

    todoList.projects.forEach(project => {
        container.append(renderProject(project, todoList, refresh, editProjectName, onEditProject, editTodo, onEditTodo))
    });
    return container;
}

export function renderSearchBar (currentQuery, onSearch) {
    const searchBar = document.createElement("input");

    searchBar.placeholder = "Search projects..."
    searchBar.value = currentQuery;
    searchBar.addEventListener("input", () => {
        onSearch(searchBar.value);
    })

    return searchBar;
}

export function renderProject(project, todoList, refresh, editProjectName, onEditProject, editTodo, onEditTodo) {
    const section = document.createElement("section");

    if (editProjectName === project.name) {
        //render edit mode for project with save button
        const input = document.createElement("input");
        input.value = project.name;
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.addEventListener("click", () => {
            project.rename(input.value);
            onEditProject(null); //exits edit mode
            refresh();
        })
        section.append(input, saveBtn);
    } else {
        //display mode + edit button
        const heading = document.createElement("h2");
        heading.textContent = project.name;

        const editProjectBtn  = document.createElement("button");
        editProjectBtn.textContent = "Edit";
        editProjectBtn.addEventListener("click", () => onEditProject(project.name));

        const removeProjectBtn = document.createElement("button");
        removeProjectBtn.textContent = "Remove";
        removeProjectBtn.addEventListener("click", () => {
            if (window.confirm(`Are you sure you want to remove the project "${project.name}"?`)) {
                todoList.removeProject(project.name);
                refresh();
            }
        });
        
        section.append(heading, editProjectBtn, removeProjectBtn);
    }

    const list = document.createElement("ul");
    project.todos.forEach(todo => {
        list.append(renderTodo(todo, project, todoList, refresh, editTodo, onEditTodo));
    });
    section.append(list);

    return section;
}

export function renderTodo(todo, project, todoList, refresh, editTodo, onEditTodo) {
    const li = document.createElement("li");

    //Edit mode for todo with save button
    if (editTodo === todo.id) {
        const titleInput = document.createElement("input");
        titleInput.value = todo.title;
        titleInput.placeholder = "Title";

        const descriptionInput = document.createElement("input");
        descriptionInput.value = todo.description;
        descriptionInput.placeholder = "Description";

        const dueDateInput = document.createElement("input");
        dueDateInput.value = todo.dueDate;
        dueDateInput.placeholder = "Due Date";

        const notesInput = document.createElement("input");
        notesInput.value = todo.notes;
        notesInput.placeholder = "Notes";

        const priorityInput = document.createElement("select");
        ["low", "medium", "high"].forEach(priority => {
            const option = document.createElement("option");
            option.value = priority;
            option.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
            if (priority === todo.priority) {
                option.selected = true;
            }
            priorityInput.append(option);
        });

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.addEventListener("click", () => {
            todo.update({
                title: titleInput.value,
                description: descriptionInput.value,
                dueDate: dueDateInput.value,
                notes: notesInput.value,
                priority: priorityInput.value
            });
            onEditTodo(null); //exits edit mode
            refresh();
        });
        
        li.append(titleInput, descriptionInput, dueDateInput, notesInput, priorityInput, saveBtn);
            } else {
        //display mode + edit button
        const heading = document.createElement("h3");
        heading.textContent = todo.title;

        const editTodoBtn = document.createElement("button");
        editTodoBtn.textContent = "Edit";
        editTodoBtn.addEventListener("click", () => onEditTodo(todo.id));

        const removeTodoBtn = document.createElement("button");
        removeTodoBtn.textContent = "Remove";
        removeTodoBtn.addEventListener("click", () => {
            if (window.confirm(`Are you sure you want to remove the todo "${todo.title}"?`)) {
                project.removeTodo(todo.title);
                refresh();
            }
        });

        li.append(heading, editTodoBtn, removeTodoBtn);
    }

    const completeBtn = document.createElement("button");
    completeBtn.textContent = todo.completed ? "Completed!" : "Complete";
        completeBtn.addEventListener("click", () => {
            project.markTodoCompleted(todo.title);
            refresh(); //re-render after changes are made
    });
        
        li.append(completeBtn);

        return li;
}
