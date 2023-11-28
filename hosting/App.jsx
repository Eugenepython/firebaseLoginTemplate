// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Yourpage from './Yourpage';

const App = () => {
    return (
        <Router>
            <div>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/yourpage" element={<Yourpage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
