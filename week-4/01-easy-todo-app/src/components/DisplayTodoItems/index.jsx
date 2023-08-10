function TodoItem(props) {
  return (
    <div id="todoItem-container" data-id={props.todo.id}>
      <div className="ele-center" id="comp-input-container">
        <input
          type="checkbox"
          id="comp-input"
          onChange={() => props.markTodoComplete(props.todo.id)}
        />
      </div>
      <div id="todoInfo-container">
        <div id="todoTitle-container">{props.todo.title}</div>
        <div id="todoDesc-container">{props.todo.description}</div>
      </div>
      <div className="ele-center" id="delTodo-container">
        <i
          className="fa-solid fa-trash fa-lg"
          onClick={() => props.deleteTodo(props.todo.id)}
        ></i>
      </div>
    </div>
  );
}

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