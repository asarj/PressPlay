import React, { useEffect, useState } from 'react';
import { List, Avatar, Row, Col, Typography } from 'antd';
import axios from 'axios';
import DetailedVideoSidePane from './Sections/DetailedVideoSidePane';
import SubscriberPane from './Sections/SubscriberPane';
import Comments from './Sections/Comments';
import LikeDislike from './Sections/LikeDislike'

function DetailedVideoPage(props) {

    const videoId = props.match.params.videoId;
    const [video, setVideo] = useState([]);
    const [commentLists, setCommentLists] = useState([]);

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable).then(response => {
            if(response.data.success) {
                setVideo(response.data.video);
            } else {
                alert("Failed to get video info!");
            }
        })

        axios.post('/api/comment/getComments', videoVariable).then(response => {
            if(response.data.success) {
                setCommentLists(response.data.comments);
            } else {
                alert("Failed to get comment info!");
            }
        })
    }, [])

    const updateComment = (newComment) => {
        if (newComment === ""){
            alert("Comment cannot be empty!");
        } else {
            setCommentLists(commentLists.concat(newComment));
        }

    }

    if (video.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${video.filePath}`} controls></video>

                        <List.Item
                            actions={[
                                <LikeDislike />, 
                                <SubscriberPane userTo={video.writer._id} userFrom={localStorage.getItem('userId')} />]}>
                            <List.Item.Meta
                                avatar={<Avatar src={video.writer && video.writer.image} />}
                                title={<a href="https://ant.design">{video.title}</a>}
                                description={video.description}
                            />
                            <div></div>
                        </List.Item>

                        <Comments commentLists={commentLists} postId={video._id} refreshFunction={updateComment} />

                    </div>
                </Col>
                <Col lg={6} xs={24}>

                    <DetailedVideoSidePane />

                </Col>
            </Row>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }
    
}

export default DetailedVideoPage;