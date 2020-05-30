import React from 'react'
import { Tooltip, Icon } from 'antd'

function LikeDislike() {
    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                            theme='filled'
                            // {LikeAction === 'liked' ? 'filled' : 'outlined'}
                            onClick />

                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto'}}>Like Count</span>
            </span>&nbsp; &nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                            theme='outlined'
                            // {DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                            onClick />

                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto'}}>Dislike Count</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislike;