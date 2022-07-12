import { useRef, useState } from "react"
import TodoContainer from "./components/TodoContainer"
import TodoForm from "./components/TodoForm"
import { useAppSelector } from "./hooks"

const TodoApp = () => {
  const {
    newTodoTitle,
    newTodoBody,
    isTodoCardBeingEdited,
    idOfTodoBeingEdited,
  } = useAppSelector((state) => state.todoForm)
  // const initialState = {
  //   newTodoTitle: "",
  //   newTodoBody: "",
  // todos: [
  //   {
  //     title:
  //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet explicabo expedita, suscipit cum tempore molestias porro facilis dolorum rem, nulla quod enim qui inventore reprehenderit et aspernatur ratione eaque nam?",
  //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, alias aperiam quia fugiat, enim vel omnis pariatur modi quo aut iste, officia totam ea adipisci earum natus. Rerum, saepe culpa?",
  //     id: 0,
  //     isComplete: false,
  //   },
  // ],
  //   isTodoCardBeingEdited: false,
  //   idOfTodoBeingEdited: null as number | null,
  // }

  // const [state, setState] = useState(initialState)
  const titleInputRef = useRef<HTMLInputElement>(null)
  // const changeState = (value: string | boolean | number, prop: string) => {
  //   setState({ ...state, [prop]: value })
  // }

  const config = [
    {
      placeholderName: "Title",
      propName: "newTodoTitle",
      label: "Todo Title",
      classNameSuffix: "title",
      reduxActionName: "",
    },
    {
      placeholderName: "Body",
      propName: "newTodoBody",
      label: "Todo Body",
      classNameSuffix: "body",
      reduxActionName: "",
    },
  ]

  const submitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
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

  const createTodo = (e: React.ChangeEvent<HTMLFormElement>) => {
    const todoTitleInput = e.target[0] as HTMLInputElement
    const todoBodyInput = e.target[1] as HTMLInputElement
    const todoTitle = todoTitleInput.value
    const todoBody = todoBodyInput.value
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

  // const startEditing = (todo: { title: string; body: string; id: number }) => {
  //   focusTitleInput()
  //   setState({
  //     newTodoTitle: todo.title,
  //     newTodoBody: todo.body,
  //     todos: [...state.todos],
  //     isTodoCardBeingEdited: true,
  //     idOfTodoBeingEdited: todo.id,
  //   })
  // }

  const focusTitleInput = () => {
    titleInputRef.current?.focus()
    // titleInputRef.current!.focus()
  }

  // const completeTodo = (idOfTodoToBeCompleted: number) => {
  //   setState({
  //     ...state,
  //     todos: [
  //       ...state.todos.map((todo) =>
  //         todo.id === idOfTodoToBeCompleted
  //           ? {
  //               ...todo,
  //               isComplete: true,
  //             }
  //           : todo
  //       ),
  //     ],
  //   })
  // }

  return (
    <>
      <TodoForm
        ref={titleInputRef}
        newTodoValues={{
          newTodoTitle: state.newTodoTitle,
          newTodoBody: state.newTodoBody,
        }}
        config={config}
        // changeState={changeState}
        onSubmit={submitForm}
        isTodoCardBeingEdited={state.isTodoCardBeingEdited}
      ></TodoForm>
      <TodoContainer
      // todos={state.todos}
      // startEditing={startEditing}
      // completeTodo={completeTodo}
      ></TodoContainer>
    </>
  )
}
export default TodoApp
