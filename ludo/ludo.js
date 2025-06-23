
const redDiceContainer = document.querySelector('.redDiceContainer');
const greenDiceContainer = document.querySelector('.greenDiceContainer');
const blueDiceContainer = document.querySelector('.blueDiceContainer');
const yellowDiceContainer = document.querySelector('.YellowDiceContainer');
const setDiceContainer = [redDiceContainer, greenDiceContainer, yellowDiceContainer, blueDiceContainer];
const RedContainer = document.querySelector('.RedContainer');
const GreenContainer = document.querySelector('.GreenContainer');
const BlueContainer = document.querySelector('.BlueContainer');
const YellowContainer = document.querySelector('.YellowContainer');
const setActiveTokenContainer = [RedContainer, GreenContainer, YellowContainer, BlueContainer];
const RedStepsContainer = document.querySelector('.RedStepsContainer');
const GreenStepsContainer = document.querySelector('.GreenStepsContainer');
const BlueStepsContainer = document.querySelector('.BlueStepsContainer');
const YellowStepsContainer = document.querySelector('.YellowStepsContainer');
const setStepsContainer = [RedStepsContainer, GreenStepsContainer, YellowStepsContainer, BlueStepsContainer];
const getDice = document.querySelector('.dice');
const setcontainer = ['redColor', 'greenColor', 'YellowColor', 'blueColor'];
const setcolors = ['red', 'green', 'yellow', 'blue'];
const getNameContainer = document.querySelector('.nameContainer');
const getPlayButton = document.getElementById('play');
const getTokenName = document.querySelectorAll('.TokenName');
const getSelectToken = document.querySelectorAll('input');
getPlayButton.addEventListener('click', ablePlayBtn);
redDiceContainer.querySelector('.dice').classList.add('hidden');


let getDiceContainer = [];
let ActiveTokenContainer = [];
let StepsContainer = [];
let colors = [];
let container = [];
function Updatename() {
    getDiceContainer.length = 0;
    ActiveTokenContainer.length = 0;
    container.length = 0;
    StepsContainer.length = 0;
    colors.length = 0;
    document.querySelector('.RedContainer  .TokenName').textContent = document.getElementById('clrRed').value;
    document.querySelector('.GreenContainer  .TokenName').textContent = document.getElementById('clrGreen').value;
    document.querySelector('.YellowContainer  .TokenName').textContent = document.getElementById('clrYellow').value;
    document.querySelector('.BlueContainer  .TokenName').textContent = document.getElementById('clrBlue').value;
    setActiveTokenContainer.forEach((each, index) => {
        let token = each.querySelector('.TokenName');
        if (token.textContent == '') {
            token.style.marginTop = '-10px';
        }
        if (token.textContent !== '') {
            getDiceContainer.push(setDiceContainer[index]);
            ActiveTokenContainer.push(setActiveTokenContainer[index]);
            colors.push(setcolors[index]);
            container.push(setcontainer[index]);
            StepsContainer.push(setStepsContainer[index]);
        }
    });

}
function ablePlayBtn() {
    let count = 0;
    getSelectToken.forEach((SelectToken) => {
        if (SelectToken.value != '')
            count++;
    });
    if (count >= 2) {
        getNameContainer.classList.add("hidden");
        document.querySelector('.overlap').classList.add('hidden');
        Updatename();
        const redDiceContent = redDiceContainer.querySelector('.dice').innerHTML;
        getDiceContainer[0].innerHTML = `<div class="dice">${redDiceContent}</div>`;
        getDiceContainer[0].querySelector('.dice').addEventListener('click', rollDice(0));
    }
    else {
        document.querySelector('.nameContainer h2').style.color = 'rgb(121, 10, 10)';
        setTimeout(() => {
            document.querySelector('.nameContainer h2').style.color = '';
        }, 2000);
    }
}

function rollDice(index) {
    return () => move(index);
}

