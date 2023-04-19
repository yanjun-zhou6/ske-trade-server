import tradeModel from './model/trade'
import { faker } from '@faker-js/faker'
import { TradeEntity, Direction, TradeStatus } from '../model'
import TRADE_SYMBOLS from './trade-symbol'
import { random } from '../helper'

const generateTradeEntity = (): TradeEntity => {
  return {
    tradeId: faker.datatype.uuid(),
    tradeName: faker.name.lastName(),
    tradeSymbol: TRADE_SYMBOLS[random(0, random.length)],
    currentPrice: Number(faker.finance.amount()),
    lastPrice: Number(faker.finance.amount()),
    traderName: faker.name.fullName(),
    trend: Direction.Origin,
    tradeStatus: TradeStatus.New,
  }
}

export const initData = async (number: number) => {
  const trades = Array.from({ length: number }).map(() => generateTradeEntity())
  await tradeModel.insertMany(trades)
}
