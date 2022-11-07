const asyncHandler = require('express-async-handler');
const { httpRequestTimer, counter } = require('../metrics');
const Booking = require('../models/bookingModel');

const { sendMail } = require('../utils/mail');

const createBooking = asyncHandler(async (req, res) => {
    const apiPath = req.baseUrl;
    const end = httpRequestTimer.startTimer();
    const { name, email, phonenumber, servicetype, location, image, ip } = req.body;

    const prevBooking = await Booking.findOne({ ip, createdAt: { $gt: new Date(Date.now() - 120000) } });

    if (prevBooking) {
        counter.labels('Booking Blocked', '400').inc();
        const route = apiPath;
        end({ route, code: res.statusCode, method: req.method });
        res.status(400)
        throw new Error("Please wait for a while");
    }

    const booking = await Booking.create({
        name,
        email,
        phonenumber,
        servicetype,
        location,
        image,
        ip
    });

    if (booking) {
        await sendMail(email, name, "user")
        await sendMail(process.env.ADMIN_EMAIL, name, "admin")
        counter.labels('Booking Success', '201').inc();
        const route = apiPath;
        end({ route, code: res.statusCode, method: req.method });
        res.status(201).json({ booking });
    } else {
        counter.labels('Booking Error Occured', '400').inc();
        const route = apiPath;
        end({ route, code: res.statusCode, method: req.method });
        res.status(400)
        throw new Error("Error occured");
    }

});

module.exports = { createBooking };
