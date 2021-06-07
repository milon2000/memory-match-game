    const frontCard = "img/7.jpg";
    let cardsLinks = [{
        link: "img/1.jpg",
        matching: 'one', 
    },
    {
        link: "img/2.jpg",
        matching: 'two', 
    }, 
    {
        link: "img/3.jpg",
        matching: 'three',
    },
    {
        link: "img/4.jpg",
        matching: 'four',
    },
    {
        link: "img/5.jpg",
        matching: 'five',
    },
    {
        link: "img/6.jpg",
        matching: 'six',
    },
];
    //DUBLOWANIE ZAWARTOSCI TABLICY
    let cardsArray;
    function double(arr) {
        return cardsArray = arr.flatMap(i => [i,i]);
    }
     double(cardsLinks);

    //MIESZAMY ELEMENTY W TABLICY
    function shuffleArray(cardsArray) {
        var i, t, j;
        for (i = cardsArray.length - 1; i > 0; i -= 1) {
            t = cardsArray[i];
            j = Math.floor(Math.random() * (i + 1));
            cardsArray[i] = cardsArray[j];
            cardsArray[j] = t;
        }
        return cardsArray;
    }
    shuffleArray(cardsArray);
    
    // tworzymy plansze
    const game = document.querySelector('.game');
    for (let key in cardsArray) {
            const div = document.createElement('div');
            div.classList.add('card');
            div.classList.add();
            div.setAttribute('data-match', cardsArray[key].matching );
            game.appendChild(div);
            const imgFront = document.createElement('img');
            imgFront.classList.add('front');
            imgFront.src = frontCard;
            div.appendChild(imgFront);
            const imgBack = document.createElement('img');
            imgBack.classList.add('back');
            imgBack.src = cardsArray[key].link;
            div.appendChild(imgBack);
    }
    const buttons = document.querySelector('.buttons');
    const buttonReset = document.createElement('button');
    buttonReset.classList.add('button');
    buttonReset.innerHTML = "Reset Game";
    buttons.appendChild(buttonReset);

//stoper
const stopwatch = document.querySelector('.stopwatch');
const start = document.querySelector('.start-stopwatch');


let matchCounter = 0;
let hr = 0;
let min = 0;
let sec = 0;
let stoptime = true;

//jesli zegar nie dziala, wlacz go i przejdz do funkcju timerCycle()
function startStopwatch() {
  if (stoptime === true) {
        stoptime = false;
        stopwatchCycle();
    }
}
//wylacz zegar
function stopStopwatch() {
  if (stoptime === false) {
    stoptime = true;
  }
}

function stopwatchCycle() {
    //jesli zegar dziala
    if (stoptime === false) {
    //zamien wartosci na liczby
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);
    
    sec = sec + 1;
    

    //jesli dojdzie do 60 sec, dodaj 1 do minut, wyzeruj sekundy

    if (sec === 60) {
      min = min + 1;
      sec = 0;
    }
    //jesli minuty dojda do 60, dodaj godzine do godzin, wyzeruj minuty
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    //jesli sec jest mniejsza niz 10 albo rowna 0, wtedy dodajesz dodatkowe 0 do wyswirtlania


    if (sec < 10 || sec === 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min === 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr === 0) {
      hr = '0' + hr;
    }

    stopwatch.innerHTML = hr + ':' + min + ':' + sec;
    
//uruchamiaj te rzeczy co 1 sec
    setTimeout(stopwatchCycle, 1000);
  }
}



start.addEventListener('click', startStopwatch);
let results = document.querySelector('.results');


// logika do gry
let cards = document.querySelectorAll('.card');
let firstCard;
let secondCard;
let clicked = false;
let closedBoard = true;
let clickCounter = 0;

function flipCard() {
    if(closedBoard) return;
    clickCounter++;
 
    this.classList.add('flip', 'none');
    if(!clicked) {
        clicked = true;
        firstCard = this;
    } else {
        clicked = false;
        secondCard = this;
        match();
    }  
}

function match() {
    
    if(firstCard.dataset.match === secondCard.dataset.match) {
        removeClick(); 
        // zatrzymaj zegar jak wszytskie sa odkryte

        matchCounter++;
        if(matchCounter === 6) {
            stopStopwatch();
            results.innerHTML = 'Skonczone. Zajelo Ci to' + + hr + ':' + min + ':' + sec;
          
        }
    } else {
        removeFlip();
    }
}


function removeClick() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}
function removeFlip() {
    closedBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip', 'none');
        //firstCard.classList.remove('none');
        secondCard.classList.remove('flip', 'none');
        //secondCard.classList.remove('none');
        closedBoard = false;
    }, 1500);
}
function startGame() {
    closedBoard = false;
    startStopwatch();
}
function resetGame() {
    window.location.reload();
}
cards.forEach(card => card.addEventListener('click', flipCard));
buttonReset.addEventListener('click', resetGame);
start.addEventListener('click', startGame);














