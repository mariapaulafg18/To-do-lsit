const button = document.getElementById("add");
const input = document.getElementById("input");
const list = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let complete = JSON.parse(localStorage.getItem('complete')) || [];

let initialIndex = -1;
button.disabled = true;

render();

function render() {
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const newDiv = document.createElement('div');
        const delit = document.createElement('button');
        const edit = document.createElement('button');
        const check = document.createElement('input');
        const taskText = document.createElement('span');

        check.type = 'checkbox';
        check.classList.add('checkbox');

        edit.classList.add('edit');
        edit.textContent = 'Edit';
        delit.classList.add('delet');
        delit.textContent = "x";
        taskText.textContent = task;
        taskText.classList.add('task-text');
        newDiv.classList.add('task-div');

        newDiv.appendChild(check);
        newDiv.appendChild(taskText);
        newDiv.appendChild(edit);
        newDiv.appendChild(delit);
        list.appendChild(newDiv);

        if (complete.includes(index)) {
            check.checked = true;
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
            newDiv.style.background = 'lightgray';
        }

        delit.addEventListener('click', () => {
            deleteTask(index);
        });

        edit.addEventListener('click', () => {
            editTask(index);
        });

        check.addEventListener('change', () => {
            if (check.checked) {
                if (!complete.includes(index)) {
                    complete.push(index);
                }
            } else {
                complete = complete.filter(i => i !== index);
            }
            saveTasks();
            render();
        });
    });

    button.textContent = 'Add Task';
}

function addTask() {
    const task = input.value.trim();
    if (task === "") return;

    if (initialIndex !== -1) {
        tasks[initialIndex] = task;
    } else {
        tasks.push(task);
    }

    input.value = "";
    initialIndex = -1;
    button.disabled = true;

    saveTasks();
    render();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('complete', JSON.stringify(complete));
}

function deleteTask(index) {
    console.log(tasks)
    tasks.splice(index, 1);
    console.log(tasks)
    complete = complete.filter(i => i !== index).map(i => i > index ? i - 1 : i); 
    saveTasks();
    render();
}

function editTask(index) {
    initialIndex = index;
    input.value = tasks[index];
    button.textContent = 'Update Task';
}

input.addEventListener('input', () => {
    button.disabled = input.value.trim() === "";
});

button.addEventListener('click', () => {
    addTask();
});
