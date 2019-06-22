const express = require('express');
const connectDB = require('./config/db')


const app = express();

connectDB();

app.get('/', (req, res) => res.send('Ok!!!'))

app.use(express.json({ extended: true }));
//Define routes

app.use('/api/users', require('./routes/users'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/post', require('./routes/posts'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));