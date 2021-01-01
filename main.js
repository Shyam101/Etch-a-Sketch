const container = document.querySelector('.container');
const clear = document.querySelector('#clear');
const resize = document.querySelector('#resize')
const greyscale = document.querySelector('#greyscale');
const rainbow = document.querySelector('#rainbow');
const picker = document.querySelector('#picker');
const input = document.querySelector('#colorpick');
const notice = document.querySelector('#notice');
const eraser = document.querySelector("#eraser");

let status = "grey";
let col = "#000000";
let side = container.clientHeight;

console.log(side);

container.style.height = side;
container.style.width = side;

var n = 4
adddivs(n);
updatenotice();

//Event Listeners
input.addEventListener('change', function (e) {
    col = e.target.value;
    console.log(col);
})

resize.addEventListener('click', function () {
    container.innerHTML = "";
    n = prompt("enter number of box for each side");
    adddivs(n);
    updatenotice();
});


clear.addEventListener('click', function () {
    const cells = document.querySelectorAll('.mini');

    for (let i = 0; i < cells.length; ++i) cells[i].style.background = "rgb(255,255,255)";
})

greyscale.addEventListener('click', function () {
    clearcheck();
    greyscale.classList.add('checked');
    status = "greyscale";
});

eraser.addEventListener('click', function () {
    clearcheck();
    eraser.classList.add('checked');
    status = "eraser";
});

picker.addEventListener('click', function () {
    clearcheck();
    picker.classList.add('checked');
    status = "picked";
});

rainbow.addEventListener('click', function () {
    clearcheck();
    rainbow.classList.add('checked');
    status = "rainbow";
});


//functions

function adddivs(n) {
    newdiv = document.createElement('div');
    newdiv.style.cssText = "display:flex; flex-direction: row;";

    temdiv = document.createElement('div');
    temdiv.classList.add('mini');
    var mside = side / n;
    temdiv.style.height = mside + "px";
    temdiv.style.width = mside + "px";


    for (let i = 0; i < n; ++i)
        newdiv.appendChild(temdiv.cloneNode(true));

    for (let i = 0; i < n; ++i)
        container.appendChild(newdiv.cloneNode(true));

    const cells = document.querySelectorAll('.mini');

    cells.forEach((div) => {
        div.addEventListener('mouseover', changeColor);
    })
}

function random() {
    return Math.floor(Math.random() * 256);
}
function randomrgb() {
    return "rgb(" + random() + "," + random() + "," + random() + ")";
}

function changeColor() {
    if (status == "picked")
        this.style.background = col;
    else if (status == "rainbow")
        this.style.background = randomrgb();
    else if (status == "eraser")
        this.style.background = "rgb(255,255,255)";
    else {
        console.log(this.style.backgroundColor);
        if (this.style.backgroundColor.match(/rgba/)) {
            let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
            if (currentOpacity <= 0.9) {
                this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
            }
        }
        else if (this.style.backgroundColor == 'rgb(0, 0, 0)') 
            return;
        else 
        {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        }
        console.log(this.style.backgroundColor.match(/rgba/));
    }
}

function clearcheck() {
    greyscale.classList.remove('checked');
    rainbow.classList.remove('checked');
    picker.classList.remove('checked');
    eraser.classList.remove('checked');
}

function updatenotice(){
    notice.textContent = "Current grid size: " + n + " X " + n; 
}