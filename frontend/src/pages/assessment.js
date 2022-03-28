import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { navigate, Link } from 'gatsby'
import "../styles/index.css";

const AssessmentPage = ({location}) => {
    //`${process.env.GATSBY_API_URL}`
    const baseUrl = "http://127.0.0.1:8000/api/idms/";
    const [data, setData] = useState([]);
    const [assessment, setAssessment] = useState([]);
    const [score, setScore] = useState([]);

    useEffect(() => {
        const url = baseUrl + location.state.id;
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
    }, [location])

    function handleassessment(e){
        setAssessment(e.target.value);
    }

    function handlescore(e){
        setScore(e.target.value);
    }

    function handleUpdate(e){
        e.preventDefault();
        const updateIDM = {
            assessment: assessment,
            score: score,
            action_plan: data.action_plan,
            action_plan_completed: data.action_plan_completed
        }
        axios.put(baseUrl + data.id, updateIDM)
            .then(response => {
                console.log(response);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    function handleSubmit(e){
        e.preventDefault();
        const updateIDM = {
            assessment: assessment,
            score: score,
            action_plan: `You need to beat ${score} next time`,
            action_plan_completed: data.action_plan_completed
        }
        axios.put(baseUrl + data.id, updateIDM)
            .then(response => {
                console.log(response);
                navigate('/');  
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <Link to="/">BACK</Link>
            <h1>Assessment Page</h1>
            <h3>Assessment: {data.assessment}</h3>
            <h4>Current Score: {data.score}</h4>
            <h2>Start/Continue your IDM Assessment</h2>
            <form onSubmit={handleSubmit}>
                <label>Assessment
                <input type="text" value={assessment} onChange={handleassessment} />
                </label>
                <br/>
                <label>Score
                <input type="text" value={score} onChange={handlescore} />
                </label>
                <br/>
                <input type="button" value="Update Assessment" onClick={handleUpdate} />
                <br/>
                <input type="submit" value="Submit Assessment"/>
            </form>
        </div>
    )
}

export default AssessmentPage