import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../shared/utils/api"

const endpoint = "/todos"

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
  isLoading: false,
}

export const loadTodosFromBackend = createAsyncThunk(
  "todoContainer/loadTodos",
  async (name, thunkAPI) => {
    // if (thunkAPI.getState().contactForm.questionAnsweredCorrectly) {
    //   return thunkAPI.rejectWithValue("answer is right")
    // }
    try {
      const resp = await api.get(`${endpoint}`)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong")
    }
  }
)

export const createATodo = createAsyncThunk(
  "todoContainer/createATodo",
  async (newTodoTitleAndBody: { title: string; body: string }, thunkAPI) => {
    const newTodo = { ...newTodoTitleAndBody, isComplete: false }

    try {
      const resp = await api.post(endpoint, newTodo)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong")
    }
  }
)

export const editTheTodo = createAsyncThunk(
  "todoContainer/editTheTodo",
  async (
    editedTodoIdAndNewTitleAndBody: {
      title: string
      body: string
      idOfTodoBeingEdited: number
    },
    thunkAPI
  ) => {
    const { idOfTodoBeingEdited } = editedTodoIdAndNewTitleAndBody
    const { title, body } = editedTodoIdAndNewTitleAndBody
    try {
      const resp = await api.patch(`${endpoint}/${idOfTodoBeingEdited}`, {
        title,
        body,
      })
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong")
    }
  }
)

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodosFromBackend.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loadTodosFromBackend.fulfilled, (state, action) => {
        state.isLoading = false
        state.todos = action.payload
      })
      .addCase(loadTodosFromBackend.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(createATodo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createATodo.fulfilled, (state, action) => {
        state.isLoading = false
        state.todos = [...state.todos, action.payload]
      })
      .addCase(createATodo.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(editTheTodo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editTheTodo.fulfilled, (state, action) => {
        state.isLoading = false

        state.todos = [...state.todos, action.payload]
      })
      .addCase(editTheTodo.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { completeTheTodo } = todoContainerSlice.actions

export default todoContainerSlice.reducer
