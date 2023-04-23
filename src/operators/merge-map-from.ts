import { Observable, from, mergeMap } from 'rxjs'

const mergeMapFrom =
  <Context, ReturnType>(asyncFunc: (context: Context) => Promise<ReturnType>) =>
  (observable: Observable<Context>) => {
    return observable.pipe(mergeMap((context) => from(asyncFunc(context))))
  }

export default mergeMapFrom
