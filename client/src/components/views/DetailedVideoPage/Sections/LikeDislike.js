import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';
import { Tooltip, Icon } from 'antd'
import axios from 'axios';

function LikeDislike(props) {

    const user = useSelector(state => state.user);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(null);
    const [dislikes, setDislikes] = useState(0);
    const [isDisliked, setIsDisliked] = useState(null);

    let variable = {

    }

    if(props.video) {
        variable = {videoId: props.videoId, userId: props.userId}
    } else {
        variable = {commentId: props.commentId, userId: props.userId}
    }

    useEffect(() => {
        axios.post('/api/rating/getLikes', variable).then(response => {
            if(response.data.success) {
                setLikes(response.data.likes.length)
                response.data.likes.map(like => {
                    if(like.userId === props.userId) {
                        setIsLiked('liked')
                    }
                })
            } else {
                alert("Failed to get likes");
            }
        })

        axios.post('/api/rating/getDislikes', variable).then(response => {
            if(response.data.success) {
                setDislikes(response.data.dislikes.length)
                response.data.dislikes.map(dislike => {
                    if(dislike.userId === props.userId) {
                        setIsDisliked('disliked')
                    }
                })
            } else {
                alert("Failed to get dislikes");
            }
        })
    })

    const onLike = () => {
        if(user.userData && !user.userData.isAuth) {
            return alert("Sign in first!");
        }
        if (isLiked == null) {
            axios.post('/api/rating/like', variable).then(response => {
                if(response.data.success) {
                    setLikes(likes + 1)
                    setIsLiked('liked')

                    if(isDisliked !== null){
                        setDislikes(dislikes - 1)
                        setIsDisliked(null)
                    }
                    
                } else {
                    alert("Failed to increase like count")
                }
            })
        } else {
            axios.post('/api/rating/unlike', variable).then(response => {
                if(response.data.success) {
                    setLikes(likes - 1)
                    setIsLiked(null)
                } else {
                    alert("Failed to decrease like count")
                }
            })
        }
    }

    const onDislike = () => {
        if(user.userData && !user.userData.isAuth) {
            return alert("Sign in first!");
        }
        if (isDisliked === null) {
            axios.post('/api/rating/dislike', variable).then(response => {
                if(response.data.success) {
                    setDislikes(dislikes + 1)
                    setIsDisliked('disliked')

                    if(isLiked !== null){
                        setLikes(likes - 1)
                        setIsLiked(null)
                    }
                } else {
                    alert("Failed to increase dislike count")
                }
            })
        } else {
            axios.post('/api/rating/undislike', variable).then(response => {
                if(response.data.success) {
                    setDislikes(dislikes - 1)
                    setIsDisliked(null)
                } else {
                    alert("Failed to decrease dislike count")
                }
            })
        }
    }

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                            style={{color: 'rgb(37, 141, 252)'}}
                            theme={isLiked === 'liked' ? 'filled' : 'outlined'}
                            onClick={onLike} />

                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto', color:'rgb(179,179,179)'}}>{likes}</span>
            </span>&nbsp; &nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                            style={{color: 'rgb(37, 141, 252)'}}
                            theme= {isDisliked === 'disliked' ? 'filled' : 'outlined'}
                            onClick={onDislike} />

                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto', color: 'rgb(179,179,179)'}}>{dislikes}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislike;