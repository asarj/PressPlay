import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {Button} from 'antd';
import axios from 'axios';

function SubscriberPane(props) {

    const user = useSelector(state => state.user);
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
        
        if(user.userData && !user.userData.isAuth) {
            return alert("Sign in first!");
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
                backgroundColor: `${user.userData && !user.userData.isAuth ? 'rgb(37, 141, 252)': (subscribed ? '#AAAAAA' : 'rgb(37, 141, 252)')}`,
                borderRadius: '4px', color: 'white',
                // padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                {subscribeNumber} {user.userData && !user.userData.isAuth ? " Subscribe" : (subscribed ? 'Subscribed': " Subscribe")}
            </Button>
        </div>
    )
}

export default SubscriberPane;