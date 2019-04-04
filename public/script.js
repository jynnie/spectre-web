const socket = io();

// flag if mouse is down
let down = false;

// disconnect socket after a minute of inactivity
let activityTimeout = setTimeout(() => {
    socket.disconnect();
    console.log("Too much time inactive, disconnecting...");
}, 60000);

const mouseDot = document.getElementById("mousedot");
const mousePad = document.getElementById("mousepad");

/**
 * joins the socket room by screen id in input
 */
const joinRoom = () => {
    const id = document.getElementById("roomId");
    socket.emit("user join", id.value);
};

/**
 * drawing where a user is currently clicking on client-side
 * @param {MouseEvent} el
 */
const drawMouseDot = el => {    
    // if mouse is down update mouse pos
    if (down) {
        let x;
        let y;
        if (el.clientX == undefined) {
            x = el.touches[0].clientX;
            y = el.touches[0].clientY;
        } else {
            x = el.clientX;
            y = el.clientY;
        }

        mouseDot.style.visibility = "visible";
        mouseDot.style.top = String(y - 10) + "px";
        mouseDot.style.left = String(x - 10) + "px";

        relPos = getRelMouse(el);
        socket.emit("user point", relPos);
    } else {
    // remove mouse dot
        mouseDot.style.visibility = "hidden";
    }
};

/**
 * return relative position of mouse to top left of mousepad
 * @param {MouseEvent} el
 * @return {Object[number, number]} [x, y]
 */
const getRelMouse = el => {
    let boundingRect = mousePad.getBoundingClientRect();
    let relY;
    let relX;
    if (el.clientX == undefined) {
        relY = (el.touches[0].clientY - boundingRect.top)/boundingRect.height;
        relX = (el.touches[0].clientX - boundingRect.left)/boundingRect.width;
    } else {
        relY = (el.clientY - boundingRect.top)/boundingRect.height;
        relX = (el.clientX - boundingRect.left)/boundingRect.width;
    }
    // console.log(relX, relY);
    // console.log(el);
    return {x: relX, y: relY};
};

mousePad.addEventListener("mousedown", el => {
    down = true;
    drawMouseDot(el);
    resetActivity();
});

mousePad.addEventListener("mousemove", el => {
    drawMouseDot(el);
    resetActivity();
});

document.addEventListener("mouseup", el => {
    down = false;
    drawMouseDot(el);
    socket.emit("user off");
    resetActivity();
});

mousePad.addEventListener("touchstart", el => {
    down = true;
    drawMouseDot(el);
    resetActivity();
});

mousePad.addEventListener("touchmove", el => {
    drawMouseDot(el);
    el.preventDefault();
    resetActivity();
});

document.addEventListener("touchend", el => {
    down = false;
    drawMouseDot(el);
    socket.emit("user off");
    resetActivity();
});

// when active, reset activity timeout
const resetActivity = () => {
    clearTimeout(activityTimeout);
    activityTimeout = setTimeout(() => {
        socket.disconnect();
        console.log("Too much time inactive, disconnecting...");
    }, 60000);
};