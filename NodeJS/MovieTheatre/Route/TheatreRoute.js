const express = require("express");
const CookieParser = require("cookie-parser");
var route = express.Router();
route.use(CookieParser());
route.use(express.json());
var tblTheatre = require("../Schema/TheatreSchema");
var tblBooking = require("../Schema/BookingSchema");
const jwt = require("jsonwebtoken");

var bookingInfo = {};

route.post("/insert", (request, response) => {
    var body = request.body;
    var theatre = new tblTheatre(body);

    theatre.save().then((err, data) => {
        if (err)
            response.send(err);
        else
            response.send(data);
    });
});

route.patch("/addmovie/:theatreID", (request, response) => {
    var theatreID = request.params.theatreID;
    var movie = request.body;

    tblTheatre.findByIdAndUpdate(theatreID, movie, (err, data) => {
        if (err)
            response.send(err);
        else
            response.send(data);
    })
});

route.get("/", (request, response) => {
    tblTheatre.find({}, (err, data) => {
        if (err)
            response.send(err);
        else
            response.send(data);
    });
});

route.get("/getmovies/:theatreID", (request, response) => {
    tblTheatre.findById(request.params.theatreID, { "Movie": 1, "_id": 0 }, (err, data) => {
        if (err)
            response.json(err);
        else
            response.json(data);
    });
});

route.get("/checkavailability/:theatreID", (request, response) => {
    var theatreID = request.params.theatreID;
    tblTheatre.findById(theatreID, (err, data) => {
        if (err)
            response.send(err);
        else {
            var movie = data.Movie;
            var arrSeats = [];
            for (var i = 1; i <= movie.Seats; i++) {
                if (!movie.BookedSeats.includes(i))
                    arrSeats.push(i)
            }
            if (arrSeats.length > 0) {
                response.write("Available seats :" + arrSeats + "\n");
                response.write("Booked seats :" + movie.BookedSeats);
                response.end();
            }
            else
                response.json("All seats are booked");
        }
    });
});

route.get("/booking/:theatreID", async (request, response, next) => {
    var token = request.headers.auth;

    var data = await jwt.verify(token, "my_key");
    if (data.role == "admin")
        next();
    else
        response.send(401);
}, (request, response) => {
    var seats = request.body;
    var theatreID = request.params.theatreID;
    tblTheatre.findById(theatreID, (err, data) => {
        var movie = data.Movie;
        var bookedSeats = movie.BookedSeats;

        if (seats.some(data => data > movie.Seats))
            return response.json(400);

        if (seats.some(data => bookedSeats.includes(data)))
            response.json("requested seats are already booked");
        else {
            var UserInfo = {};
            var MovieInfo = {};
            UserInfo.Name = request.cookies.Name;
            MovieInfo.MovieName = movie.Name;
            MovieInfo.TheatreName = data.Name;
            MovieInfo.Seats = seats;
            MovieInfo.Amount = movie.Price * seats.length;

            console.log(bookingInfo);

            var newBooking = new tblBooking({
                "CustID": request.cookies.UserID,
                "TheatreID": data._id,
                "MovieID": movie._id,
                "Seats": seats,
                "Amount": movie.Price * seats.length
            });

            tblBooking.insertMany(newBooking, (err, data) => {
                if (err)
                    response.json(err)
                else {
                    var display = {
                        "Transaction-ID": data[0]._id,
                        "UserInfo": UserInfo,
                        "MovieInfo": MovieInfo
                    }
                    
                    var theatreID = data[0].TheatreID;
                    var seats = data[0].Seats;

                    tblTheatre.findByIdAndUpdate(theatreID, { "$push": { "Movie.BookedSeats": seats } }, (err, data) => {
                        if (err)
                            response.json(err)
                        else
                            response.json(display);
                    })
                }
            });
        }
    });
});

route.patch("/payment/:TID", (request, response) => {
    console.log(request.params.TID);
    tblBooking.findByIdAndUpdate(request.params.TID, { "Status": "Completed" }, (err, data) => {
        if (err)
            response.json(err)
        else
            response.json("Tickets are booked");
    });
});

route.delete("/delete/:TID", (request, response) => {
    tblBooking.findById(request.params.TID, (err, data) => {
        if (err)
            response.json({"error" : err});
        else {
            if (data.Status == "Completed")
                response.json({ "error": "Can not delete because process is already completed" });
            else {
                tblBooking.findByIdAndDelete(request.params.TID, (err, data) => {
                    if (err)
                        response.json({ "err": err });
                    else
                    {
                        console.log(data);
                        tblTheatre.updateOne({"_id" : data.TheatreID}, { "$pullAll": { "Movie.BookedSeats": data.Seats } }, (err, data) => {
                            if (err)
                                response.json(err)
                            else
                                response.json(data);
                        })
                    }
                });
            }
        }

    });
});



module.exports = route;