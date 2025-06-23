const getPowerBtn = document.getElementById('PowerBtn');
const getRedContainer = document.getElementById('redContainer');
const getYellowContainer = document.getElementById('YellowConatiner');
const getBlueContainer = document.getElementById('blueContainer');
const getGreenContainer = document.getElementById('greenContainer');
const getStartBtn = document.getElementById('StartBtn');
const getStatus = document.getElementById('status');

const getGreenSound = document.getElementById(`sound1`);
const getBlueSound = document.getElementById(`sound2`);
const getRedSound = document.getElementById(`sound3`);
const getYellowSound = document.getElementById(`sound4`);
const getWinsSound = document.getElementById(`sound5`);
const getLostSound = document.getElementById(`sound6`);


let RandomIndexArray = [];
let UserIndexArray = [];
let containers = [getRedContainer, getGreenContainer, getYellowContainer, getBlueContainer];
let AudioContainers = [getRedSound, getGreenSound, getYellowSound, getBlueSound];

let value = 0;
let isStart = true;
let StartBtn = document.getElementById('StartBtn');

function getColor(container) {
    if (container === getRedContainer) {
        return 'rgb(231, 33, 33)';
    }
    else if (container === getGreenContainer) {
        return 'rgb(44, 233, 44)';
    }
    else if (container === getYellowContainer) {
        return 'rgb(234, 255, 47)';
    }
    else if (container === getBlueContainer) {
        return 'rgb(49, 75, 248)';
    }
    return '';

}


function getAudio(index) {
    return AudioContainers[index];
}
function ShowPriviousColors() {

    containers.forEach(container => {
        container.style.pointerEvents = 'none';
    });

    for (let i = 0; i < RandomIndexArray.length; i++) {
        setTimeout(() => {
            containers[RandomIndexArray[i]].style.backgroundColor = getColor(containers[RandomIndexArray[i]]);
            getAudio(RandomIndexArray[i]).play();

        }, (i + 1) * 500 + 200);
        setTimeout(() => {
            containers[RandomIndexArray[i]].style.backgroundColor = '';
        }, (i + 2) * 500);
    }

    setTimeout(() => {
        containers.forEach(container => {
            container.style.pointerEvents = 'auto';
        });
    }, (RandomIndexArray.length + 1) * 500 + 200);

}
function resetGame() {
    RandomIndexArray = [];
    UserIndexArray = [];
    value = 0;
    isStart = true;
    getStatus.innerText = 0;
    containers.forEach(container => {
        container.style.pointerEvents = 'auto';
    });
}
function randomColorGenerator() {
    
    let randomNo = Math.floor(Math.random() * containers.length);
    RandomIndexArray.push(randomNo);
    getStatus.innerText = `${++value}`;

    console.log('rand:', RandomIndexArray);
    setTimeout(() => {
        containers[randomNo].style.backgroundColor = getColor(containers[randomNo]);
        getAudio(randomNo).play();
    }, (RandomIndexArray.length + 1) * 500);
    setTimeout(() => {
        containers[randomNo].style.backgroundColor = '';

    }, (RandomIndexArray.length + 2) * 500);


    // }
    UserIndexArray = [];

}
let isUserClickAttached = false;

function userClick() {
    if (isUserClickAttached)
        return;
    isUserClickAttached = true;

    containers.forEach((container, index) => {
        container.addEventListener('click', () => {


            UserIndexArray.push(index);
            console.log('User:', UserIndexArray);
            container.style.backgroundColor = getColor(container);
            getAudio(index).play();
            setTimeout(() => {
                container.style.backgroundColor = '';
            }, (300));
             if (UserIndexArray[UserIndexArray.length - 1] !== RandomIndexArray[UserIndexArray.length - 1]) {

                getStatus.innerText = 'You Lost!'
                getLostSound.play();

                  setTimeout(() => {
                    getPowerBtn.click();

                }, (1500));


            }

            if (UserIndexArray.length === RandomIndexArray.length && getStatus.innerText !== 'You Lost!') {
                if (value === 5) {
                    document.getElementById('status').innerText = `You Wins!`;
                    getWinsSound.play();
                    setTimeout(() => {
                        getPowerBtn.click();
    
                    }, (1500));
                }
               
                else {
                    UserIndexArray = [];
                    ShowPriviousColors();
                    randomColorGenerator();
                
                }
            }
        });
    });

}

        


function StartGame() {
    if (isStart) {
        randomColorGenerator();
        isStart = false;
        userClick();

    }
}




getStartBtn.addEventListener('click', () => {
    if (getPowerBtn.classList.contains('checked')) {
        StartGame();
    } else {
        console.log(' not activated.');
    }
});



getPowerBtn.addEventListener('click', () => {
    if (getPowerBtn.classList.contains(`checked`)) {
        resetGame();
    }
    getPowerBtn.classList.toggle('checked');
    
    containers[0].style.backgroundColor = getColor(containers[0]);

    setTimeout(() => {
        containers[0].style.backgroundColor='';
        containers[1].style.backgroundColor = getColor(containers[1]);
    }, 200);
    setTimeout(() => {
        containers[1].style.backgroundColor='';
        containers[2].style.backgroundColor = getColor(containers[2]);
    }, 400);
    setTimeout(() => {
        containers[2].style.backgroundColor='';
        containers[3].style.backgroundColor = getColor(containers[3]);

    }, 600);
    setTimeout(() => {
        containers[3].style.backgroundColor='';
        containers[0].style.backgroundColor = getColor(containers[0]);
    }, 800);
    setTimeout(() => {
        containers[0].style.backgroundColor='';
    }, 1000);

    setTimeout(() => {
        containers.forEach((container) => {
            container.style.backgroundColor = getColor(container);
        });
    }, 1200);
    setTimeout(() => {
        containers.forEach((container) => {
            container.style.backgroundColor = '';
        });
    }, 1500);
    setTimeout(() => {
        containers.forEach((container) => {
            container.style.backgroundColor = getColor(container);
        });
    }, 1800);
    setTimeout(() => {
        containers.forEach((container) => {
            container.style.backgroundColor = '';
        });
    }, 2100);

    document.getElementById('status').innerText = 0;
});

