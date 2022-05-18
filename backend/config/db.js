const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`Connected to MongoDB : ${conn.connection.host}`.green.underline)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB