import { connect } from '../db'
import { timingModifer } from '../db/update-trades'
import config from '../config'

connect(config.db)
  .then(() => {
    timingModifer(config.modifyPeriod, 9, 1).subscribe({
      next: console.log,
      error: console.error,
    })
  })
  .catch(console.error)
