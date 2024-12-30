import { FC } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { useLocation } from 'wouter';
import { TASK_ROUTES } from '../../routes';

interface Props {
    title: string
  }

export const TopNav: FC<Props> = ({title}) => {
  const [location, setLocation] = useLocation();
  console.log(location);
  
  return (
    <div className=" py-7 max-sm:py-5  text-center text-3xl text-white flex items-center">
      <div className=" rounded-lg p-1" title="Back" onClick={()=>setLocation(TASK_ROUTES.HOME)}>
        <IoIosArrowBack className="text-4xl max-sm:text-2xl cursor-pointer" />
      </div>
      <h1 className="font-bold max-sm:text-2xl text-4xl mx-auto">{title}</h1>
    </div>
  );
};

