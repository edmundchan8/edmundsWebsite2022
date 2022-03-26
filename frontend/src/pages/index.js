import React, {useState, useEffect} from 'react'
import { Link, navigate } from 'gatsby'
import axios from 'axios'

const IDMPage = () => {

    const [IDMs, setAllIDMs] = useState([]);
    const [assessment, setAssessment] = useState();
    //const [description, setDescription] = useState();
    
    const url = "http://127.0.0.1:8000/api/idms/";
    useEffect(() => {
        async function getAllIDMs(){
            await axios.get(url)
                .then(response => {
                    setAllIDMs(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
            }
            getAllIDMs();
    }, [])

    function handleAssessment(e){
        setAssessment(e.target.value);
    }

    // function handleDescription(e){
    //     setDescription(e.target.value);
    // }

    function handleSubmit(e){
        const newIDM = {
            assessment: "sdasdsadsa", 
            score: 0, 
            action_plan: "", 
            action_plan_completed: false
        };
        axios.post(url, newIDM)
            .then (response => {
                navigate('/');
            })
            .catch(error => {
                console.log(error.response.data);
            })
            e.preventDefault();
        }

    function handleDelete(e){
        alert("Are you sure you want to delete?");
        axios.delete(url + e.target.id)
            .then(response =>{
                navigate('/');
            })
            .catch(error =>{
                console.log(error);
            });
        }

    return (
    <div>
        <h1>This is the IDM Page</h1>
        <h3>Add an IDM</h3>
        <form onSubmit={handleSubmit}>
            <label>IDM Title
            <input type="text" value={assessment} onChange={handleAssessment} />
            </label>
            <br/>
            {/* <label>description
            <input type="text" value={description} onChange={handleDescription} />
            </label> */}
            <input type="submit" value="Add IDM"/>
        </form>
        <br/>
        <h2>Previous IDMs</h2>
        {
            IDMs.map(data => {
                return (
                <div key = {data.id}>
                    <h4>Title: {data.assessment}</h4>
                    <Link to="/update" state={{ id: data.id }}>Continue Assessment</Link>
                    <br/>
                    <Link to="/update" state={{ id: data.id }}>Check Action Plan</Link>
                    <br/>
                    <Link to="/" onClick={handleDelete} id={data.id}>Delete</Link>
                    <br/>
                </div>
                )
            })
        }
    </div>
    )
}

export default IDMPage