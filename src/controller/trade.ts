import { Observable } from 'rxjs'
import { Message, ofType, composeControllers } from '../rxws'
import mergeMapFrom from '../operators/merge-map-from'
import tradeModel from '../db/model/trade'

const getTrade = (rootObservable: Observable<Message>): Observable<unknown> => {
  return rootObservable.pipe(
    ofType('getTrades'),
    mergeMapFrom(async (message) => {
      const { page, amount } = message
      const totolAmount = await tradeModel.estimatedDocumentCount()
      const trades = await tradeModel.findByPage({ page, amount })
      return { data: { trades, totolAmount } }
    }),
  )
}

const deleteTrade = (
  rootObservable: Observable<Message>,
): Observable<unknown> => {
  return rootObservable.pipe(
    ofType('deleteTrade'),
    mergeMapFrom(async (message) => {
      const { tradeId } = message
      const deleted = await tradeModel.deleteByTradeId(tradeId as string)
      const totolAmount = await tradeModel.estimatedDocumentCount()
      return { data: { deleted, totolAmount } }
    }),
  )
}

export default composeControllers(getTrade, deleteTrade)
