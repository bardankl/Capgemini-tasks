import { configureStore } from "@reduxjs/toolkit"
import todoFormReducer from "./features/todoForm/todoFormSlice"
import todoContainerReducer from "./features/todoContainer/todoContainerSlice"

export const store = configureStore({
  reducer: {
    todoForm: todoFormReducer,
    todoContainer: todoContainerReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {todoForm: todoFormState,  todoContainer: todoContainerState,}
export type AppDispatch = typeof store.dispatch
