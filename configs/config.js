require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb';
const NODE_ENV = process.env.NODE_ENV || 'development';
const JWT_SECRET = process.env.JWT_SECRET || 'SECRET_KEY';

module.exports = {
  PORT, DB_URL, NODE_ENV, JWT_SECRET,
};
