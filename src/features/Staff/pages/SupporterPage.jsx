import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../redux/actions/authActions'
import { BiSupport, BiUser, BiUserX } from "react-icons/bi"
import { toast } from 'react-toastify'
import SupporterChat from '../components/SupporterChat'


const SupporterPage = () => {
    const [rooms, setRooms] = useState([])
    const [socket, setSocket] = useState(null)
  
    const [currentRoom, setCurrentRoom] = useState(null)
    const dispatch = useDispatch()
    
    
    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('token')
    }
    const handleChangeRoom = (r) => {
        socket.emit('change_room', r)
       
    }
 
    // useEffect(() => {
    //     if (!socket) {
    //         const st = io.connect('http://localhost:5000')
    //         setSocket(st)
    //     }
    //     if (socket) {
    //         socket.emit('login_admin', {isAdmin: true})
    //     }  
    // }, [])
    useEffect(() => {
        if (!socket) {
            const st = io.connect('https://authenticity-bend.herokuapp.com')
            // const st = io.connect('http://localhost:5000')
            setSocket(st)
        }
        if (socket) {
            socket.emit('login_admin', {isAdmin: true})
        }  
        if (socket) {
            socket.emit('get_users_list')
            socket.on('update_users', (data) => {
                setRooms(data)
            })
            socket.on('receive_new_room', (data) => {
         
                setCurrentRoom(data)
            })
          
        }
        if (socket) {
            socket.emit('admin_join_room', {isAdmin: true, room: currentRoom?.room})
        }
    }, [socket, currentRoom])
    useEffect(() => {
      if (socket) {
        socket.on('user_disconnect', (data) => {
            if (currentRoom && currentRoom.userSocketId === data) {
                toast.warning(`Người dùng: ${currentRoom.room} đã ngắt kết nối! Đoạn chat sẽ kết thúc`)
                setTimeout(() => {
                    setCurrentRoom(null)
                }, 3000)
            }
        })
      }
    }, [socket, currentRoom])
  
    return ( 
        <>
            <div className="flex items-center justify-between py-3 px-7 border-b border-solid border-gray-400 z-50">
                <Link to="/" className="logo">
                    <span className={"tracking-widest text-red-700"}>Authenti</span>
                    <span className={"tracking-widest text-gray-400"}>city</span>
                </Link>
                <div className="font-semibold cursor-pointer" onClick={handleLogout}>
                    <p>Đăng xuất</p>
                </div>
            </div>
            <div className="flex items-center m-4 text-2xl text-white bg-red-700 w-[fit-content] p-2 rounded-xl ">
                <BiSupport className="mr-4 text-4xl" />
                <p className="font-semibold capitalize">Nhân viên hỗ trợ</p>
            </div>
            {
                rooms.length === 0 &&   <div className="flex justify-center flex-col items-center">
                                            <BiUserX className="text-[200px] text-gray-400" />
                                            <p className="font-medium text-2xl">Không có người dùng nào online</p>
                                        </div>
            }
            <div className="flex">
                {
                    rooms.length !== 0 &&
                    <div className="w-[25%] h-[470px] mr-10 overflow-auto" >  
                    {
                        rooms.map((r, index) => (
                            <div className={"p-4 bg-gray-200 mb-2 " + (currentRoom?.room === r.room ? "border-r-4 border-red-700 " : "")} key={index} onClick={() => handleChangeRoom(r)}>
                                <div className="flex items-center font-medium text-lg">
                                    <BiUser className="text-2xl mr-4" /> 
                                    <p className=" text-center">{r.room}</p>
                                </div>
                            </div>
                        ))
                    }
                    </div> 
                    
                }
               {
                   currentRoom && <SupporterChat socket={socket} currentRoom={currentRoom} />
               }
            </div>
        </>
    )
}

export default SupporterPage
