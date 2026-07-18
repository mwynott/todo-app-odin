import {Todo} from "./todo.js";
import {Project} from "./project.js";

export const seedProjects = [
    new Project("Housekeeping", [
        new Todo("Clean garage", "before Sunday", "2026-07-20", "", "medium"),
        new Todo("Mow lawn", "before Saturday", "2026-07-19", "", "high"),
        new Todo("Wash dishes", "after dinner", "2026-07-18", "", "low"),
    ]),
    new Project("Work", [
        new Todo("Finish report", "due by Friday", "2026-07-21", "", "high"),
        new Todo("Email client", "send update", "2026-07-20", "", "medium"),
        new Todo("Prepare presentation", "for Monday meeting", "2026-07-19", "", "high"),
    ]),
    new Project("Personal", [
        new Todo("Read book", "finish by end of month", "2026-07-31", "", "low"),
        new Todo("Exercise", "3 times a week", "2026-07-31", "", "medium"),
        new Todo("Call family", "catch up with relatives", "2026-07-20", "", "high"),
    ]),
];