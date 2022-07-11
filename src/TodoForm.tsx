const TodoForm = ({
  newTodoValues,
  config,
  changeState,
  onSubmit,
  isTodoCardBeingEdited,
}) => {
  return (
    <header>
      <form action='' className='create-todo-form' onSubmit={onSubmit}>
        {config.map((input, index) => (
          <div key={index}>
            <label htmlFor={`todo-${input.classNameSuffix}`}>
              {input.label}
            </label>
            <input
              type='text'
              name={`todo-${input.classNameSuffix}`}
              id={`todo-${input.classNameSuffix}`}
              value={newTodoValues[input.propName]}
              onChange={(e) => changeState(e.target.value, input.propName)}
              placeholder={input.placeholder}
              required
            />
          </div>
        ))}
        <button>{isTodoCardBeingEdited ? "Save todo" : "Create todo"}</button>
      </form>
    </header>
  )
}
export default TodoForm
