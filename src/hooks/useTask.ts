import { useTaskState } from "./useTaskState"
import { EFilterType } from "../enums"
import { createTaskService, deleteTaskService, editTaskService, getTasksService } from "../services/tasks"
import { ITask, ITaskCreateFormField, ITaskEditFormField } from "../types/tasks"
import getErrorFromError from "../utils/get-errors"



interface ITaskFunctions {
    getTasks  : (state?: boolean) => void,
    createTask: (params: ITaskCreateFormField) => void,
    updateTask: (taskId: string, params?: ITaskEditFormField, filter?: EFilterType) => void,
    deleteTask: (taskId: string) => void 
}

export const useTasks: () => ITaskFunctions = () => {

    const { tasks, setTasks } = useTaskState()

    const getTasks = async (state?: boolean): Promise<void> => {
        try {
            const { data: { data } } = await getTasksService(state)
            setTasks( data )
        } catch (error) {
            const { message } = getErrorFromError(error)
            alert(message);
        }
    }

    const createTask = async (params: ITaskCreateFormField): Promise<void> => {
        try {
            const { data: { data } } = await createTaskService(params)
            setTasks([ ...tasks, data ])
        } catch (error) {
            const { message } = getErrorFromError(error)
            alert(message);
        }
    }

    const updateTask = async (taskId: string, params?: ITaskEditFormField, filter?: EFilterType): Promise<void> => {
        try {            
            const { data: { data } } = await editTaskService(taskId, params)

            if (filter && filter !== EFilterType.All) {
                const newTasks = tasks.filter((task: ITask) => data._id !== task._id)
                setTasks(newTasks);
            } else {
                const updatedTasks = tasks.map((task: ITask) =>
                    task._id === data._id ? data : task
                );
                setTasks(updatedTasks);
            }
        } catch (error) {
            const { message } = getErrorFromError(error)
            alert(message);
        }
    }

    const deleteTask = async (taskId: string) => {
        try {
          await deleteTaskService(taskId)
          setTasks(tasks.filter((task: ITask) => task._id !== taskId))
        } catch (error) {
            const { message } = getErrorFromError(error)
            alert(message);
        }
      }


    return {
        getTasks,
        createTask,
        updateTask,
        deleteTask
    }
}