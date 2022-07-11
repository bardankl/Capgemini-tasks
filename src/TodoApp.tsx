import { useRef, useState } from "react"
import TodoContainer from "./TodoContainer"
import TodoForm from "./TodoForm"

const TodoApp = () => {
  const initialState = {
    newTodoTitle: "",
    newTodoBody: "",
    todos: [
      {
        title:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet explicabo expedita, suscipit cum tempore molestias porro facilis dolorum rem, nulla quod enim qui inventore reprehenderit et aspernatur ratione eaque nam?",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, alias aperiam quia fugiat, enim vel omnis pariatur modi quo aut iste, officia totam ea adipisci earum natus. Rerum, saepe culpa?",
        id: 0,
        isComplete: false,
      },
    ],
    isTodoCardBeingEdited: false,
    idOfTodoBeingEdited: null,
  }

  const [state, setState] = useState(initialState)
  const changeState = (value, prop) => {
    setState({ ...state, [prop]: value })
  }

  const config = [
    {
      placeholderName: "Title",
      propName: "newTodoTitle",
      label: "Todo Title",
      classNameSuffix: "title",
    },
    {
      placeholderName: "Body",
      propName: "newTodoBody",
      label: "Todo Body",
      classNameSuffix: "body",
    },
  ]

  const submitForm = (e) => {
    e.preventDefault()

    if (state.isTodoCardBeingEdited) {
      setState({
        newTodoTitle: "",
        newTodoBody: "",
        todos: [
          ...state.todos.map((todo) =>
            todo.id === state.idOfTodoBeingEdited
              ? {
                  title: state.newTodoTitle,
                  body: state.newTodoBody,
                  id: todo.id,
                  isComplete: todo.isComplete,
                }
              : todo
          ),
        ],
        isTodoCardBeingEdited: false,
        idOfTodoBeingEdited: null,
      })
    } else {
      createTodo(e)
    }
  }

  const createTodo = (e) => {
    const todoTitle = e.target[0].value
    const todoBody = e.target[1].value
    const idForNewTodo = state.todos[state.todos.length - 1].id + 1
    setState({
      newTodoTitle: "",
      newTodoBody: "",
      todos: [
        ...state.todos,
        {
          title: todoTitle,
          body: todoBody,
          id: idForNewTodo,
          isComplete: false,
        },
      ],
      isTodoCardBeingEdited: false,
      idOfTodoBeingEdited: null,
    })
  }

  const startEditing = (todo) => {
    setState({
      newTodoTitle: todo.title,
      newTodoBody: todo.body,
      todos: [...state.todos],
      isTodoCardBeingEdited: true,
      idOfTodoBeingEdited: todo.id,
    })
  }

  const completeTodo = (idOfTodoToBeCompleted) => {
    setState({
      ...state,
      todos: [
        ...state.todos.map((todo) =>
          todo.id === idOfTodoToBeCompleted
            ? {
                ...todo,
                isComplete: true,
              }
            : todo
        ),
      ],
    })
  }
  return (
    <>
      <TodoForm
        newTodoValues={{
          newTodoTitle: state.newTodoTitle,
          newTodoBody: state.newTodoBody,
        }}
        config={config}
        changeState={changeState}
        onSubmit={submitForm}
        isTodoCardBeingEdited={state.isTodoCardBeingEdited}
      ></TodoForm>
      <TodoContainer
        todos={state.todos}
        startEditing={startEditing}
        completeTodo={completeTodo}
      ></TodoContainer>
    </>
  )
}
export default TodoApp
