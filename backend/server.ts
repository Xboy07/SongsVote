import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import songRoutes from './routes/songRoutes';
import adminRoutes from './routes/adminRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://0.0.0.0/songdb';

app.use(cors({origin: '*'}));
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use('/api/songs', songRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
