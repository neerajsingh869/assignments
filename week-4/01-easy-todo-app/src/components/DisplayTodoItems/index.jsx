import TodoItem from "../TodoItem/index.jsx"
import "../TodoItem/index.css"

export default function DisplayTodoItems(props) {
    return (
      <div className="scrollbar dis-flex flexd-col ai-center" id="todos-container">
        {props.todoState.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              deleteTodo={props.deleteTodo}
              markTodoComplete={props.markTodoComplete}
            />
          );
        })}
      </div>
    );
  }