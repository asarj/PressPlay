import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';

function ReplyComment(props) {
    const user = useSelector(state => state.user);
    const [childComponentCount, setChildComponentCount] = useState(0)
    const [openReplyComments, setOpenReplyComments] = useState(false)
    
    useEffect(() => {

        let commentNumber = 0;
        props.commentLists.map((comment) => {

            if (comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildComponentCount(commentNumber)
    }, [props.commentLists, props.parentCommentId])

    let renderReplyComment = (parentCommentId) =>
        props.commentLists.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment commentLists={props.commentLists} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction} />
                    </div>
                }
            </React.Fragment>
        ))

    const handleChange = () => {
        setOpenReplyComments(!openReplyComments)
    }


    return (
        <div>

            {childComponentCount > 0 &&
                <p style={{ fontSize: '14px', color: 'gray' }}
                    onClick={handleChange} >
                    {!openReplyComments ? 
                        "View " + childComponentCount + (childComponentCount > 1 ? " more comments": " more comment") :
                        "Hide " + childComponentCount + (childComponentCount > 1 ? " comments": " comment")
                    }
            </p>
            }

            {openReplyComments &&
                renderReplyComment(props.parentCommentId)
            }

        </div>
    )
}

export default ReplyComment;