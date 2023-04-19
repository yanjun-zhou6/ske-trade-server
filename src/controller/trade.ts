import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Message, ofType } from '../rxws'

const getTrade = (rootObservable: Observable<Message>): Observable<unknown> => {
  return rootObservable.pipe(
    ofType('trades'),
    map((message) => {
      console.log(message)
    }),
  )
}

export default getTrade
