window.setInterval(() => {
    let todos = [];
    for(let i = 0; i<Math.floor(Math.random()*100); i++){
        todos.push({
            title: 'Go to gym',
            discription:'Gym from 7-9 pm',
            id: i+1
        });
    }
    updateDom(todos);
}, 5000)

let mainArea = document.querySelector('#mainArea');

function updateDom(todos){
    mainArea.innerHTML = '';
    for(let todo of todos){
        let childDiv = document.createElement('div');
        childDiv.dataset.id = todo.id;
        let titleSpan = document.createElement('span');
        titleSpan.innerHTML = todo.title;
        let descSpan = document.createElement('span');
        descSpan.innerHTML = todo.discription;
        let delBtn = document.createElement('button');
        delBtn.setAttribute('onclick', 'deleteTodo(' + todo.id + ')');
        delBtn.innerHTML = 'Delete';
        childDiv.append(titleSpan, descSpan, delBtn);
        mainArea.append(childDiv);
    }
}

function deleteTodo(id){
    let children = Array.from(mainArea.children);
    for(let child of children){
        if(parseInt(child.dataset.id) === id){
            mainArea.removeChild(child);
            break;
        }
    }
}