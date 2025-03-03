const mongoose = require ('mongoose');
require ('dotenv').config();

const connectToDatabase =  async () => {
    try {
        const connectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
await mongoose.connect(process.env.DATABASE_URL, connectionOptions);
console.log('Connected to Database');
    } catch (error) {
        console.error(`Database connection error: ${error}`);
    }
};

connectToDatabase();
  module.exports = connectToDatabase;