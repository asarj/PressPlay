import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislike from './LikeDislike'

const { TextArea } = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [commentValue, setCommentValue] = useState("")
    const [openReplyPrompt, setOpenReplyPrompt] = useState(false)

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReplyPrompt(!openReplyPrompt)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(user.userData && !user.userData.isAuth) {
            return alert("Sign in first!");
        }

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: commentValue
        }


        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReplyPrompt(!openReplyPrompt)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    const actions = [
        <LikeDislike video comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span style={{color: 'rgb(37, 141, 252)'}} onClick={openReply} key="comment-basic-reply-to">{!openReplyPrompt ? "Reply to " + props.comment.writer.name : "Cancel"}</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={
                    <h3 style={{color: 'white'}}>{props.comment.writer.name}</h3>
                    
                }
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p style={{color: 'rgb(179,179,179)'}}>
                        {props.comment.content}
                    </p>
                }
            ></Comment>


            {openReplyPrompt &&
                <form style={{ display: 'flex', height: '39px' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '50%', borderRadius: '5px', marginLeft: '50px' }}
                        onChange={handleChange}
                        value={commentValue}
                        placeholder={"Reply to " + props.comment.writer.name}
                    />
                    <br />
                    <Button style={{ width: '100px', height: '35px', backgroundColor: 'rgb(37, 141, 252)', color: 'white' }} onClick={onSubmit}>Submit</Button>
                </form>
            }
        </div>
    )
}

export default SingleComment;