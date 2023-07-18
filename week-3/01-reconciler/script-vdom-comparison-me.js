window.setInterval(() => {
    let todos = [];
    for(let i = 0; i<Math.floor(Math.random()*100); i++){
        todos.push({
            title: 'Go to gym',
            description:'Gym from 7-9 pm',
            id: i+1
        });
    }
    updateVirtualDom(todos);
}, 8000)

let mainArea = document.querySelector('#mainArea');
let vDom = [];

function updateVirtualDom(todos){
    let existingVDom = [...vDom];
    vDom = todos.map(todo => {
        return {
            id : todo.id,
            title: todo.title,
            description: todo.description
        }
    })
    updateDom(existingVDom, vDom);
}

function updateDom(existingVDom, currentVDom){
    let added = 0, removed = 0, updated = 0;
    currentVDom.forEach(todo => {
        let existingVChild = existingVDom.find(child => child.id === todo.id);
        // Todo already presents, so update it (Updation process)
        if(existingVChild){
            updated++;
            let existingChild = document.querySelector(`[data-id='${todo.id}']`);
            existingChild.children[0].innerHTML = todo.id + " || " + todo.title + " || ";
            existingChild.children[1].innerHTML = todo.description + " || ";
        }
        // Todo doesn't present, so add it (Adition process)
        else{
            added++;
            let childDiv = document.createElement('div');
            childDiv.dataset.id = todo.id;
            let titleSpanBody = todo.id + " || " + todo.title + " || ";
            let descSpanBody = todo.description + " || ";
            childDiv.innerHTML = `<span>${titleSpanBody}</span>
                                    <span>${descSpanBody}</span>
                                    <button onclick="deleteTodo(${todo.id})">Delete</button>`;
            mainArea.append(childDiv);
        }
    })
    // Remove all unwanted children (Removal process)
    existingVDom.forEach(child => {
        if(!currentVDom.find(childCurr => childCurr.id === child.id)){
            removed++;
            let childToRemove = document.querySelector(`[data-id='${child.id}']`);
            mainArea.removeChild(childToRemove);
        }
    })
    console.log(`Added - ${added}, Updated - ${updated}, and Removed - ${removed}`);
}

function deleteTodo(id){
    let childExists = vDom.find(child => child.id === id);
    if(childExists){
        let childToRemove = document.querySelector(`[data-id='${id}']`);
        mainArea.removeChild(childToRemove);
        vDom = vDom.filter(child => child.id !== id);
    }
    else{
        console.error("Button not working");
    }
}