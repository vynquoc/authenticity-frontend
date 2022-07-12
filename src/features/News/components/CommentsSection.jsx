import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import commentApi from '../../../api/commentApi'
import { Link } from 'react-router-dom'
import { BiUser } from "react-icons/bi"
import { MdChat } from "react-icons/md"
import { toast } from 'react-toastify'
import Spinner from '../../../components/Spinner'
const CommentsSection = ({news, newsComments, onNewComment}) => {
    const currentUser = useSelector(state => state.userLogin?.userInfo)
    const commentRef = useRef()
    const [loading, setLoading] = useState(false)
    const [newComment, setNewComment] = useState("")
  
    const handleCommentChange = (event) => {
        setNewComment(event.target.value.trim())
    }
    const handlePostComment = async (event) => {
        setLoading(true)
        event.preventDefault()
        try {
            const response = await commentApi.createComment({content: newComment, news: news})
            onNewComment(response.comment)
            commentRef.current.value = ""
            setNewComment("")
            setLoading(false)
        } catch (error) {
            toast.error(error.response)
            setLoading(false)
            console.log(error.response)
        }
    }

    return (
        <div className="w-3/4">
            <h1 className="my-6 font-bold text-2xl">Bình luận</h1>
            <div className="p-4 flex flex-col border-[1px] border-gray-400 rounded-lg">
                {
                   newsComments.length !== 0 ? newsComments.map(comment => (
                            <div className="flex bg-white p-4 mb-4">
                                <div className="flex items-center w-[25%]">
                                    <BiUser className="text-2xl mx-2" />
                                    <p className="text-sm font-semibold">{comment.postedBy.name}</p>
                                </div>
                                <p className="flex-1 text-sm">{comment.content}</p>
                            </div>
                    )) : <div className="mx-auto">
                            <h2 className="font-medium text-xl">Chưa có bình luận nào</h2>
                            <MdChat className="text-8xl mx-auto my-6 text-gray-500" />
                        </div>
                }
 
                {loading &&    <div className="mx-auto"><Spinner borderColor="border-red-700" /></div>}
 
                {
                    currentUser ?  <div>
                                <h1 className="font-semibold my-8">Để lại bình luận</h1>
                                <form onSubmit={handlePostComment}>
                                    <div className="flex">
                                        <div className="flex items-start w-[25%]">
                                            <BiUser className="text-2xl mx-2" />
                                            <p className="text-sm font-semibold">{currentUser.name}</p>
                                        </div>
                                        <textarea className="w-full p-2 text-sm border-[1px] border-gray-400" rows="5" ref={commentRef}  type="text" required onChange={handleCommentChange}></textarea>
                                    </div>
                                    <button className="block ml-auto mt-4 text-white text-sm bg-red-700 font-semibold p-2" type="submit">Bình luận</button>
                                </form>
                            </div> :
                            <p className="text-center font-semibold bg-red-700 py-2 text-white">Bạn phải <Link to="/login" className="underline">đăng nhập</Link> để bình luận</p>
                }
            </div>
        </div>
    )
}

export default CommentsSection
