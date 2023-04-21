import { Observable } from 'rxjs'
import { Message, ofType, composeControllers } from '../rxws'
import mergeMapFrom from '../operators/merge-map-from'
import tradeModel from '../db/model/trade'

const getTrade = (rootObservable: Observable<Message>) => {
  return rootObservable.pipe(
    ofType('getTrades'),
    mergeMapFrom(async (message) => {
      const { page, amount } = message
      const totalAmount = await tradeModel.estimatedDocumentCount()
      const trades = await tradeModel.findByPage({
        page,
        amount: (amount as number) < totalAmount ? amount : totalAmount,
      })
      return { eventType: 'getTrades', data: { trades, totalAmount } }
    }),
  )
}

const deleteTrade = (rootObservable: Observable<Message>) => {
  return rootObservable.pipe(
    ofType('deleteTrade'),
    mergeMapFrom(async (message) => {
      const { tradeId } = message
      const deleted = await tradeModel.deleteByTradeId(tradeId as string)
      const totalAmount = await tradeModel.estimatedDocumentCount()
      return { eventType: 'deleteTrade', data: { deleted, totalAmount } }
    }),
  )
}

export default composeControllers(getTrade, deleteTrade)
