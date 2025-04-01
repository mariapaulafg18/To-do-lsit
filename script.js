button=document.getElementById("add");
input=document.getElementById("input");
list=document.getElementById("task-list");


const tasks=[];

button.disabled=true;

 function render(){
    list.innerHTML='';

    tasks.forEach(task => {
        let newDiv=document.createElement('div');
    let delit=document.createElement('button');
        delit.classList.add('delet')
        newDiv.classList.add('task-div')
        delit.textContent="x";
        const newContent = document.createTextNode(task);
        newDiv.appendChild(newContent);
        newDiv.appendChild(delit);
        list.appendChild(newDiv)
        delit.addEventListener('click', ()=>{
        deleteTask()
        })
    });
    
 }


function addTask(){
    tasks.push(input.value)
        button.disabled=true;
        render()
        input.value="";
}

function deleteTask(id){
    const index=tasks.findIndex(task=> task.id=== id);

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