function DiceShift(index) {
    if (index >= getDiceContainer.length) {
        index = 0;
    }
    const previousIndex = index === 0 ? getDiceContainer.length - 1 : index - 1;
    const newDice = getDiceContainer[previousIndex].querySelector('.dice');
    if (newDice) {
        newDice.classList.add('hidden');
    }
    const redDiceContent = redDiceContainer.querySelector('.dice').innerHTML;
    getDiceContainer[index].innerHTML = `<div class="dice">${redDiceContent}</div>`;
    getDiceContainer[index].querySelector('.dice').removeEventListener('click', rollDice(index));
    getDiceContainer[index].querySelector('.dice').addEventListener('click', rollDice(index));


}

function generateRandomNumber() {

    return Math.floor(Math.random() * 6);
}

function move(index) {

    let currentRandomNumber = null;
    currentRandomNumber = generateRandomNumber();
    // currentRandomNumber = 5;
    const getFaceContainer = getDiceContainer[index].querySelectorAll('.face')
    getFaceContainer.forEach((face) => {
        face.classList.add('rolling');

    });
    setTimeout(() => {
        getFaceContainer.forEach((face) => {
            face.classList.remove('rolling');
            face.style.transform = `translateX(-${45 * currentRandomNumber}px)`;

        });
        const tokensActivated = tokenEligible(index, currentRandomNumber + 1);
        if (!tokensActivated) {
            setTimeout(() => {
                index = getNextIndex(index);
                DiceShift(index);
            }, 500);
        }
    }, 1000);
}

function activeToken(index) {
    const tokens = ActiveTokenContainer[index].querySelectorAll('.token');
    tokens.forEach(token => token.classList.add('active'));
}
function DeActiveToken(index) {
    const tokens = ActiveTokenContainer[index].querySelectorAll('.token');
    tokens.forEach(token => token.classList.remove('active'));
}

const stepsToken = document.querySelectorAll('.token');
function tokenInRoom(token, index) {
    if (!token.classList.contains('active')) {
        return;
    }
    stepsToken.forEach((step) => {
        step.classList.remove('active');
    });
    const startElement = StepsContainer[index].querySelector('.start');
    startElement.appendChild(token);
}

function getNextIndex(index) {

    index++;
    if (index >= getDiceContainer.length) {
        index = 0;
    }
    return index;
}

function tokenInSteps(step, index, RandomNumber, e) {
    if (!step.classList.contains('active')) {
        return;
    }
    stepsToken.forEach((s) => {
        s.classList.remove('active');
    });
    step.classList.remove('active');
    let stepsColor = e.target.parentElement.parentElement;
    let CurrentTokenIndex = setStepsContainer.indexOf(stepsColor);
    let CurrentToken = StepsContainer.indexOf(stepsColor);
    let id = parseInt(e.target.parentElement.getAttribute('data-id'));
    moveToken(RandomNumber, CurrentTokenIndex, id, e.target, index, CurrentToken);
}


let RedValue = 25;
let greenValue = 20;
let yellowValue = 25;
let blueValue = 20;
let redToken = 0;
let greenToken = 0;
let yellowToken = 0;
let blueToken = 0;
function tokenInCenterdCircle(tokenElement) {
    if (tokenElement.classList.contains('red')) {
        tokenElement.style.top = `${RedValue}px`;
        tokenElement.style.left = '0px';
        RedValue += 10;
        redToken++;
    }
    if (tokenElement.classList.contains('green')) {
        tokenElement.style.top = `10px`;
        tokenElement.style.left = `${greenValue}px`;
        greenValue += 10;
        greenToken++;
    }
    if (tokenElement.classList.contains('yellow')) {
        tokenElement.style.top = `${yellowValue}px`;
        tokenElement.style.left = '70px';
        yellowValue += 10;
        yellowToken++;
    }
    if (tokenElement.classList.contains('blue')) {
        tokenElement.style.left = `${blueValue}px`;
        tokenElement.style.bottom = '10px';
        blueValue += 10;
        blueToken++;
    }
}


let count = 0;
function noOf_WonTokens() {
    const tokens = [redToken, greenToken, yellowToken, blueToken];
    const countFour = tokens.filter(token => token === 4).length;
    if (countFour > count) {
        count++;
        return false;
    }
    return true;
}

