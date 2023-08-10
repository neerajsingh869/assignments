import { useState, useEffect } from "react";
import axios from "axios";
import DisplayTodoItems from "./components/DisplayTodoItems/index.jsx";
import TodoForm from "./components/CreateTodoForm/index.jsx";
import "./App.css";
import "./components/CreateTodoForm/index.css"
import "./components/DisplayTodoItems/index.css"

/**
  * Returns alert message if any input field left empty.
  *
  * @param {string} todoTitle Form label "Title" input.
  * @param {string} todoDesc From label "Description" input.
  * @return {string} alert message if any input field left empty.
  */
function getAlertMsg(todoTitle, todoDesc) {
  let altMsg = null;
  if (!todoTitle) {
    altMsg = "Title can't be empty. ";
  }
  if (!todoDesc) {
    altMsg =
      altMsg === null
        ? "Description can't be empty. "
        : altMsg + "Description can't be empty. ";
  }
  return altMsg;
}

function markTodoComplete(id) {
  let todoItemDiv = document.querySelectorAll("#todoItem-container");
  let todo = null;
  for (let todoItem of todoItemDiv) {
    if (Number(todoItem.dataset.id) === id) {
      todo = todoItem;
      break;
    }
  }
  // get checkbox input value
  let compStatus = todo.children[0].children[0];
  if (compStatus.checked) {
    todo.children[1].style.textDecoration = "line-through";
  } else {
    todo.children[1].style.textDecoration = "";
  }
}

function App() {
  // state variable for todo lists
  const [todos, setTodos] = useState([]);

  async function fetchAllTodos() {
    try {
      let response = await axios.get("http://localhost:3000/todos");
      setTodos(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function createNewTodo() {
    let todoTitleInput = document.querySelector("#title-input");
    let todoDescInput = document.querySelector("#desc-input");

    let altMsg = getAlertMsg(todoTitleInput.value, todoDescInput.value);

    if (altMsg) {
      window.alert(altMsg);
    } else {
      try {
        await axios.post("http://localhost:3000/todos", {
          title: todoTitleInput.value,
          completed: false,
          description: todoDescInput.value,
        });
        fetchAllTodos();   
      } catch (err) {
        console.error(err);
      }
    }
  }

  async function deleteTodo(id) {
    let delURL = "http://localhost:3000/todos/" + id;
    try {
      await axios.delete(delURL);
      fetchAllTodos();
    } catch (err) {
      console.error(err);
    }
  }
  
  // on page load, call service to fetch all todos
  useEffect(() => {
    fetchAllTodos();
  }, []);
  
  return (
    <main className="ele-center">
      <div id="todoApp-container">
        <div className="ele-center" id="todoApp-header">
          <p>TODO App</p>
        </div>
        <div className="dis-flex flexd-col ai-center" id="form-todos-container">
          <TodoForm createTodo={createNewTodo} />
          <DisplayTodoItems
            todoState={todos}
            deleteTodo={deleteTodo}
            markTodoComplete={markTodoComplete}
          />
        </div>
      </div>
    </main>
  );
}

export default App;