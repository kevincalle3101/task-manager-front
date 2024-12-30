import { useLocation } from 'wouter';
import { FaCheck } from "react-icons/fa";
import { RxPlus } from "react-icons/rx";
import { useEffect, useState } from "react";

import Greeting from "../../components/Greeting";
import { useTaskState } from "../../hooks/useTaskState";
import { TaskCard } from "../../components/TaskCard";
import { useTasks } from "../../hooks/useTask";
import { TASK_ROUTES } from "../../routes";
import { EFilterType } from "../../enums";


const Home = () => {
  const [location, setLocation] = useLocation();
  const { getTasks } = useTasks()

  const { tasks, setCurrentTask } = useTaskState();

  const [filter, setFilter] = useState<EFilterType>(EFilterType.All);
  console.log(location);

  useEffect(() => {
    if (filter === "completed") {
      getTasks(true);
    } else if (filter === "pending") {
      getTasks(false);
    } else {
      getTasks()
    }
  }, [filter])


  return (
    <div className=" w-full relative min-h-screen pb-60 bg-gradient-to-r from-indigo-500 via-indigo-500 to-blue-500">
      <div className=" max-w-[1300px] px-3 m-auto">
        <Greeting />
        <div className="max-w-[1300px] max-lg:container flex items-center justify-center mt-2 mb-10">
          <h1 className="text-white font-bold gap-1 text-5xl max-md:text-2xl">Gestor de Tareas 📚📖</h1>
        </div>
        <div className="flex justify-center gap-3 my-4 mb-6">
          <button
            onClick={() => setFilter(EFilterType.All)}
            className={`px-4 py-2 rounded-lg transform transition-transform duration-200 ${filter === EFilterType.All
              ? "bg-blue-500 text-white scale-100"
              : "bg-gray-100 hover:scale-105"
              }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter(EFilterType.Completed)}
            className={`px-4 py-2 rounded-lg transform transition-transform duration-200 ${filter === EFilterType.Completed
              ? "bg-blue-500 text-white scale-100"
              : "bg-gray-100 hover:scale-105"
              }`}
          >
            Completados
          </button>
          <button
            onClick={() => setFilter(EFilterType.Pending)}
            className={`px-4 py-2 rounded-lg transform transition-transform duration-200 ${filter === EFilterType.Pending
              ? "bg-blue-500 text-white scale-100"
              : "bg-gray-100 hover:scale-105"
              }`}
          >
            No Completados
          </button>
        </div>
        {
          tasks.length ? (
            <div className="max-md:container max-w-[700px] m-auto flex flex-col gap-4 max-sm:gap-3 pb-5">
              {
                tasks.map((task, index) => (
                  <TaskCard key={index} task={task} filter={filter} />
                ))
              }
            </div>
          ) : (
            <h1 className=" w-full text-center text-2xl max-md:text-2xl max-sm:text-xl text-white font-bold absolute bottom-[50%] left-[50%] -translate-x-[50%]">
              No tienes ninguna tarea por mostrar
            </h1>
          )
        }
        <div
          onClick={() => {
            setLocation(TASK_ROUTES.FORM)
            setCurrentTask({ id: '', title: '' })
          }}
          className="fixed bottom-10 w-16 h-16 max-sm:w-14 max-sm:h-14 cursor-pointer bg-white grid 
          place-items-center rounded-full left-[50%] -translate-x-[50%] transition-transform duration-300 hover:scale-110"
        >
          <RxPlus className="text-4xl max-sm:text-3xl plusIcon text-indigo-500" />
        </div>
      </div>
    </div>
  )
}

export default Home;
