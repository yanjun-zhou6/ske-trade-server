import { Observable, from, mergeMap } from 'rxjs'

const mergeMapFrom =
  <Context>(asyncFunc: (context: Context) => Promise<unknown>) =>
  (observable: Observable<Context>) => {
    return observable.pipe(mergeMap((context) => from(asyncFunc(context))))
  }

export default mergeMapFrom
