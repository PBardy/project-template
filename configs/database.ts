import { connect } from 'mongoose'

connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

.then(() => {
  console.log("Database connection established")
})

.catch((error) => {
  console.log(error)
})