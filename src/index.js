import {Todo} from "./todo.js";


const t1 = new Todo("Clean garage", "before Sunday", "2026-07-20", "", "medium");
console.log(t1); // prints full object for logic test purposes

try {
  new Todo("", "desc", "2026-07-20");
} catch (e) {
  console.log(e.message); //test to see if error gets thrown for empty title
}
