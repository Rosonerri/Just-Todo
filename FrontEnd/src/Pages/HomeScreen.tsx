import { MdAdd } from "react-icons/md";
import { FaPaste } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { MdOutlineScreenShare } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import { BiTask } from "react-icons/bi";
import img from "../assets/passport.jpg";
import { useEffect, useState } from "react";
import { MdAutoDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import { useAutoAnimate } from "@formkit/auto-animate/react";



const HomeScreen = () => {
  const [text, setText] = useState<string>("");
 const [done, setDone] =  useState([])
  const [parent] = useAutoAnimate();
 const [progress, setProgress] = useState([]);
 const [task, setTask] = useState([]);
  const [textArea, setTextArea] = useState("");
  const [toggle, setToggle] = useState<boolean>(false);

  const onToggle = () => {
    setToggle(!toggle);
  };

 const fetchData = () => {
    const url: string = "http://localhost:2233/api/get";

    fetch(url, {method: "GET"}).then((res) => {
      return res.json()
    }).then((res) => {
      console.log("This is Res:", res)
      setDone(res?.data?.done)
      setProgress(res?.data?.progress);
      setTask(res?.data?.task);
    })
 }

  useEffect(() => {
    fetchData();
  }, []);


  const createTask = () => {
    const url: string = "http://localhost:2233/api/create";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: text }),
    }).then(() => {
      toast.success("Task Created Succesfully")
      window.location.reload();
    }).catch(() => {
      toast.error("Error Creating Task")
    })
  };

   const changeToDone = (Id: string) => {
     const url: string = `http://localhost:2233/api/done/${Id}`;
     fetch(url, {
       method: "PATCH",
     })
       .then((res: any) => {
         return res.json();
       })
       .then((res) => {
        window.location.reload();
        return res?.data;
       });
   };

    const changeToProgress = (Id: string) => {
    const url: string = `http://localhost:2233/api/progress/${Id}`;
    fetch(url, {
      method: "PATCH",
    })
      .then((res: any) => {
        return res.json();
      })
      .then((res: any) => {
        window.location.reload();
        return res?.data
      });
  };

 


  return (
    <div className="w-full min-h-screen mt-[60px]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full h-screen rounded-md">
        <div className="grid grid-col-1  mt-3 xl:grid-cols-2 gap-3 ">
          <div className="font-[700] text-[30px] text-blue-950">Task</div>
          <div className=" flex xl:justify-center justify-between">
            <div className="w-[60%] flex justify-between items-center cursor-pointer">
              <div className="text-[30px] text-blue-950">
                <FaPaste />
              </div>
              <div className="text-[30px] text-blue-950">
                <MdOutlineScreenShare />
              </div>
              <div className="text-[30px] text-blue-950">
                <MdOutlinePeopleOutline />
              </div>
              <div className="text-[30px] text-blue-950">
                <FaCopy />
              </div>
            </div>
            <div className="xl:w-[40%] flex justify-end">
              <button
                className="flex p-2 bg-blue-950 rounded-md text-white font-[700] text-[11px] xl:text-[23px] md:text-[19px]"
                onClick={onToggle}
              >
                <span>Add Task</span>
                <MdAdd className="  ml-6 " />
              </button>
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-3 mt-7 gap-5 rounded-md grid-cols-1">
          <div
            className="border p-3 rounded-md overflow-y-auto h-[900px]"
            ref={parent}
          >
            <div className="border h-[50px] sticky top-0 left-0 flex items-center bg-blue-950 rounded-md">
              <BiTask className="text-[35px] text-white" />
              <span className="font-[700] ml-3 text-[30px] text-white">
                To Do
              </span>
            </div>

            <div className="">
              {task?.map((props: any) => (
                <div
                  key={props?._id}
                  className="border mt-9 h-[400px] rounded-md p-2 shadow-md bg-slate-300"
                >
                  <div className="h-[55px] flex justify-between items-center">
                    <div className="h-[50px] w-[50px] bg-slate-400 rounded-[50%] overflow-hidden">
                      <img src={img} alt="" />
                    </div>
                    <div className="text-[30px] cursor-pointer">
                      <TfiWrite />
                    </div>
                  </div>
                  <div className="h-[50%] shadow-md bg-slate-50">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Possimus, explicabo! Aperiam odit, natus nisi saepe quo sed
                    libero et ratione?
                  </div>
                  <div className="h-[55px] flex items-center justify-between">
                    <div>
                      <span className="text-[17px] text-green-900 font-[700]">
                        Task:{" "}
                      </span>
                      <span className="text-[20px] font-[700]">
                        {props?.title}
                      </span>
                    </div>
                    <div>
                      <span className="font-[700] text-[17px] text-blue-950">
                        Time:{" "}
                      </span>
                      <span className="text-[15px]">
                        {moment(props?.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                  <div className="h-[55px] flex items-center justify-between">
                    <button
                      className={`py-1 px-8 ${
                        props.progress && props.done
                          ? "bg-green-950"
                          : props.progress
                          ? "bg-orange-500"
                          : "bg-blue-950"
                      } text-white -tracking-widest font-semibold rounded-md`}
                      onClick={() =>
                        !props?.progress && !props?.done
                          ? changeToProgress(props?._id)
                          : props?.progress && !props?.done
                          ? changeToDone(props?._id)
                          : changeToDone(props?._id)
                      }
                    >
                      {props.progress && props.done
                        ? "Completed"
                        : props.progress
                        ? "In Progress"
                        : "Start"}
                    </button>
                    <div className="text-[30px] text-red-500 cursor-pointer">
                      <MdAutoDelete />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="border p-3 overflow-y-auto rounded-md h-[900px]"
            ref={parent}
          >
            <div className="border h-[50px] sticky top-0 left-0 flex items-center bg-blue-950 rounded-md">
              <GrInProgress className="text-[25px] text-white" />
              <span className="font-[700] ml-3 text-[30px] text-white">
                In Progress
              </span>
            </div>
            <div>
              {progress?.map((props: any) => (
                <div
                  key={props?._id}
                  className=" mt-9 h-[400px] rounded-md p-2 shadow-md bg-slate-300"
                >
                  <div className="h-[55px] flex justify-between items-center">
                    <div className="h-[50px] w-[50px] bg-slate-400 rounded-[50%] overflow-hidden">
                      <img src={img} alt="" />
                    </div>
                    <div className="text-[30px] cursor-pointer">
                      <TfiWrite />
                    </div>
                  </div>
                  <div className="h-[50%] shadow-md bg-slate-50">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Possimus, explicabo! Aperiam odit, natus nisi saepe quo sed
                    libero et ratione?
                  </div>
                  <div className="h-[55px]  flex items-center justify-between">
                    <div>
                      <span className="text-[17px] text-green-900 font-[700]">
                        Task:{" "}
                      </span>
                      <span className="text-[20px] font-[700]">
                        {props?.title}
                      </span>
                    </div>
                    <div>
                      <span className="font-[700] text-[17px] text-blue-950">
                        Time:{" "}
                      </span>
                      <span className="text-[15px]">
                        {moment(props.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                  <div className="h-[55px]  flex items-center justify-between">
                    <button
                      className={`py-1 px-8 ${
                        props.progress && props.done
                          ? "bg-green-950"
                          : props.progress
                          ? "bg-blue-800"
                          : "bg-red-700"
                      } text-white -tracking-widest font-semibold rounded-md`}
                      onClick={() =>
                        !props?.progress && !props?.done
                          ? changeToProgress(props?._id)
                          : props?.progress && !props?.done
                          ? changeToDone(props?._id)
                          : changeToDone(props?._id)
                      }
                    >
                      {props.progress && props.done
                        ? "Completed"
                        : props.progress
                        ? "In Progress"
                        : "Start"}
                    </button>
                    <div className="text-[30px] text-red-500 cursor-pointer">
                      <MdAutoDelete />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="border p-3 h-[900px] overflow-y-auto rounded-md"
            ref={parent}
          >
            <div className="border h-[50px] sticky top-0 left-0 flex items-center bg-blue-950 rounded-md">
              <IoMdDoneAll className="text-[35px] text-white" />
              <span className="font-[700] ml-3 text-[30px] text-white">
                Done
              </span>
            </div>
            <div>
              {done?.map((props: any) => (
                <div
                  key={props}
                  className=" mt-9 h-[400px] rounded-md p-2 shadow-md bg-slate-300"
                >
                  <div className="h-[55px]  flex justify-between items-center">
                    <div className="h-[50px] w-[50px] bg-slate-400 rounded-[50%] overflow-hidden">
                      <img src={img} alt="" />
                    </div>
                    <div className="text-[30px] cursor-pointer">
                      <TfiWrite />
                    </div>
                  </div>
                  <div className="h-[50%]  shadow-md bg-slate-50">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Possimus, explicabo! Aperiam odit, natus nisi saepe quo sed
                    libero et ratione?
                  </div>
                  <div className="h-[55px]  flex items-center justify-between">
                    <div>
                      <span className="text-[17px] text-green-900 font-[700]">
                        Task:{" "}
                      </span>
                      <span className="text-[20px] font-[700]">
                        {props?.title}
                      </span>
                    </div>
                    <div>
                      <span className="font-[700] text-[17px] text-blue-950">
                        Time:{" "}
                      </span>
                      <span className="text-[15px]">
                        {moment(props.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                  <div className="h-[55px]  flex items-center justify-between">
                    <button
                      className={`py-1 px-8 ${
                        props.progress && props.done
                          ? "bg-green-950"
                          : props.progress
                          ? "bg-orange-500"
                          : "bg-red-700"
                      } text-white -tracking-widest font-semibold rounded-md`}
                      onClick={() =>
                        !props?.progress && !props?.done
                          ? changeToProgress(props?._id)
                          : props?.progress && !props?.done
                          ? changeToDone(props?._id)
                          : changeToDone(props?._id)
                      }
                    >
                      {props.progress && props.done
                        ? "Completed"
                        : props.progress
                        ? "In Progress"
                        : "Start"}
                    </button>
                    <div className="text-[30px] text-red-500 cursor-pointer">
                      <MdAutoDelete />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {toggle && (
        <div className="h-[100%] top-0 backdrop-blur-sm item-center justify-between absolute w-[99%]">
          <div className="border h-screen flex justify-center items-center">
            <div className="w-[400px] flex justify-center items-center flex-col  shadow-md bg-slate-50">
              <div
                className="text-[35px] mb-2 w-[70%] flex justify-end cursor-pointer text-red-900"
                onClick={onToggle}
              >
                <MdCancel />
              </div>
              <input
                type="text"
                className="w-[300px] border h-[40px]"
                placeholder="Title this Task"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <textarea
                className="border w-[300px] h-[150px] mt-5 outline-none"
                placeholder="Description"
                value={textArea}
                onChange={(e) => {
                  setTextArea(e.target.value);
                }}
              />
              <button
                className="bg-blue-950 w-[300px] border h-[40px] p-2 text-white mt-3 rounded-md mb-[50px] font-[700]"
                onClick={() => {
                  createTask();
                  setText("");
                  onToggle();
                }}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
