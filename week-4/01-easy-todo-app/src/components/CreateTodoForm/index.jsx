export default function CreateTodoForm(props) {
    return (
      <form action="" id="form-container" className="dis-flex flexd-col jc-around ai-center">
        <div className="dis-flex jc-between">
          <div className="dis-flex flexd-col" id="title-container">
            <label htmlFor="title-input">Title</label>
            <input
              type="text"
              id="title-input"
              placeholder="Write todo title"
              required
            />
          </div>
          <div className="dis-flex flexd-col" id="desc-container">
            <label htmlFor="desc-input">Description</label>
            <input
              type="text"
              id="desc-input"
              placeholder="Write todo description"
              required
            />
          </div>
        </div>
        <button type="button" onClick={props.createTodo}>
          Add Todo
        </button>
      </form>
    );
  }