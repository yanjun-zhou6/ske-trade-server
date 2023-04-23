import { ofType, composeControllers, Controller } from '../rxws'
import mergeMapFrom from '../operators/merge-map-from'
import tradeModel from '../db/model/trade'
import { ResponseCode } from '../types'

const getTrade: Controller<{ page: number; amount: number }> = (
  rootObservable,
) => {
  return rootObservable.pipe(
    ofType('getTrades'),
    mergeMapFrom(async (message) => {
      const { page, amount } = message
      const totalAmount = await tradeModel.estimatedDocumentCount()
      const hasMore = page * amount < totalAmount
      const trades = await tradeModel.findByPage({
        page,
        amount,
      })

      return {
        eventType: 'getTrades',
        code: ResponseCode.Success,
        data: { trades, totalAmount, hasMore },
      }
    }),
  )
}

const deleteTrade: Controller<{ tradeId: string }> = (rootObservable) => {
  return rootObservable.pipe(
    ofType('deleteTrade'),
    mergeMapFrom(async (message) => {
      const { tradeId } = message
      const { deletedCount } = await tradeModel.deleteByTradeId(tradeId)
      const totalAmount = await tradeModel.estimatedDocumentCount()

      return {
        eventType: 'deleteTrade',
        code: deletedCount === 1 ? ResponseCode.Success : ResponseCode.Failure,
        data: { totalAmount },
      }
    }),
  )
}

export default composeControllers(getTrade, deleteTrade)
