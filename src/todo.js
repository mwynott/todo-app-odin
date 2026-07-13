export class Todo {
    constructor(title, description, dueDate, notes, priority, completed = false) {
        this.validateTitle(title);
        this.validateDescription(description);
        this.validateDueDate(dueDate);
        this.validatePriority(priority);

        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.notes = notes;
        this.priority = priority;
        this.completed = completed;
    }


    validateTitle(title) {
        if (typeof title !== "string" || title.trim() === "") {
            throw new Error("Title cannot be empty!");
        }
    }

    validateDescription(description) {
        if (typeof description !== "string" || description.trim() === "") {
            throw new Error("Description cannot be empty!");
        }
    }

    validateDueDate(dueDate) {
        const date = new Date(dueDate);
        if (isNaN(date.getTime())) {
            throw new Error("Due date must be either MM/DD/YYYY or YYYY-MM-DD format!");
        }
    }

    validatePriority(priority) {
        const validPriorities = ["low", "medium", "high"];
        if (!validPriorities.includes(priority)) {
            throw new Error("Priority must be either 'low', 'medium', or 'high'!");
        }
    }
}

