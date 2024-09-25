import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feedback.css';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [newFeedback, setNewFeedback] = useState({ user: '', message: '', status: 'Pending' });

    // Fetch previous feedbacks when the component mounts
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/feedback');
                console.log("Fetched feedbacks:", response.data); // Debugging
                setFeedbacks(response.data);
                console.log("State updated with feedbacks:", feedbacks); // Check if state is being updated
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };
    
        fetchFeedbacks();
    }, []);
   

    const handleChange = (e) => {
        setNewFeedback({ ...newFeedback, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const feedbackWithDate = { ...newFeedback, date: new Date().toISOString() }; // Set current date
        try {
            const response = await axios.post('http://localhost:8080/api/feedback', feedbackWithDate);
            console.log("Posted feedback:", response.data); // Debugging
            setFeedbacks([...feedbacks, response.data]); // Add new feedback to the list
            setNewFeedback({ user: '', message: '', status: 'Pending' });
        } catch (error) {
            console.error('Error posting feedback:', error);
        }
    };

    return (
        <div className="feedback-container">
            <h2>User Feedbacks</h2>
            
            <div className="feedback-list">
                {feedbacks.length > 0 ? feedbacks.map(feedback => (
                    <div key={feedback.id} className="feedback-item">
                        <p><strong>{feedback.user}</strong> - {new Date(feedback.date).toLocaleDateString()}</p>
                        <p>{feedback.message}</p>
                        <p>Status: {feedback.status}</p>
                    </div>
                )) : <p>No feedbacks available.</p>}
            </div>

            <h2>Add Your Feedback</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="user" 
                    placeholder="Your Name" 
                    value={newFeedback.user} 
                    onChange={handleChange} 
                    required 
                />
                <textarea 
                    name="message" 
                    placeholder="Your Feedback" 
                    value={newFeedback.message} 
                    onChange={handleChange} 
                    required 
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Feedback;