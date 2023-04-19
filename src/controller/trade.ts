import { Observable } from 'rxjs'
import { Message, ofType } from '../rxws'
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

export default getTrade
