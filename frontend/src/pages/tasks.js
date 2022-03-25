import React, {useState, useEffect} from 'react'
import { Link } from 'gatsby'
import axios from 'axios'

const TaskPage = () => {

    const [tasks, setAllTasks] = useState([]);
    useEffect(() => {
        async function getAllTasks(){
            await axios.get("http://127.0.0.1:8000/api/tasks")
                .then(response => {
                    setAllTasks(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
            }
            getAllTasks();
    }, [])


    return (
    <div>
        <h1>This is the Task Page</h1>
        {
            tasks.map(data => {
                return (
                <div key = {data.id}>
                    <h3>ID: {data.id}</h3>
                    <h4>Title: {data.title}</h4>
                    <Link 
                    to="/update"
                    state={{ id: data.id }}
                >Edit</Link>
                    <br/>
                </div>
                )
            })
        }
    </div>
    )
}

export default TaskPage