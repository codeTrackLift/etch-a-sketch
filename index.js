// global variables
const grid = document.querySelector('#container');
const square = document.querySelector('div');
let gridSize = 16;
let hue = 0;

// make grid
createGrid = () => {
    for(let i = 0; i < 256; i++) {
        let div = document.createElement('div');
        div.classList.add('square');
        grid.appendChild(div);
    }
};
createGrid();

// resize button
function resizeGrid() {
    gridSize = prompt("How many pixels would you like?","Enter a number between 1 and 100...");
    if(gridSize > 100 || gridSize <= 0 || isNaN(gridSize)) {
        resizeGrid();
    } 
    grid.innerHTML = "";
    grid.style.setProperty(
        'grid-template-columns', 
        `repeat(${gridSize}, 1fr)`
        );
    grid.style.setProperty(
        'grid-template-rows',
        `repeat(${gridSize}, 1fr)`
        );
    for (let i = 0; i < gridSize * gridSize; i++) {
        const div = document.createElement('div');
        div.classList.add('square');
        grid.appendChild(div);
    }
console.log(gridSize);
};
        
// hover change color using rainbow colors
container.addEventListener('mouseover', function(grid) {
    grid.target.style.background = `hsl(${hue}, 100%, 50%)`;
    hue += 10;
}, 
false);

// clear button function
const clearBtn = document.querySelector("#btnClear");
clearBtn.addEventListener('click',function() {
    grid.innerHTML = "";
    grid.style.setProperty(
        'grid-template-columns', 
        `repeat(${gridSize}, 1fr)`
    );
    grid.style.setProperty(
        'grid-template-rows',
        `repeat(${gridSize}, 1fr)`
    );
    for (let i = 0; i < gridSize * gridSize; i++) {
        const div = document.createElement('div');
        div.classList.add('square');
        grid.appendChild(div);
    }
    console.log(gridSize);
});

// ***arrow draw section***
// Select the elements on the page - CanvasGradient, Shake - Button
const canvas = document.querySelector('#sketch');
console.log(canvas);
const ctx = canvas.getContext('2d');
const clrBtn = document.querySelector('.clrRight');
const moveAmount = 10;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`

// Setup canvas for drawing
const { width, height } = canvas; // height & width from HTML
console.log(width, height);
// Random starting position
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 30;
ctx.beginPath(); // Start the drawing (pen to paper)
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Arrow draw function
function draw({key}) {
    console.log(key);
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    switch(key) {
        default:
            break;
        case 'ArrowUp':
            y -= moveAmount;
            break;
        case 'ArrowRight':
            x += moveAmount;
            break;
        case 'ArrowDown':
            y += moveAmount;
            break;
        case 'ArrowLeft':
            x -= moveAmount;
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

// Write handler for arrow keys
function keyPress(event) {
    if(event.key.includes('Arrow')) {
        event.preventDefault();
        draw({key: event.key});
    };
}

// Clear function
function clearFunc() {
    ctx.clearRect(0, 0, width, height);
    console.log('cleared');
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Listen for arrow keys and right clear button
window.addEventListener('keydown', keyPress);
clrBtn.addEventListener("click", clearFunc);