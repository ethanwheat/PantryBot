// pantrybot-backend/index.js 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const config = require('./config');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const groceryRoutes = require('./routes/groceries');
const recipeLookupRoutes = require('./routes/recipeLookup');

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/groceries', groceryRoutes);
app.use('/api/recipeLookup', recipeLookupRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
