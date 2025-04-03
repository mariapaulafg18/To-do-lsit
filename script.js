const button = document.getElementById("add");
const input = document.getElementById("input");
const list = document.getElementById("task-list");

const tasks = [];
const complete=[];

let initialIndex = -1;

button.disabled = true;

function render() {
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        let newDiv = document.createElement('div');
        let delit = document.createElement('button');
        let edit = document.createElement('button');
        let check = document.createElement('input');
        let taskText = document.createElement('span'); 
        check.type = 'checkbox';
        check.classList.add('checkbox');

        edit.classList.add('edit');
        edit.textContent = 'Edit';

        delit.classList.add('delet');
        newDiv.classList.add('task-div');
        delit.textContent = "x";

        taskText.textContent = task;
        taskText.classList.add('task-text'); 
        newDiv.appendChild(check);
        newDiv.appendChild(taskText);
        newDiv.appendChild(edit);
        newDiv.appendChild(delit);
        list.appendChild(newDiv);

        if (complete.includes(index)) {
            check.checked=true;
            taskText.style.textDecoration="line-through"
            taskText.style.color="gray";
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
                taskText.style.textDecoration = "line-through";
                taskText.style.color = "gray"; 
            } else {
                const i= complete.indexOf(index);
                if (i !== -1) {
                    complete.splice(i , 1);
                }
                taskText.style.textDecoration = "none";
                taskText.style.color = "black";
            }

        });
        button.textContent = 'Add Task';
            })} ;

    


function addTask() {
    const task = input.value.trim();

    if (task === "") return;

    if (initialIndex !== -1) {
        tasks[initialIndex] = task;
    } else {
        tasks.push(task);
        button.disabled = true;
    }

    input.value = "";
    render();
    initialIndex = -1;
}

function deleteTask(index) {
    if (index !== -1) {
        tasks.splice(index, 1);
    }
    render();
}

input.addEventListener('input', () => {
    button.disabled = input.value.trim() === "";
});

button.addEventListener('click', () => {
    addTask();
});

function editTask(index) {
    initialIndex = index;
    input.value = tasks[index];
    button.textContent = 'Update Task';
}
