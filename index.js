const Addbtn=document.querySelector(".add-btn")
const TodoInput=document.querySelector(".TodoInput")
const todoList=document.querySelector(".todoList")
const showmodalBtn=document.querySelector(".showModal")
const Modal=document.querySelector(".Modal")
const Backdrop=document.querySelector(".Backdrop")
const filteroption=document.querySelector(".filter-todos")
const EditModal=document.querySelector(".EditModal")
const EditInput=document.querySelector(".EditInput")
const edit=document.querySelector(".edit")
const deletAll=document.querySelector(".deletAll")
filteroption.addEventListener("click",filterTodos)

//show todos on dom 
document.addEventListener("DOMContentLoaded",()=>{
    const savedtodos=localStorage.getItem("todos") ?
    JSON.parse(localStorage.getItem("todos")):
    [];
    savedtodos.forEach(element => {
        const todoDiv=document.createElement("div")
    todoDiv.classList.add("todo")
     const newtodo=`
             <li>${element}</li>
             <span><i class="fa-solid fa-trash"></i></span>
             
             <span><i class="fa-solid fa-check"></i></span>
             `
             // <span><i class="fa-solid fa-pen-to-square"></i></span>
 todoDiv.innerHTML=newtodo;
 todoList.appendChild(todoDiv);
        
    });
})
Backdrop.addEventListener("click",CloseModal)
//listener of trash &check
todoList.addEventListener("click",RemoveCheck)
showmodalBtn.addEventListener("click",()=>{
      Backdrop.style.display="block"
// Modal.style.display="block";
Modal.style.opacity="1"
})
//delet all
deletAll.addEventListener("click",(e)=>{
    todoList.remove();
    localStorage.clear();
    var newNode = document.createElement('ul');
    newNode.className = 'todoList';
  
  document.querySelector(".todo-container").appendChild(newNode)
    
    console.log(newNode);
// const ultag=document.createElement("ul")
// todoDiv.classList.add("todoList")
 
    
// document.querySelector(".todo-container").appendChild(ultag);
    
    
})

Addbtn.addEventListener("click",AddTodos)
// edit.addEventListener("click",EditTodo)
//functions
// function EditTodo(e){
//         // e.preventDefault()
//         // const parentel=e.target.parentElement.parentElement//div class=todo
//         // // const newliTag=document.createElement("li")
//         // // newliTag.textContent=EditInput.value
//         // parentel.innerHTML=`<li> ${EditInput.value}</li>
//         // <span><i class="fa-solid fa-trash"></i></span>
//         // <span><i class="fa-solid fa-pen-to-square"></i></span>
//         // <span><i class="fa-solid fa-check"></i></span>

//         // `
//         //close modal
//         EditModal.style.opacity="0"
//         // Backdrop.style.display="none"
        
    
// }
function filterTodos(e){
  
    const todos=[...todoList.childNodes]//children of ul tag
    // const child=[...todoList.children]
    // console.log(child);
     console.log(todos);
   
    
    todos.forEach(todo=>{
        switch (e.target.value) {
            case "all":
                todo.style.display="flex"
                
                break;
                case "completed":
                    if(todo.classList.contains("completed")){
                        todo.style.display="flex"
                    }
                    else{
                        todo.style.display="none"
                    }
                    break;
                    case "uncompleted":
                        if(!todo.classList.contains("completed")){
                            todo.style.display="flex"
                        }
                        else{
                            todo.style.display="none"
                        }
         

        

                break;
        }
    })

}
function RemoveCheck(e){
    e.preventDefault();
    
    const classlist=e.target.classList
    const parentitem=e.target.parentElement.parentElement
    const Arrayclasslist=[...classlist]
    console.log(Arrayclasslist);
                
                if(Arrayclasslist[1]=="fa-trash"){
                
                    parentitem.remove();  
                    RemovefromLocal(parentitem)//created div  );                                  
                }
    else if(Arrayclasslist[1]=="fa-check"){
        console.log(Arrayclasslist);
        parentitem.classList.toggle("completed")
    }
    // else if(Arrayclasslist[1]=="fa-pen-to-square"){
    //     console.log(e.target);
    //     console.log(parentitem.innerText);
    //     console.log(typeof(parentitem.innerText));
    //     EditModal.style.opacity="1"
    //     Backdrop.style.display="block"
    //     // EditInput.style.placeholder="edit"
       
       
    // }
    else {
        
        console.log("nothing");
    }
    
}
function RemovefromLocal(todo){
   
                
    const savedtodos=localStorage.getItem("todos")?
                    JSON.parse(localStorage.getItem("todos")) :[]

  let filteredtodos=   savedtodos.filter(t=>
                        t!=todo.children[0].innerText  ) 
                        // console.log(todo.children[0].innerText);
                        // console.log(filteredtodos);
   localStorage.setItem("todos",JSON.stringify(filteredtodos))
}


function AddTodos(e){
    e.preventDefault()
    const todoDiv=document.createElement("div")
   todoDiv.classList.add("todo")
    const newtodo=`
            <li>${TodoInput.value}</li>
            <span><i class="fa-solid fa-trash"></i></span>
           
            <span><i class="fa-solid fa-check"></i></span>
            `
            
todoDiv.innerHTML=newtodo;
todoList.appendChild(todoDiv);
AddtoLocalStorage(TodoInput.value);
TodoInput.value=" ";
}
function AddtoLocalStorage(todo){
    const savedtodos=localStorage.getItem("todos") ?
                    JSON.parse(localStorage.getItem("todos")):
                    [];
                    savedtodos.push(todo)
                    localStorage.setItem("todos",JSON.stringify(savedtodos))
                    // console.log(savedtodos);
}
function CloseModal(e){
    Modal.style.opacity="0";
    // EditModal.style.opacity="0"
    Backdrop.style.display="none";
}
