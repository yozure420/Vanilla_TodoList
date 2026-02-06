const date = document.getElementById('date');
const todo = document.getElementById('todo');
const place = document.getElementById('place');
const line = document.getElementById('line');
const btn = document.getElementById('btn');
const tb = document.getElementById('tbody');
const deleteAll = document.getElementById('deleteBtn');

const saveTodos = (todos)=> {
    localStorage.setItem('todos', JSON.stringify(todos));
};
const loadTodos = ()=> {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
};
const deleteTodos = (todos)=> {
    localStorage.removeItem('todos');
};
const deleteAllTodos = ()=> {
    localStorage.clear();
    location.reload();
};

const addTodoToTable = (todoData) => {
    const tr = document.createElement('tr');
    const tdDate = document.createElement('td');
    const tdTodo = document.createElement('td');
    const tdPlace = document.createElement('td');
    const tdLine = document.createElement('td');
    const tdComplete = document.createElement('td');
    const checkbox = document.createElement('input');
    const tb = document.getElementById('tbody')

    checkbox.type = 'checkbox';
    tdComplete.appendChild(checkbox);

    tdDate.textContent = todoData.date;
    tdTodo.textContent = todoData.todo;
    tdPlace.textContent = todoData.place;
    tdLine.textContent = todoData.line;

    tb.appendChild(tr);
    tr.appendChild(tdDate);
    tr.appendChild(tdTodo);
    tr.appendChild(tdPlace);
    tr.appendChild(tdLine);
    tr.appendChild(tdComplete);

    tr.dataset.id = todoData.id;
};

const renderTodos = () => {
    tb.innerHTML = '';
    const todos = loadTodos();
    todos.forEach(todoData => {
        addTodoToTable(todoData);
    });
};

renderTodos();

btn.addEventListener('click', () => {
    if (!date.value || !todo.value) {
        alert('日付とTodoは必須です');
        return;
    }

    const newTodo = {
        id: Date.now(),
        date: date.value,
        todo: todo.value,
        place: place.value,
        line: line.value
    };

    const todos = loadTodos();
    todos.push(newTodo);
    saveTodos(todos);
    
    addTodoToTable(newTodo);

    date.value = '';
    todo.value = '';
    place.value = '';
    line.value = '';
});
const completeBtn = document.getElementById('completeBtn');
completeBtn.addEventListener('click', () => {
    const rows = tb.querySelectorAll('tr');
    const todos = loadTodos();
    const remainingTodos = [];

    rows.forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        const rowId = row.dataset.id;
        
        if (!checkbox.checked) {
            const todo = todos.find(t => t.id == rowId);
            if (todo) {
                remainingTodos.push(todo);
            }
        }
    });

    saveTodos(remainingTodos);
    renderTodos();
});

const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', () => {
    if (confirm('本当に全部消しますか？')) {
        deleteAllTodos();
        renderTodos();
    }
});

deleteAll.addEventListener('click', ()=> {
    deleteAllTodos();
});