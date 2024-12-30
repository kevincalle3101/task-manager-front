import axios from 'axios'
import { ITask, ITaskCreateFormField, ITaskEditFormField } from '../types/tasks';

const API_URL = import.meta.env.VITE_URL;


export const getTasksService = async (state? : boolean) => {
    
    return await axios.get<{data:ITask[]}>(`${API_URL}?state=${state}`)
}

export const createTaskService = async (data: ITaskCreateFormField) => {
    
    return await axios.post<{data:ITask}>(`${API_URL}`, data)
}

export const editTaskService = async (taskId: string, data?: ITaskEditFormField) => {
    
    return await axios.patch<{data:ITask}>(`${API_URL}/${taskId}`, data)
}

export const deleteTaskService = async (taskId: string) => {
    
    return await axios.delete<void>(`${API_URL}/${taskId}`)
}
