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
  },
})

export const { completeTodo } = todoContainerSlice.actions

export default todoContainerSlice.reducer
