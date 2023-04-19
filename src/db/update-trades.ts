import { faker } from '@faker-js/faker'
import tradeModel from '../db/model/trade'

const updateTrades = async () => {
  const waitUpdatedTrades = await tradeModel.findRandom(11)
  const updatedTrades = waitUpdatedTrades.map((trade) => {
    return {
      ...trade,
      currentPrice: Number(faker.finance.amount()),
      lastPrice: Number(faker.finance.amount()),
    }
  })
  await tradeModel.updateMany(updatedTrades)
}
