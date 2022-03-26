import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { navigate, Link } from 'gatsby'

const UpdatePage = ({location}) => {
    const baseURL = "http://127.0.0.1:8000/api/idms/";
    const [data, setData] = useState([]);
    const [assessment, setAssessment] = useState([]);
    const [score, setScore] = useState([]);

    useEffect(() => {
        const url = baseURL + location.state.id;
        async function getIDM(){
            axios.get(url)
            .then(response => {
                setData(response.data);
                setAssessment(response.data.assessment);
                setScore(response.data.score);
            })
            .catch(error => {
                console.log(error);
            })
        }
        getIDM();
    }, [location.state.id])

    function handleassessment(e){
        setAssessment(e.target.value);
    }

    function handlescore(e){
        setScore(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        const updateIDM = {
            assessment: assessment,
            score: score,
            action_plan: data.action_plan,
            action_plan_completed: data.action_plan_completed
        }
        axios.put(baseURL + data.id, updateIDM)
            .then(response => {
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <Link to="/">BACK</Link>
            <h3>Assessment: {data.assessment}</h3>
            <h4>Current Score: {data.score}</h4>
            <h2>Start/Continue your IDM Assessment</h2>
            <form onSubmit={handleSubmit}>
                <label>assessment
                <input type="text" value={assessment} onChange={handleassessment} />
                </label>
                <br/>
                <label>score
                <input type="text" value={score} onChange={handlescore} />
                </label>
                <br/>
                <input type="submit" value="Update Data"/>
            </form>
        </div>
    )
}

export default UpdatePage