button=document.getElementById("add");
input=document.getElementById("input");
list=document.getElementById("task-list");


const tasks=[];
initialIndex=-1;

button.disabled=true;

 function render(){
    list.innerHTML='';

    tasks.forEach((task, index)=> {
        let newDiv=document.createElement('div');
    let delit=document.createElement('button');
    let edit=document.createElement('button')
     edit.classList.add('edit')
     edit.textContent='Edit'
        delit.classList.add('delet')
        newDiv.classList.add('task-div')
        delit.textContent="x";
        const newContent = document.createTextNode(task);
        newDiv.appendChild(newContent);
        newDiv.appendChild(edit)
        newDiv.appendChild(delit);
        list.appendChild(newDiv)
        delit.addEventListener('click', ()=>{
        deleteTask(index)
        })
        edit.addEventListener('click', ()=>{
            editTask(index)
            })
    });
    button.textContent='Add Task';
 }


function addTask(){
    console.log(initialIndex)
    const task=input.value.trim()
    
    if (initialIndex!==-1) {
        tasks[initialIndex]=task

    }else{
    tasks.push(task)
        button.disabled=true;
    }
    input.value="";
    render()
    initialIndex=-1;


}

function deleteTask(index){
    if (index !==-1) {
        tasks.splice(index,1)
    }
    render()
}



input.addEventListener('input',()=>{
    if (input.value == "") {
        button.disabled=true;
    }else {
        button.disabled=false;
    }
})



button.addEventListener('click',()=>{
    addTask()
})


function editTask(index){
    initialIndex=index
    input.value=tasks[index]
    button.textContent='Update Task';
}