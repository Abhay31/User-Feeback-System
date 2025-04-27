import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FeedbackDashboard() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const { data } = await axios.get('https://user-feeback-system.onrender.com/api/feedback');
                setFeedbacks(data);
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFeedbacks();
    }, []);

    const filteredFeedbacks = feedbacks.filter(f => filter ? f.category === filter : true);

    const getCategoryColor = (category) => {
        switch(category) {
            case 'Suggestion': return 'bg-info';
            case 'Bug Report': return 'bg-danger';
            case 'Feature Request': return 'bg-success';
            default: return 'bg-secondary';
        }
    };

    return (
        <div className="container py-4" style={{ maxWidth: '1200px' }}>
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h1 className="display-5 fw-bold text-gradient mb-2">Feedback Dashboard</h1>
                    <p className="text-muted">View and manage user feedback submissions</p>
                </div>
                <Link 
                    to="/add-feedback" 
                    className="btn btn-primary rounded-pill px-4 shadow-sm"
                    style={{
                        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                        border: 'none'
                    }}
                >
                    <i className="bi bi-plus-circle me-2"></i>Add Feedback
                </Link>
            </div>

            {/* Filter Section */}
            <div className="card shadow-sm mb-4 border-0">
                <div className="card-body p-3">
                    <div className="row align-items-center">
                        <div className="col-md-4 mb-2 mb-md-0">
                            <h6 className="mb-0 text-primary fw-bold">
                                <i className="bi bi-funnel me-2"></i>Filter Feedback
                            </h6>
                        </div>
                        <div className="col-md-8">
                            <select 
                                className="form-select form-select-lg border-0 shadow-sm" 
                                onChange={(e) => setFilter(e.target.value)}
                                style={{ backgroundColor: '#f8f9fa' }}
                            >
                                <option value="">All Feedback</option>
                                <option value="Suggestion">💡 Suggestion</option>
                                <option value="Bug Report">🐞 Bug Report</option>
                                <option value="Feature Request">✨ Feature Request</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback List */}
            {isLoading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading feedback...</p>
                </div>
            ) : filteredFeedbacks.length === 0 ? (
                <div className="text-center py-5">
                    <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
                    <h5 className="mt-3">No feedback found</h5>
                    <p className="text-muted">Try changing your filter or submit new feedback</p>
                </div>
            ) : (
                <div className="row g-4">
                    {filteredFeedbacks.map((f) => (
                        <div key={f._id} className="col-md-6 col-lg-4">
                            <div className="card h-100 shadow-sm border-0 hover-shadow">
                                <div className={`card-header py-3 ${getCategoryColor(f.category)} text-white`}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="badge bg-white text-dark rounded-pill">
                                            {f.category}
                                        </span>
                                        <small className="text-white-50">
                                            {new Date(f.createdAt).toLocaleDateString()}
                                        </small>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{f.userName}</h5>
                                    <h6 className="card-subtitle mb-3 text-muted small">{f.email}</h6>
                                    <p className="card-text">{f.feedbackText}</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <small className="text-muted">
                                        Submitted: {new Date(f.createdAt).toLocaleString()}
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FeedbackDashboard;