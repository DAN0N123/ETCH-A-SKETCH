const container = document.querySelector('.container')
let isMouseDown = false;
const inputButton = document.querySelector('.input')

const clearButton = document.querySelector('.clear')
clearButton.addEventListener('click', clearBoard)

const eraserButton = document.querySelector('.eraser')

let color =  'black'
let toggled = false
eraserButton.addEventListener('click', toggleEraser)

function defineGrid(){
    let input = +prompt('Define size of grid (max 100)');
    if (isNaN(input) || input > 100 || input < 0){
        alert("Please input valid value")
        return defineGrid()
    }
    size = input;
    deleteBoard();
    drawBoard(size);
}
function deleteBoard(){
    const childNodesArray = Array.from(container.childNodes)
    childNodesArray.forEach( (node) =>{container.removeChild(node)})
}
function clearBoard(){
    container.childNodes.forEach( (node) => {node.style.backgroundColor = 'white'})
}
function toggleEraser(){
    toggled = !toggled; 
    eraserButton.style.borderColor = toggled ? '#FD3B3B' : 'black';
    color = toggled ? 'white' : 'black'; 
}

inputButton.addEventListener('click', defineGrid)
function drawBoard(size){
    const tileWidth = (container.clientWidth / size) + 'px'
    for (let i = 0; i<Math.pow(size, 2); i++){
        let tile = document.createElement('div');
        tile.classList.add('tile')
        tile.style.width = tileWidth;
        tile.style.height = tile.style.width;
        tile.style.outline = '2px solid #D3D3D3';
        tile.style.backgroundColor = 'white';
        container.appendChild(tile);
    }
    container.addEventListener('mouseover', (event) => {
        if (isMouseDown && event.target.classList.contains('tile')) {
            event.target.style.backgroundColor = color;
            event.target.style.outline = '2px solid #D3D3D3';
            event.target.offsetHeight;
        }
    });

    container.addEventListener('mousedown', (event) => {
        if (event.button === 0 && event.target.classList.contains('tile')) {
            isMouseDown = true;
            event.target.style.backgroundColor = color;
            event.target.style.outline = '2px solid #D3D3D3';
            event.target.offsetHeight;
            event.preventDefault();
        }
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
    });
}