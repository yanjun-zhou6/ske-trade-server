import mongoose, { Mongoose } from 'mongoose'

export const connect = async (url: string): Promise<Mongoose> => {
  mongoose.connection.on('error', (err) => {
    console.error(err)
  })
  return await mongoose.connect(url)
}
