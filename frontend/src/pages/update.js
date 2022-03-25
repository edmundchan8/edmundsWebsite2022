import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { navigate } from 'gatsby'

const UpdatePage = ({location}) => {
    const baseURL = "http://127.0.0.1:8000/api/tasks/";
    const [data, setData] = useState([]);
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);

    useEffect(() => {
        const url = baseURL + location.state.id;
        async function getTask(){
            axios.get(url)
            .then(response => {
                setData(response.data);
                setTitle(response.data.title);
                setDescription(response.data.description);
            })
            .catch(error => {
                console.log(error);
            })
        }
        getTask();
    }, [data.id])

    function handleTitle(e){
        setTitle(e.target.value);
    }

    function handleDescription(e){
        setDescription(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        const updateTask = {
            title: title,
            description: description
        }
        axios.put(baseURL + data.id, updateTask)
            .then(response => {
                console.log(response.data);
                console.log(updateTask);
                navigate('/tasks');
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <h3>{data.id}</h3>
            <h3>{data.title}</h3>
            <h3>{data.description}</h3>

            <h2>Edit</h2>
            <form onSubmit={handleSubmit}>
                <label>title
                <input type="text" value={title} onChange={handleTitle} />
                </label>
                <br/>
                <label>description
                <input type="text" value={description} onChange={handleDescription} />
                </label>
                <input type="submit" value="Update Data"/>
            </form>
        </div>
    )
}

export default UpdatePage