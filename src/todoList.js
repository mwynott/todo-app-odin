export class TodoList {
    constructor(name, projects = []) {
        this.name = name;
        this.projects = projects;
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(project) {
        const index = this.projects.indexOf(project);
        if (index > -1) {
            this.projects.splice(index, 1);
        }
    }

    findProject(name) {
        return this.projects.find(project => project.name === name);
    }
    
    sortProjects() {
        this.projects.sort((a, b) => a.name.localeCompare(b.name));
        }
}