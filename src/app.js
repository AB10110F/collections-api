const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const fieldRoutes = require('./routes/fieldRoutes');
const fieldValueRoutes = require('./routes/fieldValueRoutes');
const likeRoutes = require('./routes/likeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const tagRoutes = require('./routes/tagRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Handle preflight
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', collectionRoutes);
app.use('/api', fieldRoutes);
app.use('/api', itemRoutes);
app.use('/api', fieldValueRoutes);
app.use('/api', likeRoutes);
app.use('/api', commentRoutes);
app.use('/api', tagRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