// let tokenArray = [];
// function updateTokenArray() {
//     const tokens = [redToken, greenToken, yellowToken, blueToken];
//     tokenArray = [];
//     removed=[];

//     setActiveTokenContainer.forEach((each, index) => {
//         let tokenElement = each.querySelector('.TokenName');
//         if (tokenElement && tokenElement.textContent !== ''  && tokens[index] !== null) {
//             tokenArray.push(tokens[index]);

//         }
//     });

//     return tokenArray;
// }

//
// let action=0;
// let i = 0;
// let Counts = 0;
// let action =true;
// function removeDice(tokenArray) {

//     // for (let i = 0; i < tokenArray.length; i++) {
//     if (tokenArray[i] === 4 &&( action || i > Counts)) {
//         tokenArray[i] = null;
//         let diceContainer = getDiceContainer[i];
//         if (diceContainer) {
//             diceContainer.querySelector('.dice').classList.add('hidden');
//         }



//         getDiceContainer.splice(i, 1);
//         ActiveTokenContainer.splice(i, 1);
//         StepsContainer.splice(i, 1);
//         colors.splice(i, 1);
//         container.splice(i, 1);
//         DiceShift(i);
//         i++;
//         Counts++;
//         action = false;

//         if (i >= tokenArray.length) {
//             i = 0;
//             Counts=0;
//         }
//         return true;
//     }
//     i++;

//     if (i >= tokenArray.length) {
//         i = 0;

//     }

//     return false;
// }
// // }


let WinnersArray=[];
function removeDice(index) {
    let tokenArray = [];
    let CenterCircle=document.querySelector('.centered');
    let tokens = CenterCircle.querySelectorAll('.token');
    tokens.forEach(token => {
        if ((token.classList.contains(`${container[index]}`) === getDiceContainer[index].classList.contains(`${container[index]}`))) {
                tokenArray.push(token);
                console.log(tokenArray);
        }
        
    });
    if (tokenArray.length == 4) {
        WinnersArray.push(getDiceContainer[index]);
        ShowResult();
        let diceContainer = getDiceContainer[index];
        if (diceContainer) {
            diceContainer.querySelector('.dice').classList.add('hidden');
        }
        getDiceContainer.splice(index, 1);
        ActiveTokenContainer.splice(index, 1);
        StepsContainer.splice(index, 1);
        colors.splice(index, 1);
        container.splice(index, 1);
        DiceShift(index);
        return true;
    }
    
    // ShowResult();
    
    return false;
}



function ShowResult()
{
    let dice=[];
    setActiveTokenContainer.forEach((each, index) => {
        let token = each.querySelector('.TokenName');
        if (token.textContent !== '') {
            dice.push(setDiceContainer[index]);
        }
    });

    let activeDice=dice.length;
    let overlap=document.querySelector('.overlap');

    if(WinnersArray.length==activeDice-1)
    {
             overlap.classList.remove('hidden');
             overlap.style.zIndex=4;
    }
    
}





let value = 0;
function arrangeTokenInSteps(targetStep, tokenElement) {
    let tokenInStep = targetStep.querySelectorAll('.token');
    if (tokenInStep.length === 0) {
        tokenElement.style.left = '';
    }
    else {
        tokenInStep.forEach((each) => {
            each.style.left = `${value}px`;
            value += 5;
        });
        value = 0;
    }
    let element = tokenElement.parentElement.querySelectorAll('.token');
    if (element.length === 2) {
        tokenElement.parentElement.querySelector('.token').style.left = '';
    }
}
function MoveTokenToFront(step) {
    let value = 0;
    let frontToken;
    let stepTokens = step.parentElement.querySelectorAll('.token');
    const colorIndex = colors.findIndex(color => step.classList.contains(color));
    stepTokens.forEach(token => {
        value++;
        token.style.zIndex = `${value}`;
        if (token.classList.contains(`${colors[colorIndex]}`)) {
            frontToken = token;
        }
    });
    if (frontToken) {
        frontToken.style.zIndex = `${value + 1}`;
    }


}

