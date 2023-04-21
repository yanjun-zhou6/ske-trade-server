import { addTrades } from './add-trades'
import { connect } from './index'
import config from '../config'
;(async () => {
  try {
    const mongoose = await connect(config.db)
    await addTrades(Number(process.env.TRADE_AMOUNT ?? '100'))

    mongoose.connection.close()
    console.log('initialize db successfully')
  } catch (e) {
    console.error(e)
  }
})()
