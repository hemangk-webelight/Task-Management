import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_TASK_URL, HEADER } from '../constants'

const initialState = {
    tasks: []
}

export const getTasksData = createAsyncThunk('task/getTasksData', async() => {
    
    const response = await axios.get(`${BASE_TASK_URL}`, HEADER)
    const data = await response

    return data.data
})

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers:  (builder) => {

        builder.addCase(getTasksData.fulfilled, (state, {payload}) => {

            state.tasks = payload

        })
    }
})

export default taskSlice.reducer