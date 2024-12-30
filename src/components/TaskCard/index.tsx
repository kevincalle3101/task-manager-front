import { FC, useEffect, useRef, useState } from 'react'
import { FaCheck } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import dayjs from "dayjs";

import { ITask } from "../../types/tasks";
import { TasksOptions } from '../TaskOptions';
import { EFilterType } from '../../enums';

interface Props {
    task  : ITask
    filter:  EFilterType
  }

export const TaskCard: FC<Props> = ({task, filter}) => {
    const [openOptions, setOpenOptions] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let handler = (e: MouseEvent) => {
          if (!menuRef.current?.contains(e.target as Node)) {
            setOpenOptions(false);
          }
        };
    
        document.addEventListener("mousedown", handler);
    
        return () => {
          document.removeEventListener("mousedown", handler);
        };
      });
      
  return (
    <div className="flex justify-between gap-4 max-w-full items-center text-white bg-indigo-700 rounded-2xl px-6 py-5 max-sm:py-4 max-sm:px-4">
      {task.state && (
        <div className=" bg-blue-500 p-4 max-sm:p-2 rounded-xl">
          <FaCheck className=" text-4xl" />
        </div>
      )}
      <div className="black w-full">
      <div
          className={`flex justify-between gap-10 items-center ${
            task.description ? "mb-3 max-sm:mb-1" : "mb-0"
          }`}
        >
          <h2
            className={`${
              task.state ? "line-through" : null
            } font-bold text-lg displayInput max-sm:text-sm`}
          >
            {task.title}
          </h2>
          <p
            className={`${
              task.state ? "line-through" : null
            } min-w-[110px] max-sm:text-xs font-light text-gray-200`}
          >
              {dayjs(task.createdAt).format("DD/MM/YYYY hh:mm A")}
          </p>
        </div>
        <p
          className={`${
            task.state ? "line-through" : null
          } text-base max-sm:text-sm ${!task.description && "hidden"}`}
        >
          {task.description}
        </p>
      </div>
      <div ref={menuRef} className=" relative">
        <SlOptionsVertical
          onClick={() => setOpenOptions(!openOptions)}
          className=" text-lg cursor-pointer"
        />

        <div
          className={`${openOptions ? "animationActive" : "animationUnactive"}`}
        >
          {openOptions && (
            <TasksOptions
              taskId={task._id}
              taskTitle={task.title}
              taskDescription={task.description}
              state={task.state}
              filter={filter}
            />
          )}
        </div>
      </div>
    </div>
  )
}
