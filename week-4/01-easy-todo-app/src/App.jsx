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
  function createNewTodo(){
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

  function updateTodoStatusAndDom(id){
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

  return (
    <main>
      <div id="todoApp-container">
        <div id="todoApp-header">
          <p>TODO App</p>
        </div>
        <div id="form-todos-container">
          <form action="" id="form-container">
            <div>
              <div id="title-container">
                <label htmlFor="title-input">Title</label>
                <input type="text" id="title-input" placeholder="Write todo title"/>
              </div>
              <div id="desc-container">
                <label htmlFor="desc-input">Description</label>
                <input type="text" id="desc-input" placeholder="Write todo description"/>
              </div>
            </div>
            <button type="button" onClick={createNewTodo}>Add Todo</button>
          </form>
          <div id="todos-container">
            {todos.map(todo => {
              return <div id="todoItem-container" data-id={todo.id}>
                <div id="comp-input-container">
                  <input type="checkbox" id="comp-input" onChange={() => updateTodoStatusAndDom(todo.id)}/>
                </div>
                <div id="todoInfo-container">
                  <div id="todoTitle-container">{todo.title}</div>
                  <div id="todoDesc-container">{todo.description}</div>
                </div>
                <div id="delTodo-container">
                  <i className="fa-solid fa-trash" onClick={() => deleteTodo(todo.id)}></i>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
      {/* <h1>Easy Todo App</h1>
      <hr />
      <main>
        <FormComponent newTodoState={newTodo} createNewTodo={createNewTodo}></FormComponent>
        <FetchComponent todoState={todos} fetchAllTodos={fetchAllTodos} deleteTodo={deleteTodo}></FetchComponent>
      </main> */}
    </main>
  )
}

function FormComponent(props){
  return (
    <div id="form-comp-area">
      <form action="">
        <label htmlFor="title-input">Title</label>
        <input type="text" id="title-input" />
        <label htmlFor="comp-input">Completed?</label>
        <input type="checkbox" id="comp-input"/>
        <label htmlFor="desc-input">Description</label>
        <input type="text" id="desc-input" />
        <button id="post-todo" type="button" onClick={props.createNewTodo}>Create Todo</button>
      </form>
      <div id="res-area">
        {JSON.stringify(props.newTodoState)}
      </div> 
    </div>
  );
}

function FetchComponent(props){
  return (
    <div id="fetch-comp-area">
      <div id="todoArea">
          {props.todoState.map(todo => {
            return <Todo deleteTodo={props.deleteTodo} key={todo.id} id={todo.id} title={todo.title} description={todo.description}></Todo>
          })}
      </div>
      <button id="get-todo" type="button" onClick={props.fetchAllTodos}>Fetch toDo</button>
    </div>
  );
}

function Todo(props) {
    
    // Add a delete button here so user can delete a TODO.
    return (
      <div id={props.id}>
          {props.title}
          &nbsp;||&nbsp;
          {props.description}
          &nbsp;||&nbsp;
          <button onClick={() => props.deleteTodo(props.id)}>Delete</button>
      </div>
    );
}

export default App
