import mongoose from 'mongoose';
import ticketSchema from './ticket'
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: 'String', required: true },
  tickets: { type: [ticketSchema], required: true, default: [] },
  googleid: { type: 'String', required: true },
  //   slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  // dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('User', userSchema);
