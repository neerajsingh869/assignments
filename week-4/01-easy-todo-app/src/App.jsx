import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [todos, setTodos] = useState([])

  // const [newTodo, setNewTodo] = useState([]);
  function fetchAllTodos(){
    console.log("fetching...")
    fetch('http://localhost:3000/todos').then((response) => {
      response.json().then((data) => {
        setTodos(data);
      }).catch((err) => {
        console.error(err);
      })
    }).catch((err) => {
      console.error(err);
    })
  }
  function createNewTodo(event){
    console.log("Creating new todo");
    let todoTitleInput = document.querySelector('#title-input');
    let altMsg = null;
    if(!todoTitleInput.value){
      altMsg = "Title can't be empty. ";
    }
    // let todoCompletedInput = document.querySelector('#comp-input');
    let todoDescInput = document.querySelector('#desc-input');
    if(!todoDescInput.value){
      altMsg = (altMsg === null) ? "Description can't be empty. " : altMsg + "Description can't be empty. ";
    }
    if(altMsg){
      window.alert(altMsg);
    } 
    else{
      console.log("sending fetch post request");
      fetch('http://localhost:3000/todos', 
      {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: todoTitleInput.value,
            completed: false,
            description: todoDescInput.value
        })
      }).then((response) => {
        response.json().then(() => {
          fetchAllTodos();
        }).catch((err) => {
          console.error(err);
        })
      }).catch((err) => {
        console.error(err);
      })
    }
    console.log(todoTitleInput.value, todoDescInput.value);
  }
  function deleteTodo(id){
    let delURL = "http://localhost:3000/todos/" + id;
    fetch(delURL, {
      method:'DELETE'
    }).then(() => {
      fetchAllTodos()
      console.log("Deletion successful")
    }).catch((err) => {
      console.error(err);
    })
  }

  function markTodoComplete(id){
    let todoItemDiv = document.querySelectorAll('#todoItem-container');
    let todo = null;
    for(let todoItem of todoItemDiv){
      if(Number(todoItem.dataset.id) === id){
        todo = todoItem;
        break;
      }
    }
    console.log(todo);
    console.log(todo.children[1]);
    let compStatus = todo.children[0].children[0];
    console.log(compStatus);
    if(compStatus.checked){
      todo.children[1].style.textDecoration = 'line-through';
    }
    else{
      todo.children[1].style.textDecoration = '';
    }
  }
  useEffect(() => {
    fetchAllTodos();
  }, []);
  console.log("hello");
  return (
    <main>
      <div id="todoApp-container">
        <div id="todoApp-header">
          <p>TODO App</p>
        </div>
        <div id="form-todos-container">
          <CreateTodoForm createTodo={createNewTodo}/>
          <DisplayTodoItems todoState={todos} 
                            deleteTodo={deleteTodo} 
                            markTodoComplete={markTodoComplete}/>
        </div>
      </div>
    </main>
  )
}

function CreateTodoForm(props) {
  return (
    <form action="" id="form-container">
      <div>
        <div id="title-container">
          <label htmlFor="title-input">Title</label>
          <input type="text" id="title-input" placeholder="Write todo title" required/>
        </div>
        <div id="desc-container">
          <label htmlFor="desc-input">Description</label>
          <input type="text" id="desc-input" placeholder="Write todo description" required/>
        </div>
      </div>
      <button type="button" onClick={props.createTodo}>Add Todo</button>
    </form>
  );
}

function DisplayTodoItems(props) {
  return (
    <div className="scrollbar" id="todos-container">
      {props.todoState.map(todo => {
        return <TodoItem todo={todo} 
                         deleteTodo={props.deleteTodo} 
                         markTodoComplete={props.markTodoComplete}/>
      })}
    </div>
  );
}

function TodoItem(props) {
  return (
    <div id="todoItem-container" data-id={props.todo.id}>
      <div id="comp-input-container">
        <input type="checkbox" id="comp-input" onChange={() => props.markTodoComplete(props.todo.id)}/>
      </div>
      <div id="todoInfo-container">
        <div id="todoTitle-container">{props.todo.title}</div>
        <div id="todoDesc-container">{props.todo.description}</div>
      </div>
      <div id="delTodo-container">
        <i className="fa-solid fa-trash" onClick={() => props.deleteTodo(props.todo.id)}></i>
      </div>
    </div>
  );
}

export default App
