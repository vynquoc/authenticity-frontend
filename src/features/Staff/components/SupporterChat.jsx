import React, { useState, useEffect } from 'react'
import {BiSend} from 'react-icons/bi'
import ScrollToBottom from 'react-scroll-to-bottom'
const SupporterChat = ({socket, currentRoom}) => {

    const [messages, setMessages] = useState(currentRoom.messages)
    const [currentMessage, setCurrentMessage] = useState("")
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: currentRoom.room,
                isAdmin: true,
                message: currentMessage,
                time: new Date(Date.now()).toLocaleTimeString()
            }
            await socket.emit("send_message", messageData)
            setCurrentMessage("")
            setMessages([...messages, {isAdmin: true, message: currentMessage, time: new Date(Date.now()).toLocaleTimeString()}])
        }
    }
    const handleMessageChange = (msg) => {
        setCurrentMessage(msg)
    }
    const handleEnter = (event) => {
        if (event.key === 'Enter') sendMessage()
    }
    useEffect(() => {
        if (socket) {
         socket.on('receive_message', (data) => {
          
            setMessages([...messages, {
                isAdmin: false,
                message: data.message,
                time: data.time
           }])
        })
     
     }
     }, [messages, socket])
     useEffect(() => {
        setMessages(currentRoom.messages)
     }, [socket, currentRoom])
    return (
        <div className="flex-1 p-8 border-[2px] border-black mr-10 rounded-lg">
            <p className="font-medium text-lg bg-red-700 rounded-lg text-white px-4 mb-2 inline-block">Đang trả lời: {currentRoom.room}</p>
            <div>
                <ScrollToBottom className="h-[300px] border-[1px] border-black mb-4 rounded-lg overflow-auto p-4">
                    {
                        messages.map(msg => {
                            if (msg.isAdmin) {
                               return <div className="text-sm font-medium text-right mb-2 break-all">
                                            <p className="inline-block bg-gray-200 px-2 py-1 rounded-md mb-[2px]">{msg.message}</p>
                                            <p className="text-[10px] text-gray-400">{msg.time}</p>
                                        </div>
                            } else {
                                return  <div className="text-sm font-medium text-left mb-2 break-all">
                                            <p className="text-white inline-block bg-red-700 px-2 py-1 rounded-md mb-[2px]">{msg.message}</p>
                                            <p className="text-[10px] text-gray-400">{msg.time}</p>
                                        </div>
                            }
                        })
                    }
                </ScrollToBottom>
                <div className="flex items-center">
                    <input className="border-[1px] border-black flex-1 mr-4 p-2 rounded-lg text-xs" value={currentMessage} onKeyDown={handleEnter} onChange={(event) => handleMessageChange(event.target.value)} />
                    <button onClick={sendMessage} disabled={currentMessage === ""} className={"text-white py-1 px-6 font-semibold rounded-lg " + (currentMessage === "" ? "bg-gray-300" : "hover:bg-red-800 bg-red-700")}>
                        <BiSend className="inline-block text-2xl" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SupporterChat
