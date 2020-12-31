//functions

function random()
{
    return Math.floor(Math.random()*256);
}
function randomrgb()
{
    return "rgb("+random()+","+random()+","+random()+")";
}

function changeColor()
{
    this.style.background = randomrgb();
}

//
const container = document.querySelector('.container')

let side = container.clientHeight;

console.log(side);

container.style.height =side;
container.style.width = side;

var n = prompt("enter number of box for each side");
var mside = side/n;

console.log(mside);


newdiv = document.createElement('div');
newdiv.style.cssText = "display:flex; flex-direction: row;"; 
newdiv.style.height=mside + "px";
newdiv.style.width=side + "px";

temdiv = document.createElement('div');
temdiv.classList.add('mini');
temdiv.style.height=mside + "px";
temdiv.style.width=mside + "px";


for(let i=0;i<n;++i)
    newdiv.appendChild(temdiv.cloneNode(true));

for(let i=0;i<n;++i)
    container.appendChild(newdiv.cloneNode(true));

const cells = document.querySelectorAll('.mini');

cells.forEach((div)=>{
    div.addEventListener('mouseover',changeColor);
})
