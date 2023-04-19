import { faker } from '@faker-js/faker'
import { interval } from 'rxjs'
import tradeModel from '../db/model/trade'
import { TradeEntity } from '../model'
import mergeMapFrom from '../operators/merge-map-from'
import { addTrades } from '../db/init-trades'

export const randomPickTrades = async (amount: number) =>
  await tradeModel.findRandom(amount)

export const updateTradePrices = async (pickedTrades: TradeEntity[]) => {
  return await Promise.all(
    pickedTrades.map(async (trade) => {
      return await tradeModel.updateOne(
        { tradeId: trade.tradeId },
        {
          currentPrice: Number(faker.finance.amount()),
          lastPrice: trade.currentPrice,
        },
      )
    }),
  )
}

export const addTradePrices = async (amount: number) => await addTrades(amount)

export const timingModifer = (
  period: number,
  updateAmount: number,
  addAmount: number,
) => {
  return interval(period).pipe(
    mergeMapFrom(async () => {
      const pickedTrades = await randomPickTrades(updateAmount)
      const updateRes = await updateTradePrices(pickedTrades)
      const addRes = await addTradePrices(addAmount)
      return { updateRes, addRes }
    }),
  )
}
