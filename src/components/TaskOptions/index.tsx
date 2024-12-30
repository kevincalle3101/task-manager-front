import { FC } from 'react'
import { FaCheck } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useTasks } from '../../hooks/useTask';
import { useLocation } from 'wouter';
import { TASK_ROUTES } from '../../routes';
import { useTaskState } from '../../hooks/useTaskState';
import { EFilterType } from '../../enums';

interface Props {
    taskId         : string
    taskTitle      : string
    taskDescription: string
    state          : boolean
    filter         : EFilterType
  }

export const TasksOptions: FC<Props> = ({ taskId, state, filter, taskTitle, taskDescription }) => {
    const [location, setLocation] = useLocation();
    const { updateTask, deleteTask } = useTasks()
    const { setCurrentTask } = useTaskState();
    console.log(location);
    const redirectToForm = () => {
        setCurrentTask({ id: taskId, title: taskTitle, description: taskDescription ?? undefined})
        setLocation(TASK_ROUTES.FORM);
    }
        
    return (
        <div className="absolute z-10 w-[225px] shadow bg-white top-8 left-0 max-xl:-left-48 p-3 rounded-2xl">
            <ul className=" flex flex-col text-black">
                <li
                    onClick={() => {updateTask(taskId, {state: !state}, filter)}}
                    className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 max-sm:py-2 px-2 rounded-md"
                >
                    <FaCheck className=" text-2xl max-sm:text-xl text-slate-700" />
                    {!state ? "Marcar hecho" : "Desmarcar hecho"}
                </li>
                <li>
                    <div 
                        className=" max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3  px-2 rounded-md"
                        onClick={()=> redirectToForm()}
                        >
                        <RiEdit2Fill className=" text-2xl max-sm:text-xl text-slate-700" />
                        Editar
                    </div>
                </li>
                <li
                    onClick={() => {
                        deleteTask(taskId)
                    }}
                    className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
                >
                    <MdDelete className=" text-2xl max-sm:text-xl text-slate-700" />
                    Eliminar
                </li>
            </ul>

        </div>
    )
}

