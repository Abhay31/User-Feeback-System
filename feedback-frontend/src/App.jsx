import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import FeedbackDashboard from './components/FeedbackDashboard';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FeedbackDashboard />} />
          <Route path="/add-feedback" element={<FeedbackForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
