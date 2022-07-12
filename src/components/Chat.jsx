import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import {BiChat, BiSend, BiX } from "react-icons/bi"
import ScrollToBottom from 'react-scroll-to-bottom'
import { useTranslation } from 'react-i18next'
//io

const Chat = () => {
    const {t} = useTranslation()
    const [email, setEmail] = useState("")
    const [toggle, setToggle] = useState(false)
    const [socket, setSocket] = useState(null)
    const [connect, setConnect] = useState(false)
    const [currentMessage, setCurrentMessage] = useState("")
    const [noti, setNoti] = useState(false)
    const [messages, setMessages] = useState([]) 
    const joinRoom = () => {
        if (email !== "") {
            socket.emit("join_room", email)
            setConnect(true)
        }
    }
  
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: email,
                isAdmin: false,
                user: email,
                message: currentMessage,
                time: new Date(Date.now()).toLocaleTimeString()
            }
            await socket.emit("send_message", messageData)
            setCurrentMessage("")
            setMessages([...messages, {isAdmin: false, message: currentMessage, time: new Date(Date.now()).toLocaleTimeString()}])
        }
    }
    const handleEnter = (event) => {
        if (event.key === 'Enter') sendMessage()
    }
    const handleChatOpen = (event) => {
        setToggle(!toggle)
        setNoti(false)
    }
    useEffect(() => {
        if (!socket) {
            const st = io.connect('https://authenticity-bend.herokuapp.com')
            // const st = io.connect('http://localhost:5000')
            setSocket(st)
        }
       
    }, [socket])
    useEffect(() => {
        if (socket) {
            socket.on('receive_message', (data) => {
               if (toggle === false) {
                setNoti(true)
               } else {
                   setNoti(false)
               }
               setMessages([...messages, {
                    isAdmin: true,
                    message: data.message,
                    time: data.time
               }])
           })
        }
    }, [messages, socket])
    return (
        <div className="fixed z-50  bottom-[100px] left-[40px]" >
            {
                !toggle &&    <div className="p-3 rounded-full bg-red-700 cursor-pointer" onClick={handleChatOpen}>
                <BiChat className="text-white text-2xl" />
         
                </div>
            }
            {
                toggle && <div className="border-red-700 h-[300px] absolute border-2 w-[300px] top-[-280px] left-full bg-white rounded-lg">
                        <BiX className="block ml-auto text-3xl text-gray-400 cursor-pointer" onClick={() => setToggle(!toggle)}/>
                        {
                        !connect && <>
                                            <div className="p-4">

                                                <p className="text-base text-center font-medium my-4 bg-red-700 text-white py-2 rounded-lg">{t("chat.1")}</p>
                                                <div>
                                                    <p className="font-medium">{t("chat.2")}</p>
                                                    <input className="p-2 text-sm border-[1px] border-gray-200 w-full my-4" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />                                                              
                                                    <button className="text-sm font-medium block mx-auto bg-red-700 text-white p-2 rounded-lg" onClick={joinRoom}>{t("chat.3")}</button>
                                                </div>
                                            </div>
                                        </>
                        }
                        {
                            connect && <div className="p-2 flex flex-col">
                                            <ScrollToBottom  className="h-[225px] w-full overflow-auto">
                                                {
                                                    messages.length === 0 && <p className="text-center font-medium text-xs">{t("chat.4")}</p>
                                                }
                                                {
                                                     messages.map(msg => {
                                                        if (msg.isAdmin) {
                                                           return   <div className="text-xs font-medium  text-left  mb-2 break-all">
                                                                        <p className="inline-block text-white bg-red-700 px-2 py-1 rounded-md mb-[2px] ">{msg.message}</p>
                                                                        <p className="text-[10px] text-gray-400">{msg.time}</p>
                                                                    </div>
                                                        } else {
                                                            return  <div className="text-xs font-medium text-right mb-2 break-all">
                                                                        <p className="inline-block bg-gray-200 px-2 py-1 rounded-md">{msg.message}</p>
                                                                        <p className="text-[10px] text-gray-400">{msg.time}</p>
                                                                    </div>
                                                        }
                                                    })
                                                }
                                            </ScrollToBottom>
                                             <div className="flex items-center">                                              
                                                <input className="border-[1px] border-black flex-1 p-1 rounded-md text-xs mr-2" value={currentMessage} onKeyDown={handleEnter} onChange={(event) => setCurrentMessage(event.target.value)}/>
                                                <button onClick={sendMessage} disabled={currentMessage === ""} className={"text-white px-4 py-1 text-sm font-semibold rounded-md  " + (currentMessage === "" ? "bg-gray-300" : "hover:bg-red-800 bg-red-700")}><BiSend className="inline-block text-xl" /></button>
                                            </div>
                                        </div>  
                        }
                    </div>
            }
        </div>
    )
}

export default Chat
