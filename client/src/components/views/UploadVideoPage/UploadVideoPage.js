import React, {useState, useEffect} from 'react';
import {Typography, Button, Form, message, Input, Icon} from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {useSelector} from 'react-redux';

const {Title} = Typography;
const {TextArea} = Input;

const Private = [
    {
        value:0, label: 'Private'
    },
    {
        value:1, label: 'Public'
    }
]

const Category = [
    {
        value:0, label: 'Film & Animation'
    },
    {
        value:1, label: 'Autos & Vehicles'
    },
    {
        value:2, label: 'Music'
    },
    {
        value:3, label: 'Pets & Animals'
    },
    {
        value:4, label: 'Sports'
    }
]

function UploadVideoPage(props) {

    const user = useSelector(state => state.user);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState(0);
    const [categories, setCategories] = useState("Film & Animation");
    const [filePath, setFilePath] = useState("");
    const [duration, setDuration] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value);
    }

    const handleChangeDecsription = (event) => {
        setDescription(event.currentTarget.value);
    }

    const handleChangePrivacy = (event) => {
        setPrivacy(event.currentTarget.value);
    }

    const handleChangeCategories = (event) => {
        setCategories(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if(user.userData && !user.userData.isAuth) {
            return alert("Sign in first!");
        }

        if(title === "" || description === "" || categories === "" 
            || filePath === "" || duration === "" || thumbnail === "") {
            return alert("Fill in all fields before submitting!");
        }

        const variables = {
            writer: user.userData._id,
            title: title,
            description: description,
            privacy: privacy,
            filePath: filePath,
            category: categories,
            duration: duration['fileDuration'],
            thumbnail: thumbnail
        }

        axios.post('/api/video/uploadVideo', variables).then(response => {
            if(response.data.success) {
                alert("Video uploaded successfully!");
                props.history.push("/");
            } else {
                alert("Failed to upload video");
            }
        })
    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        
        formData.append('file', files[0]);
        axios.post('/api/video/uploadfiles', formData, config).then(response => {
            if (response.data.success) {
                let variable = {
                    filePath: response.data.filePath,
                    fileName: response.data.fileName
                }
                setFilePath(response.data.filePath);

                // Create the thumbnail to display the uploaded video
                axios.post('/api/video/thumbnail', variable).then(response => {
                    if (response.data.success) {
                        setDuration(response.data);
                        setThumbnail(response.data.thumbsFilePath);
                    } else {
                        alert("Failed to create the thumbnail");
                    }
                })
            } else {
                alert("Video failed to save in server");
            }
        })
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2} style={{color: 'white'}}> Upload Video</Title>
        </div>

        <Form onSubmit={onSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={800000000}>
                    {({ getRootProps, getInputProps }) => (
                        <div style={{ width: '300px', height: '240px', border: '1px solid rgb(37, 141, 252)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem', color: 'rgb(37, 141, 252)' }} />

                        </div>
                    )}
                </Dropzone>

                {thumbnail !== "" &&
                    <div>
                        <img src={`http://localhost:5000/${thumbnail}`} alt="haha" />
                    </div>
                }
            </div>

            <br /><br />
            <label style={{color: 'rgb(179,179,179)'}}>Title</label>
            <Input
                onChange={handleChangeTitle}
                value={title}
            />
            <br /><br />
            <label style={{color: 'rgb(179,179,179)'}}>Description</label>
            <TextArea
                onChange={handleChangeDecsription}
                value={description}
            />
            <br /><br />
            
            <label style={{color: 'rgb(179,179,179)'}}>Privacy Level</label><br />
            <select onChange={handleChangePrivacy}>
                {Private.map((item, index) => (
                    <option key={index} value={item.value} >{item.label}</option>
                ))}
            </select>
            <br /><br />

            <label style={{color: 'rgb(179,179,179)'}}>Category</label><br />
            <select onChange={handleChangeCategories}>
                {Category.map((item, index) => (
                    <option key={index} value={item.label}>{item.label}</option>
                ))}
            </select>
            <br /><br />

            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>

        </Form>
    </div>
    );
    
}

export default UploadVideoPage;