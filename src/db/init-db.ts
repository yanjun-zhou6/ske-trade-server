import { addTrades } from './add-trades'
import { connect } from './index'
import config from '../config'
;(async () => {
  try {
    const mongoose = await connect(config.db)
    await addTrades(config.initTraderNumber)

    mongoose.connection.close()
    console.log('initialize db successfully')
  } catch (e) {
    console.error(e)
  }
})()
