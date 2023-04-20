import { faker } from '@faker-js/faker'
import { interval } from 'rxjs'
import tradeModel from '../db/model/trade'
import { TradeEntity } from '../model'
import mergeMapFrom from '../operators/merge-map-from'
import { addTrades } from './add-trades'
import { random } from '../helper'

export const randomPickTrades = async (maxAmount: number) =>
  await tradeModel.findRandom(maxAmount)

export const updateTradePrices = async (pickedTrades: TradeEntity[]) => {
  return await Promise.all(
    pickedTrades.map(async (trade) => {
      return await tradeModel
        .updateOne(
          { tradeId: trade.tradeId },
          {
            currentPrice: Number(faker.finance.amount()),
            lastPrice: trade.currentPrice,
          },
        )
        .findOne({ tradeId: trade.tradeId })
    }),
  )
}

export const addTradePrices = async (amount: number) => await addTrades(amount)

export const timingModifer = (
  period: number,
  maxUpdateAmount: number,
  maxAddAmount: number,
) => {
  return interval(period).pipe(
    mergeMapFrom(async () => {
      const pickedTrades = await randomPickTrades(maxUpdateAmount)
      const updateRes = await updateTradePrices(pickedTrades)
      const addRes = await addTradePrices(random(0, maxAddAmount))
      const totolAmount = await tradeModel.estimatedDocumentCount()
      return { data: { updateRes, addRes, totolAmount } }
    }),
  )
}
