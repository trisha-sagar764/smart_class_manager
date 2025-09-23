const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Sample data
const database = {
    statistics: {
        totalStudents: 1250,
        totalTeachers: 45,
        totalClasses: 35,
        attendanceRate: 94
    }
};

// API Routes
app.get('/api/statistics', (req, res) => {
    res.json(database.statistics);
});

app.post('/api/login', (req, res) => {
    const { username, password, userType } = req.body;
    
    // Simple authentication for demo
    if (userType === 'admin' && username === 'admin' && password === 'admin123') {
        res.json({ success: true, user: { name: 'System Admin', type: 'admin' } });
    } else if (userType === 'teacher' && password === '123') {
        res.json({ success: true, user: { name: 'Teacher', type: 'teacher' } });
    } else {
        res.json({ success: false, error: 'Invalid credentials' });
    }
});

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Smart Class Manager running at http://localhost:${PORT}`);
});
