import mongoose from 'mongoose';
import { STATUS, TEAM } from '../ utils/constants.js';


const StratSchema = new mongoose.Schema(
  {
    stratName: String,
    stratDescription: String,
    statusOptions: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.PENDING,
    },
    Team: {
      type: String,
      enum: Object.values(TEAM),
      default: TEAM.BOTH,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Strat', StratSchema);