function MoveTokenBack(step) {
    step.style.zIndex = `1`;
}


function moveToken(currentRandomNumber, CurrentTokenIndex, id, tokenElement, index, CurrentToken) {
    let timeDuration = 200;
    let active = false;
    for (let i = 0; i <= currentRandomNumber; i++) {
        setTimeout(() => {
            let targetStep = setStepsContainer[CurrentTokenIndex].querySelector(`.steps[data-id="${id}"]`);
            if (!targetStep) {
                let winToken = document.querySelector(".centered");
                tokenInCenterdCircle(tokenElement);
                winToken.appendChild(tokenElement);

                if (noOf_WonTokens(index))
                    active = true;
                else
                    active = false;
                return;
            }
            arrangeTokenInSteps(targetStep, tokenElement);
            targetStep.appendChild(tokenElement);
           
            id++;
            if ((id > 13) && (!targetStep.classList.contains('safe'))) {
                CurrentTokenIndex++;
                id = 1;
                if (CurrentTokenIndex >= setStepsContainer.length) {
                    CurrentTokenIndex = 0;
                }
            }
            if (id === 8 && CurrentToken === index) {
                id = 14;
            }
            if (i == currentRandomNumber) {

                let kill = targetStep.querySelectorAll('.token')
                kill.forEach((s) => {
                    if ((!s.parentElement.classList.contains('stop')) && (!s.parentElement.classList.contains('start'))) {
                        if (s.classList.contains(`${colors[index]}`) !== tokenElement.classList.contains(`${colors[index]}`)) {
                            const index = colors.indexOf([...s.classList].find(c => colors.includes(c)));
                            if (s.classList.contains(`${colors[index]}`) === ActiveTokenContainer[index].classList.contains(`${colors[index]}`)) {
                                let emptytoken = ActiveTokenContainer[index].querySelectorAll('.TokenContainer');
                                emptytoken.forEach((e) => {
                                    if (!e.querySelector('.token')) {
                                        active = true;
                                        e.appendChild(s);

                                    }
                                });
                            }
                        }
                    }
                });

            }
        }, i * timeDuration);

    }
    setTimeout(() => {
        if (currentRandomNumber !== 6 && (!active)) {
            if (removeDice(index)) {
               
                return;
            }
            index = getNextIndex(index);
        }
     
        DiceShift(index);

    }, (currentRandomNumber) * timeDuration);
}

function tokenEligible(index, currentRandomNumber) {

    const tokens = ActiveTokenContainer[index].querySelectorAll('.token');
    let tokenActivated = false;
    if (currentRandomNumber == 6) {
        tokens.forEach((token) => {
            if (token.parentElement.classList.contains('TokenContainer')) {

                token.classList.add('active');
                MoveTokenToFront(token);
                tokenActivated = true;
                console.log("Current Random 6 in room");
                token.removeEventListener('click', token.onTokenClick);
                token.onTokenClick = function () {
                    tokenInRoom(token, index);
                    MoveTokenBack(token);
                    token.removeEventListener('click', token.onTokenClick);
                };

                token.addEventListener('click', token.onTokenClick, { once: true });
                
            }
        });
    }

    const stepsToken = document.querySelectorAll('.token');
    stepsToken.forEach((step) => {
        let safeToken = parseInt(step.parentElement.getAttribute('data-id')) + (currentRandomNumber);
        if ((step.parentElement.classList.contains('steps')) && safeToken <= 19) {
            if (step.classList.contains(`${container[index]}`) === getDiceContainer[index].classList.contains(`${container[index]}`)) {
                step.classList.add('active');
                MoveTokenToFront(step);
                tokenActivated = true;
                console.log("Current Random 6 in steps");
                const lockedRandomNumber = currentRandomNumber;
                step.removeEventListener('click', step.onStepClick);
                step.onStepClick = function (e) {
                    tokenInSteps(step, index, lockedRandomNumber, e);
                    MoveTokenBack(step);
                    step.removeEventListener('click', step.onStepClick);

                };

                step.addEventListener('click', step.onStepClick, { once: true });


            }
        }
    });
    return tokenActivated;
}
