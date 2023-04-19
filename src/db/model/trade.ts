import mongoose from 'mongoose'
import { random } from '../../helper'

const TradeSchema = new mongoose.Schema(
  {
    tradeId: {
      type: String,
      required: true,
      index: true,
    },
    tradeName: {
      type: String,
      required: true,
    },
    tradeSymbol: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    lastPrice: {
      type: Number,
      required: true,
    },
    traderName: {
      type: String,
      required: true,
    },
    trend: {
      type: String,
      required: true,
    },
    tradeStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'updateTime',
      updatedAt: 'createTime',
    },
    statics: {
      async findByPage({ page, amount, condition = {} }) {
        return await this.find()
          .skip(page * amount)
          .limit(amount)
          .sort({ _id: -1 })
      },
      async findRandom(maxNumber: number) {
        return await this.aggregate([
          { $sample: { size: random(1, maxNumber) } },
        ])
      },
    },
  },
)

export default mongoose.model('trade', TradeSchema)
