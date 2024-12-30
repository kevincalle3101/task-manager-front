import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IoIosCloseCircle } from "react-icons/io";
import * as yup from 'yup'

import { TopNav } from "../../components/TopNav"
import { useTaskState } from "../../hooks/useTaskState"
import { ITaskFormField } from "../../types/tasks";
import { useLocation } from 'wouter'
import { TASK_ROUTES } from '../../routes'
import { useTasks } from '../../hooks/useTask'

const schemaTaskForm = yup.object().shape({
  title      : yup.string().required('Campo requerido'),
  description: yup.string().optional(),
})

const TaskForm = () => {
  const [location, setLocation] = useLocation();
  const { currentTask } = useTaskState();
  const isEditMode = currentTask.id.length ? true : false
  const { updateTask, createTask } = useTasks()
  console.log(location);
  
  const {
    register: registerTask,
    handleSubmit: handleSubmitTask,
    formState: { errors: errorsTask },
    reset: resetTask,
    getValues: getValuesTask
  } = useForm<ITaskFormField>({
    defaultValues: isEditMode ? {
      title            : currentTask.title,
      description      : currentTask?.description && currentTask.description
    } : {},
    resolver: yupResolver(schemaTaskForm)
  })

  const onSubmit = () => {
    const dataToSubmit: ITaskFormField = {
      ...getValuesTask()
    }
    if(isEditMode) {
      updateTask(currentTask.id, dataToSubmit)
    } else {
      createTask(dataToSubmit)
    }
    resetTask()
    setLocation(TASK_ROUTES.HOME)
  }

  return (
    <div className=" w-full relative min-h-screen bg-gradient-to-r from-indigo-500 via-indigo-500 to-blue-500">
      <div className=" max-w-[1300px] px-3 m-auto">
        <TopNav title={isEditMode ? 'Editar Tarea' : 'Crear nueva tarea'} />
        <form className="mt-10 max-w-[600px] m-auto" onSubmit={handleSubmitTask(onSubmit)}>
          <div>
            <label
              className={`text-sm max-sm:text-xs text-indigo-200`}
              htmlFor="taskName"
            >
              {isEditMode ? 'Editar título' : 'Título'}
            </label>
            <input
              type="text"
              id="taskName"
              placeholder="Ingresa el título de la tarea"
              className={`w-full h-14 max-sm:h-12 border-none rounded-xl p-4 text-base max-sm:placeholder:text-sm mt-1 outline-none`}
              {...registerTask('title')}
            />
          </div>
          <div className=" mt-7 max-sm:mt-4">
            <label
              className={`text-sm max-sm:text-xs text-indigo-200`}
              htmlFor="taskDescription"
            >
              Descripción de la tarea
            </label>
            <textarea
              id="taskDescription"
              placeholder="Ingresa la descripción de la tarea"
              className={`resize-none border-none  w-full rounded-xl p-4 max-sm:p-3 mt-1 text-base max-sm:placeholder:text-sm h-48 max-sm:h-36 outline-none`}
              {...registerTask('description')}
            />
          </div>
          <div className="text-center flex gap-4 max-sm:flex-col mt-4">
            <button
              type="button"
              onClick={()=>{
                resetTask()
                setLocation(TASK_ROUTES.HOME)
              }}
              className="bg-indigo-400 hover:bg-indigo-600 transition text-xl font-bold text-white p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={!!Object.keys(errorsTask).length}
              onClick={() => {handleSubmitTask(onSubmit)}}
              // className={`${nameCountError || descriptionCountError || !edit.id
              //     ? "bg-purple-700 cursor-not-allowed text-purple-400"
              //     : "hover:bg-purple-800 text-white"
              //   } transition text-xl font-bold bg-purple-400  p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full`}
              className="bg-blue-500 hover:bg-blue-600 transition text-xl font-bold text-white p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full"
            >
              {isEditMode ? 'Guardar' : 'Crear'}
            </button>
          </div>  
        </form>
        {errorsTask?.title && (
            <div className=" max-sm:w-[230px] px-3 py-2 rounded-md bg-white border-l-[10px] flex items-center gap-2 border-red-600 absolute bottom-8 left-[50%] -translate-x-[50%]">
              <IoIosCloseCircle className=" text-2xl max-sm:text-xl text-red-500" />{" "}
              <h2 className=" max-md:text-xs text-sm text-slate-600 font-semibold">
                Por favor ingrese un título
              </h2>
            </div>
          )}
      </div>
    </div>
  )
}

export default TaskForm
