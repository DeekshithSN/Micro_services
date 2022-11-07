const mongoose = require('mongoose')

const BookingStatus = Object.freeze({
  BOOKED: 'BOOKED',
  SCHEDULED: 'SCHEDULED',
  SPAM: 'SPAM',
  DONE: 'DONE'
})

const Booking = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    phonenumber: {
      type: String,
      required: true,
    },
    servicetype: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true
    },
    status: {
      type: String,
      required: true,
      default: BookingStatus.BOOKED
    },
    ip: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", Booking, 'bookings');
