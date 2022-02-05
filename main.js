const topleft = document.querySelector('.panel1');
const topright = document.querySelector('.panel2');
const bottomleft = document.querySelector('.panel3');
const bottomright = document.querySelector('.panel4');



const getRandomPanel = () => {
    const panels = [topleft , bottomright, topright, bottomleft];
    return panels[parseInt(Math.random()*panels.length)];
};

let sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];

const flash = (panel) => {
    return new Promise((resolve, reject)=>{
        panel.className += ' active';
        setTimeout(()=>{
            panel.className = panel.className.replace(' active', ' ');
            setTimeout(()=>{
                resolve();
                }, 250);
        }, 1000);
    });
};

topleft.addEventListener('click', panelClicked);
topright.addEventListener('click', panelClicked);
bottomleft.addEventListener('click', panelClicked);
bottomright.addEventListener('click', panelClicked);

let canClick = false;

function panelClicked(e){
    if(!canClick) return;
    if(e.currentTarget == sequenceToGuess.shift()){
        if(sequenceToGuess.length === 0){
            //Continue with the sequence
            sequence.push(getRandomPanel());
            sequenceToGuess=[...sequence];
            startClicking();
        }
    }
    else{
        // end the game
        alert("game over");
    }
}

const startClicking = async () => {
    canClick=false;
    for (let index = 0; index < sequence.length; index++) {
        await flash(sequence[index]);
    }
    canClick = true
};

startClicking();