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
}, 8000)

let mainArea = document.querySelector('#mainArea');

function updateDom(todos){
    let currentChildren = Array.from(mainArea.children);
    let added = 0, removed = 0, updated = 0;
    todos.forEach(todo => {
        let existingChild = currentChildren.find(child => parseInt(child.dataset.id) === todo.id);
        // Todo already presents, so update it (Updation process)
        if(existingChild){
            updated++;
            existingChild.children[0].innerHTML = todo.id + " || " + todo.title + " || ";
            existingChild.children[1].innerHTML = todo.discription + " || ";
            // After updation, remove that child. So, that it contains only
            // those child which need to be removed when complete process
            // of updation and addition is finished
            currentChildren = currentChildren.filter((child) => {return child !== existingChild});
        }
        // Todo doesn't present, so add it (Adition process)
        else{
            added++;
            let childDiv = document.createElement('div');
            childDiv.dataset.id = todo.id;
            let titleSpanBody = todo.id + " || " + todo.title + " || ";
            let descSpanBody = todo.discription + " || ";
            childDiv.innerHTML = `<span>${titleSpanBody}</span>
                                    <span>${descSpanBody}</span>
                                    <button onclick="deleteTodo(${todo.id})">Delete</button>`;
            // childDiv.innerHTML = "<span>" + titleSpanBody + "</span><span>" + descSpanBody + "</span>" +
            //                         "<button onclick=deleteTodo(" + todo.id + ")>Delete</button>";
            mainArea.append(childDiv);
        }
    })
    // Remove all unwanted children (Removal process)
    currentChildren.forEach(child => {
        removed++;
        mainArea.removeChild(child);
    })
    console.log(`Added - ${added}, Updated - ${updated}, and Removed - ${removed}`);
}

function deleteTodo(id){
    let childToRemove = Array.from(mainArea.children).find(child => parseInt(child.dataset.id) === id);
    if(childToRemove){
        mainArea.removeChild(childToRemove);
    }
    else{
        console.error("Button not working");
    }
}