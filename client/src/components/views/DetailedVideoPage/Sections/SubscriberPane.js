import React, { useEffect, useState } from 'react';
import {Button} from 'antd';
import axios from 'axios';

function SubscriberPane(props) {

    const userTo = props.userTo;
    const userFrom = props.userFrom;

    const subscribeNumberVariables = {
        userTo: userTo,
        userFrom: userFrom
    }

    const [subscribeNumber, setSubscribeNumber] = useState(0);
    const [subscribed, setSubscribedNumber] = useState(0);

    const onSubscribe = () => {

        let subscribeVariables = {
            userTo: userTo,
            userFrom: userFrom
        }

        if(subscribed) {
            axios.post('/api/subscribe/unsubscribe', subscribeVariables).then(response => {
                if(response.data.success) {
                    setSubscribeNumber(subscribeNumber - 1);
                    setSubscribedNumber(!subscribed);
                } else {
                    alert("Failed to unsubscribe");
                }
            })
        } else {
            axios.post('/api/subscribe/subscribe', subscribeVariables).then(response => {
                if(response.data.success) {
                    setSubscribeNumber(subscribeNumber + 1);
                    setSubscribedNumber(!subscribed);
                } else {
                    alert("Failed to subscribe");
                }
            })
        }
    }

    useEffect(() => {
        axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables).then(response => {
            if(response.data.success) {
                setSubscribeNumber(response.data.subscribeNumber);
            } else {
                alert("Failed to get subscriber information")
            }
        });

        axios.post('/api/subscribe/subscribed', subscribeNumberVariables).then(response => {
            if(response.data.success) {
                setSubscribedNumber(response.data.subscribed);
            } else {
                alert("Failed to get subscribed information")
            }
        });
    }, [])

    return (
        <div>
            <Button 
            onClick={onSubscribe}
            style={{
                backgroundColor: `${subscribed ? '#AAAAAA' : '#CC0000'}`,
                borderRadius: '4px', color: 'white',
                // padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                {subscribeNumber} {subscribed ? 'Subscribed': " Subscribe"}
            </Button>
        </div>
    )
}

export default SubscriberPane;