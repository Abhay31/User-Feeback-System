import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function FeedbackForm() {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        feedbackText: '',
        category: 'Suggestion'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/feedback', formData);
            setFormData({ userName: '', email: '', feedbackText: '', category: 'Suggestion' });
            navigate('/')
        } catch (err) {
            alert('Error submitting feedback');
        }
    };

    return (
        <div className="container mt-4 mb-5" style={{ maxWidth: '800px' }}>
            {/* Header with Back Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="text-gradient">
                    <h1 className="display-5 fw-bold">Share Your Thoughts</h1>
                </div>
                <Link to="/" className="btn btn-outline-primary rounded-pill px-4">
                    <i className="bi bi-arrow-left me-2"></i>Back to Dashboard
                </Link>
            </div>

            <div className="card shadow-lg border-0">
                <div className="card-header bg-primary text-white py-3">
                    <h2 className="h4 mb-0 text-center">
                        <i className="bi bi-chat-square-text me-2"></i>Feedback Form
                    </h2>
                </div>
                <div className="card-body p-4 p-md-5">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="userName" className="form-label fw-bold text-primary">
                                Your Name
                            </label>
                            <input
                                id="userName"
                                name="userName"
                                placeholder="Enter your name"
                                value={formData.userName}
                                onChange={handleChange}
                                required
                                className="form-control form-control-lg border-2"
                                style={{ borderColor: '#ced4da' }}
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label fw-bold text-primary">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-control form-control-lg border-2"
                                style={{ borderColor: '#ced4da' }}
                            />
                            <small className="text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="feedbackText" className="form-label fw-bold text-primary">
                                Your Feedback
                            </label>
                            <textarea
                                id="feedbackText"
                                name="feedbackText"
                                placeholder="Share your thoughts with us..."
                                value={formData.feedbackText}
                                onChange={handleChange}
                                required
                                className="form-control form-control-lg border-2"
                                style={{ borderColor: '#ced4da', minHeight: '150px' }}
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="category" className="form-label fw-bold text-primary">
                                Feedback Type
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="form-select form-select-lg border-2"
                                style={{ borderColor: '#ced4da' }}
                            >
                                <option value="Suggestion">💡 Suggestion</option>
                                <option value="Bug Report">🐞 Bug Report</option>
                                <option value="Feature Request">✨ Feature Request</option>
                            </select>
                        </div>
                        
                        <div className="d-grid mt-5">
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-lg w-75 mx-auto rounded-pill py-2 fw-bold shadow"
                                style={{
                                    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                                    border: 'none'
                                }}
                            >
                                <i className="bi bi-send-fill me-2"></i>Submit Feedback
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div className="text-center mt-4 text-muted">
                <small>Thank you for helping us improve!</small>
            </div>
        </div>
    );
}

export default FeedbackForm;