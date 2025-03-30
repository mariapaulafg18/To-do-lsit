button=document.getElementById("add");
input=document.getElementById("input");



const tasks=[];



function addTask(){
    tasks.push(input.value)
    input.value="";
}





button.addEventListener('click',()=>{
    addTask()
    // for (let index = 0; index < tasks.length; index++) {
    //     console.log(tasks[index])
        
    // }
})