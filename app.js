const express = require("express");
const path = require("path");
const app = express();

const PORT = 8080;

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

/**
 * Generates random 4 character string for UID
 * Used for screen codes
 * credit: https://gist.github.com/gordonbrander/2230317
 * @return {string}
 */
const generateUID = () => {
    return (Math.random().toString(36).substr(2, 4)).toUpperCase();
};

// electron app connecting for the first time
// returns the app its id number
app.get("/screen", (req, res) => {
    let screenid = generateUID();
    console.log(`New screen ${screenid}!`);
    res.send({screenid});
});

// socket connection
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
    socket.name = ""; // if screen, this has the screen's id

    // screen on first connect creates its own socket room
    socket.on("screen register", uid => {
        let roomID = String(uid).toUpperCase();
        socket.name = roomID; // screen uid serves as socket room id
        socket.join(roomID);
        socket.room = roomID;
        console.log(`Screen ${roomID} reporting`)
    });

    // user joins a socket room with a screen
    socket.on("user join", uid => {
        let roomID = String(uid).toUpperCase();
        socket.join(roomID);
        socket.room = roomID;
        console.log(`User ${socket.id} joining ${uid}`);
        
        // tells screen in the room that a new user has entered
        io.sockets.in(roomID).emit("new user", socket.id);
    });

    socket.on("user point", relPos => {
        // tells screen new relative position
        // console.log(`New point at (${relPos.x}, ${relPos.y})`);
        io.sockets.in(socket.room).emit("point update", socket.id, relPos);
    });

    socket.on("user off", () => {
        // tells screen no longer pointing
        io.sockets.in(socket.room).emit("point off", socket.id);
    });

    // on user disconnect, kill user circle
    socket.on("disconnect", () => {
        io.sockets.in(socket.room).emit("point off", socket.id);
    });
});

http.listen(PORT, () => {
    console.log(`Running Spectre on port ${PORT}!`);
});
