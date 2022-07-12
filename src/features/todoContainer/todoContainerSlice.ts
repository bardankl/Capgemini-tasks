import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  todos: [
    {
      title:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet explicabo expedita, suscipit cum tempore molestias porro facilis dolorum rem, nulla quod enim qui inventore reprehenderit et aspernatur ratione eaque nam?",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, alias aperiam quia fugiat, enim vel omnis pariatur modi quo aut iste, officia totam ea adipisci earum natus. Rerum, saepe culpa?",
      id: 0,
      isComplete: false,
    },
  ],
}

const todoContainerSlice = createSlice({
  name: "todoContainer",
  initialState,
  reducers: {
    completeTodo: (state, action) => {
      const idOfTodoToBeCompleted = action.payload.id
      state.todos = state.todos.map((todo) =>
        todo.id === idOfTodoToBeCompleted
          ? {
              ...todo,
              isComplete: true,
            }
          : todo
      )
    },
    createTodo: (state, action) => {
      const idForNewTodo = state.todos[state.todos.length - 1].id + 1
      state.todos = [
        ...state.todos,
        {
          title: action.payload.newTodoTitle,
          body: action.payload.newTodoBody,
          id: idForNewTodo,
          isComplete: false,
        },
      ]
    },
    editTodo: (state, action) => {
      state.todos = [
        ...state.todos.map((todo) =>
          todo.id === action.payload.idOfTodoBeingEdited
            ? {
                title: action.payload.newTodoTitle,
                body: action.payload.newTodoBody,
                id: todo.id,
                isComplete: todo.isComplete,
              }
            : todo
        ),
      ]
    },
  },
})

export const { completeTodo, createTodo, editTodo } = todoContainerSlice.actions

export default todoContainerSlice.reducer
