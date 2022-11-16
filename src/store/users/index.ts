import {createSlice} from "@reduxjs/toolkit";
import {User} from "../../types/user";

interface UserState {
  data: User[]
  isLoading: boolean,
  error?: string
}

const initialState: UserState = {
  data: [],
  isLoading: false,
  error: undefined
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
     state.data = action.payload
    },
    deleteUser: (state, action) => {
      state.data = [...state.data.filter(i => i.id !== action.payload)]
    },
    startLoading: (state) => {
      state.isLoading = true
    },
    finishLoading: (state) => {
      state.isLoading = false
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { setUsers, deleteUser, startLoading, finishLoading, setError } = usersSlice.actions

export default usersSlice.reducer
