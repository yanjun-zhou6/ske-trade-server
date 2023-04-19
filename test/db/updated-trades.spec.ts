import mongoose from 'mongoose'
import { randomPickTrades, updateTradePrices } from '../../src/db/update-trades'
import { connect } from '../../src/db'
import config from '../../src/config'

beforeAll(async () => {
  await connect(config.db)
})

afterAll(async () => {
  await mongoose.connection.close()
})

test('randomly pick up trades to update', async () => {
  const pickedTrades = await randomPickTrades(1)
  const updatedTades = await updateTradePrices(pickedTrades)
  expect(pickedTrades).toHaveLength(1)
  expect(updatedTades[0].modifiedCount).toBe(1)
})
