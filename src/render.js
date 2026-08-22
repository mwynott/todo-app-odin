//module that handles rendering of the page

export function renderTodoList(todoList, refresh, editProjectName, onEditProject, editTodo, 
    onEditTodo, isAddingProject, onStartAddProject, onAddProject, addingTodoToProject, onStartAddTodo, onAddTodo) {
    const container = document.createElement("div");

    const heading = document.createElement("h1");
    heading.id = "heading";
    heading.textContent = "Todo List";
    container.prepend(heading);

    todoList.projects.forEach(project => {
        container.append(renderProject(project, todoList, refresh, editProjectName, onEditProject,
             editTodo, onEditTodo, addingTodoToProject, onStartAddTodo, onAddTodo));
    });

    if (isAddingProject) {
        const input = document.createElement("input");
        input.placeholder = "Add new project...";
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.addEventListener("click", () => onAddProject(input.value));
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click", () => onAddProject(null));
        container.append(input, saveBtn, cancelBtn);
    } else {
        const addProjectBtn = document.createElement("button");
        addProjectBtn.textContent = "";
        addProjectBtn.id = "addProjectBtn";
        addProjectBtn.title = "Start new project";
        addProjectBtn.addEventListener("click", onStartAddProject);
        container.append(addProjectBtn);
    }
    return container;
}

export function renderSearchBar (currentQuery, onSearch) {
    const searchBar = document.createElement("input");
    searchBar.id = "search";
    searchBar.placeholder = "Search projects..."
    searchBar.value = currentQuery;
    searchBar.addEventListener("input", () => {
        onSearch(searchBar.value);
    })

    return searchBar;
}

export function renderProject(project, todoList, refresh, editProjectName, onEditProject,
     editTodo, onEditTodo, addingTodoToProject, onStartAddTodo, onAddTodo) {
    const section = document.createElement("section");

    const btnContainer = document.createElement("div");
    btnContainer.id = "btnContainer";

    if (addingTodoToProject === project.name) {
        const titleInput = document.createElement("input");
        titleInput.placeholder = "Todo Title";

        const descriptionInput = document.createElement("input");
        descriptionInput.placeholder = "Todo Description";

        const dueDateInput = document.createElement("input");
        dueDateInput.type = "date";
        dueDateInput.placeholder = "Due Date";

        const notesInput = document.createElement("input");
        notesInput.placeholder = "Notes";

        const priorityInput = document.createElement("select");
        ["low", "medium", "high"].forEach(priority => {
            const option = document.createElement("option");
            option.value = priority;
            option.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
            priorityInput.append(option);
        });

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.addEventListener("click", () => {
            onAddTodo(project.name, {
                title: titleInput.value,
                description: descriptionInput.value,
                dueDate: dueDateInput.value,
                notes: notesInput.value,
                priority: priorityInput.value
            });
        });

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click", () => onAddTodo(project.name, null));

        section.append(titleInput, descriptionInput, dueDateInput, notesInput, priorityInput, saveBtn, cancelBtn);
    } else {
        const addTodoBtn = document.createElement("button");
        addTodoBtn.textContent = "";
        addTodoBtn.id = "addTodo";
        addTodoBtn.addEventListener("click", () => onStartAddTodo(project.name));
        addTodoBtn.addEventListener("mouseenter", () => {
            addTodoBtn.title = "Add new todo";
        });
        btnContainer.append(addTodoBtn);
    }

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
        editProjectBtn.textContent = "";
        editProjectBtn.id = "editBtn";
        editProjectBtn.addEventListener("click", () => onEditProject(project.name));
        editProjectBtn.addEventListener("mouseenter", () => {
            editProjectBtn.title = "Edit project name";
        });

        const removeProjectBtn = document.createElement("button");
        removeProjectBtn.textContent = "";
        removeProjectBtn.id = "removeBtn";
        removeProjectBtn.addEventListener("mouseenter", () => {
            removeProjectBtn.title = "Remove entire project from list";
        });
        removeProjectBtn.addEventListener("click", () => {
            if (window.confirm(`Are you sure you want to remove the project "${project.name}"?`)) {
                todoList.removeProject(project.name);
                refresh();
            }
        });
        
        section.append(heading);
        btnContainer.append(editProjectBtn, removeProjectBtn);
    }

    const list = document.createElement("ul");
    project.todos.forEach(todo => {
        list.append(renderTodo(todo, project, todoList, refresh, editTodo, onEditTodo));
    });
    
    
    section.append(list, btnContainer);

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
        heading.textContent = `${todo.title} (${todo.priority})`;

        const editTodoBtn = document.createElement("button");
        editTodoBtn.id = "editTodoBtn";
        editTodoBtn.title = "Edit todo";
        editTodoBtn.textContent = "";
        editTodoBtn.addEventListener("click", () => onEditTodo(todo.id));

        const removeTodoBtn = document.createElement("button");
        removeTodoBtn.id = "removeTodoBtn";
        removeTodoBtn.title = "Remove todo";
        removeTodoBtn.textContent = "";
        removeTodoBtn.addEventListener("click", () => {
            if (window.confirm(`Are you sure you want to remove the todo "${todo.title}"?`)) {
                project.removeTodo(todo.id);
                refresh();
            }
        });

        li.append(heading, editTodoBtn, removeTodoBtn);
    }

    const completeBtn = document.createElement("button");
    completeBtn.id = "completeTodoBtn";
    completeBtn.title = "Complete todo";
    completeBtn.classList.toggle("completed", todo.completed);
    
        completeBtn.addEventListener("click", () => {  
            const completed = project.markTodoCompleted(todo.id);
            completeBtn.classList.toggle("completed", completed);
            refresh(); //re-render after changes are made
    });
        
        li.append(completeBtn);

        return li;
}