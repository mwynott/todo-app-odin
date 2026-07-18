export class TodoList {
    constructor(name, projects = []) {
        this.name = name;
        this.projects = projects;
    }

    addProject(project) {
        if (this.findProject(project.name)) {
            throw new Error(`Project with name "${project.name}" already exists!`);
        }
        this.projects.push(project);
    }

    removeProject(name) {
        const index = this.projects.findIndex(project => project.name === name);
        if (index > -1) {
            this.projects.splice(index, 1);
        }
    }

    findProject(name) {
        return this.projects.find(p => p.name.toLowerCase() === name.toLowerCase());
    }
    
    sortProjects() {
        this.projects.sort((a, b) => a.name.localeCompare(b.name));
        }
}