## TODO SIMPLE CODE USING JS
```javascript
let ctr = 1;

    function deleteTodo(index) {
      const element = document.getElementById("todo-" + index);
      if (element) {
        element.parentNode.removeChild(element);
      }
    }

    function addTodo() {
      const inpEl = document.querySelector("input");
      const todoText = inpEl.value.trim();

      if (todoText === '') {
        return;
      }

      const newDivEl = document.createElement('div');
      newDivEl.setAttribute("id", "todo-" + ctr);
      newDivEl.classList.add('todo-item');
      newDivEl.innerHTML = todoText + 
        `<button onclick="deleteTodo(${ctr})">Delete</button>`;

      document.getElementById("todo-list").appendChild(newDivEl);
      ctr += 1;

      inpEl.value = '';
    }

  ````
