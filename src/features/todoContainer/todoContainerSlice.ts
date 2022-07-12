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
    completeTheTodo: (state, action) => {
      const idOfTodoToBeCompleted = action.payload.id
      // mapping over todos in search for the one that is to be completed
      state.todos = state.todos.map((todo) =>
        todo.id === idOfTodoToBeCompleted
          ? {
              ...todo,
              isComplete: true, // setting the completed todo's "isComplete" flag's value to true, so that when TodoCard component is displayed it gets "todo-card--complete" className and its background is set to green
            }
          : todo
      )
    },
    createATodo: (state, action) => {
      const idForNewTodo = state.todos[state.todos.length - 1].id + 1 // setting idForNewTodo as that of the last todo + 1
      state.todos = [
        ...state.todos, // leaving todos as they were
        //and adding a new one to the end
        {
          title: action.payload.newTodoTitle,
          body: action.payload.newTodoBody,
          id: idForNewTodo,
          isComplete: false,
        },
      ]
    },
    editTheTodo: (state, action) => {
      // setting new state.todos
      state.todos = [
        // mapping over todos in search for the one that is to be edited
        ...state.todos.map(
          (todo) =>
            todo.id === action.payload.idOfTodoBeingEdited
              ? //setting a new one in place, leaving the "id" and "isComplete" properties as they were
                {
                  title: action.payload.newTodoTitle,
                  body: action.payload.newTodoBody,
                  id: todo.id,
                  isComplete: todo.isComplete,
                }
              : todo // for the rest of the todos we return them back as they were
        ),
      ]
    },
  },
})

export const { completeTheTodo, createATodo, editTheTodo } =
  todoContainerSlice.actions

export default todoContainerSlice.reducer
