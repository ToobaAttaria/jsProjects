const getPaperBtn = document.getElementById('paper');
const getScissorBtn = document.getElementById('Scissor');
const getStoneBtn = document.getElementById('Stone');
const getBtn = document.querySelectorAll('.btn');
const getUserImage = document.getElementById('DisplayuserImage');
const getCompImage = document.getElementById('DisplaycompImage');
const getstatus = document.getElementById('Status');
const getUserScores = document.getElementById('YourScore');
const getCompScores = document.getElementById('CompScore');
const getUserName = document.getElementById('userName');
const getSubmitBtn = document.getElementById('submit');
const getName = document.getElementById('name');
const getclosebtn = document.getElementById('closebtn');
const nameContainer = document.querySelector('.nameContainer');
const getQuitYesBtn = document.getElementById('yes');
const getQuitNoBtn = document.getElementById('no');

getSubmitBtn.addEventListener('click', () => {
    if (getUserName.value !== '') {
        getName.innerHTML = getUserName.value;

        nameContainer.style.display = 'none';
        document.querySelector('.Overlap').style.display = 'none';

    }
    else {
        document.getElementById('AlertMsg').style.color = 'rgb(214, 90, 90)';
        setTimeout(() => {
            document.getElementById('AlertMsg').style.color = '';
        }, 1500);
    }
});

document.querySelector('.QuitGamecontainer').style.display = 'none';


getclosebtn.addEventListener('click', () => {
    document.querySelector('.Overlap').style.display = 'inline';
    document.querySelector('.QuitGamecontainer').style.display = 'inline';
  
    getQuitNoBtn.addEventListener('click', () => {
        document.querySelector('.Overlap').style.display = 'none';
        document.querySelector('.QuitGamecontainer').style.display = 'none';
    });

    getQuitYesBtn.addEventListener('click', () => {


        const resultContainer = document.createElement('div');
        resultContainer.className = 'ResultContainer';

        const resultHeader = document.createElement('div');
        resultHeader.className = 'resultHeader';
        if (parseInt(getUserScores.innerText) === parseInt(getCompScores.innerText)) {
            resultHeader.innerHTML = '<span id="Result">The game is a tie!</span>';
        }
        else if (parseInt(getUserScores.innerText) > parseInt(getCompScores.innerText)) {
            resultHeader.innerHTML = '<span id="Result">YOU WIN!</span>';
        }
        else {
            resultHeader.innerHTML = '<span id="Result">YOU LOSE!</span>';
        }
        
        const total = document.createElement('div');
        total.className = 'total';

        total.innerHTML = `
            <h1>Total Scores</h1>
            <h3 id="userName"> ${getUserName.value} :<span id="UserTotalmarks"> ${getUserScores.innerText}</span> </h3>
            <h3> Computer : <span id="CompTotalmarks"> ${getCompScores.innerText}</span> </h3>
            <button id='ReplayBtn'>Replay</button>
        `;


        resultContainer.appendChild(resultHeader);
        resultContainer.appendChild(total);
        document.body.appendChild(resultContainer);
        total.querySelector('#ReplayBtn').addEventListener('click', () => {
            document.querySelector('.Overlap').style.display = 'none';
            resultContainer.remove();
            document.querySelector('.QuitGamecontainer').style.display = 'none';
            getstatus.innerHTML = 'Status';
            getUserScores.innerText = '0';
            getCompScores.innerText = '0';
            getName.innerHTML='Name';
            document.querySelector('.nameContainer').style.display = 'inline';
            document.querySelector('.Overlap').style.display = 'inline';
        });
    });

});



getBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        changeImage(e);
    });
});

function Status() {

    if (getUserImage.src === getCompImage.src) {
        getstatus.innerHTML = "It's a tie!";
        return;
    }
    if ((getUserImage.src === getPaperBtn.src && getCompImage.src === getStoneBtn.src) ||
        (getUserImage.src === getStoneBtn.src && getCompImage.src === getScissorBtn.src) ||
        (getUserImage.src === getScissorBtn.src && getCompImage.src === getPaperBtn.src)) {
        getstatus.innerHTML = getUserName.value + '  wins!';

        getUserScores.innerText = parseInt(getUserScores.innerText)+1;
    } else {
        getstatus.innerHTML = getUserName.value + ' ' + ' loses!';
        getCompScores.innerText = parseInt(getCompScores.innerText)+1;
    }

}

function changeImage(e) {
    getUserImage.src = e.target.src;
    getUserImage.style.animation = 'none';
    getCompImage.style.animation = 'none';

    let randNo = Math.floor(Math.random() * getBtn.length);
    getCompImage.src = getBtn[randNo].querySelector('img').src;

    Status();

    setTimeout(() => {
        getUserImage.style.animation = '';
        getCompImage.style.animation = '';
        getUserImage.src = getStoneBtn.src;
        getCompImage.src = getStoneBtn.src;
        getstatus.innerHTML = 'Play Again';
    }, 1500);
}
