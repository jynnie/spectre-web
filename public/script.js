const socket = io();

// flag if mouse is down
let down = false;

const mouseDot = document.getElementById("mousedot");
const mousePad = document.getElementById("mousepad");

/**
 * joins the socket room by screen id in input
 */
const joinRoom = () => {
    const id = document.getElementById("roomId");
    socket.emit("user join", id.value);
}

/**
 * drawing where a user is currently clicking on client-side
 * @param {MouseEvent} el
 */
const drawMouseDot = el => {    
    // if mouse is down update mouse pos
    if (down) {
        let x = el.x;
        let y = el.y;

        mouseDot.style.visibility = "visible";
        mouseDot.style.top = String(y - 10) + "px";
        mouseDot.style.left = String(x - 10) + "px";

        relPos = getRelMouse(el);
        socket.emit("user point", relPos);
    } else {
    // remove mouse dot
        mouseDot.style.visibility = "hidden";
    }
}

/**
 * return relative position of mouse to top left of mousepad
 * @param {MouseEvent} el
 * @return {Object[number, number]} [x, y]
 */
const getRelMouse = el => {
    let boundingRect = mousePad.getBoundingClientRect();
    let relY = (el.y - boundingRect.top)/boundingRect.height;
    let relX = (el.x - boundingRect.left)/boundingRect.width;
    console.log(relX, relY);
    return {x: relX, y: relY};
}

mousePad.addEventListener("mousedown", el => {
    down = true;
    drawMouseDot(el);
})

mousePad.addEventListener("mousemove", el => {
    drawMouseDot(el);
})

document.addEventListener("mouseup", el => {
    down = false;
    drawMouseDot(el);
    socket.emit("user off");
})