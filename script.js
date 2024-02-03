const title = document.querySelector(".title");
const boxgametime = document.querySelector(".boxgametime");
const start = document.querySelector(".start");
const clicktime = document.querySelectorAll(".clicktime");
const game = document.querySelector(".game");
const displayhead = document.querySelectorAll(".game .head > p");
const displayimg = document.querySelector(".game .conimg");
const displaybtn = document.querySelector(".game .input button");
const gameover = document.querySelector(".gameover");
const gameovertitle = document.querySelector(".gameover > div > h2");
const gameoverscore = document.querySelector(".gameover > div > p");
const gameoverreset = document.querySelector(".gameover > div:nth-of-type(2)");
const restart = document.querySelector(".restart");
const mode = document.querySelector(".mode");
const modeicon = document.querySelector(".mode > i");

let time;
let checkstart = false;
let gametime = 0;
let score = 0;
let checkmode = true;

//home
clicktime.forEach(e => {
    e.addEventListener("click",() => {
        clicktime.forEach(g => {
            g.classList.remove("addcolormin");
        });
        gametime = parseInt(e.innerHTML) * 60;
        e.classList.add("addcolormin");
        if (checkmode) {
            start.style.backgroundColor = "#000";
        }
        else {
            start.style.backgroundColor = "#fff";
        }
        start.style.cursor = "pointer";
        checkstart = true;
    });
});

window.addEventListener("mouseover",(event) => {
    if (checkstart) {
        if (event.target.className == "start") {
            start.style.transform = "scale(0.9,0.9)";
        }
        else {
            start.style.transform = "scale(1,1)";
        }
    }
});

restart.addEventListener("click",() => {
    let datainput = document.querySelector(".game .input input").value = "";
    gameover.style.display = "none";
    restart.style.display = "none";
    game.style.display = "none";
    title.style.display = "block";
    boxgametime.style.display = "flex";
    start.style.display = "block";
    displayimg.innerHTML = "";
    displaybtn.style.pointerEvents = "unset";
    checkstart = false;
    gametime = 0;
    score = 0;
    clicktime.forEach(g => {
        g.classList.remove("addcolormin");
    });
    clearInterval(time);
    start.style.backgroundColor = "#c4bfbf";
    start.style.cursor = "unset";
});

mode.addEventListener("click",() => {
    if (checkmode) {
        modeicon.style.color = "#fff"
        document.documentElement.style.setProperty("--color","#fff");
        document.documentElement.style.setProperty("--background","#3c3c3c");
        document.documentElement.style.setProperty("--colortextminhover","#000");
        document.documentElement.style.setProperty("--backgroundminhover","#fff");
        document.documentElement.style.setProperty("--startbtnback","#616160");
        if (checkstart) {
            start.style.backgroundColor = "#fff";
        }
        checkmode = false;
    }
    else {
        modeicon.style.color = "#000";
        document.documentElement.style.setProperty("--color","#000");
        document.documentElement.style.setProperty("--background","#fff");
        document.documentElement.style.setProperty("--colortextminhover","#fff");
        document.documentElement.style.setProperty("--backgroundminhover","#000");
        document.documentElement.style.setProperty("--startbtnback","#b9b3b3");
        if (checkstart) {
            start.style.backgroundColor = "#000";
        }
        checkmode = true;
    }
});

//in game
start.addEventListener("click",() => {
    if (checkstart) {
        restart.style.display = "block";
        title.style.display = "none";
        boxgametime.style.display = "none";
        start.style.display = "none";
        game.style.display = "flex";
        if (!isNaN(gametime)) {
            countTime();
            countImg();
        }
        else {
            displayhead[0].innerHTML = "free";
            countImg();
        }
    }
});

gameoverreset.addEventListener("click",() => {
    let datainput = document.querySelector(".game .input input").value = "";
    gameover.style.display = "none";
    title.style.display = "block";
    boxgametime.style.display = "flex";
    start.style.display = "block";
    displayimg.innerHTML = "";
    displaybtn.style.pointerEvents = "unset";
    checkstart = false;
    gametime = 0;
    score = 0;
    clicktime.forEach(g => {
        g.classList.remove("addcolormin");
    });
    start.style.backgroundColor = "#c4bfbf";
    start.style.cursor = "unset";
});

function countTime(arrimg = randomImg()) {
    let fulltime =  new Date(gametime * 1000);
    displayhead[0].innerHTML = `${fulltime.getUTCMinutes()}:${fulltime.getUTCSeconds()}0`;
    time = setInterval(() => {
        gametime -= 1;
        fulltime = new Date(gametime * 1000);
        if (fulltime.getUTCMinutes() == 0 && fulltime.getUTCSeconds() == 0) {
            clearInterval(time);
            game.style.display = "none";
            restart.style.display = "none";
            gameover.style.display = "block";
            gameovertitle.innerHTML = "Out Of Time";
            gameoverscore.innerHTML = `Score: ${score}`;
        }
        if (score == arrimg.length) {
            clearInterval(time);
        }
        if (fulltime.getUTCSeconds() < 10) {
            displayhead[0].innerHTML = `${fulltime.getUTCMinutes()}:0${fulltime.getUTCSeconds()}`;
        }
        else{
            displayhead[0].innerHTML = `${fulltime.getUTCMinutes()}:${fulltime.getUTCSeconds()}`;
        }
    },1000);
}

function randomImg() {
    let arrimg = [];
    let title = ["interstellar","the matrix","deadpool","titanic","superman",
                "rampage","john wick","the martian","x men","fast and furious"];
    for (let i = 0 ; i < title.length ; i++) {
        let img = document.createElement("img");
        img.src = `images/img${i + 1}.jpg`;
        img.titlename = title[i];
        arrimg.push(img);
    }
    
    let arrimgran = [];
    let countran = arrimg.length;
    let bcount = "";
    let i = 0;
    while (i < arrimg.length) {
        let ran = Math.floor(Math.random() * countran);
        if (bcount == 0 && ran == 0 && i == 0) {
            arrimgran[i] = arrimg[ran];
            bcount += ran;
            i++;
        }
        if (!bcount.includes(ran)) {
            arrimgran[i] = arrimg[ran];
            bcount += ran;
            i++;
        }
    }

    return(arrimgran);
}

function countImg(arrimg = randomImg()) {
    let count = 0;
    displayhead[1].innerHTML = `score: ${score}`;
    displayimg.appendChild(arrimg[0]);
    displaybtn.addEventListener("click",() => {
        let datainput = document.querySelector(".game .input input").value;
        try {
            if (arrimg[count].titlename.toLowerCase() == datainput.toLowerCase()) {
                displayimg.removeChild(arrimg[count]);
                count++;
                score++;
                if (count > arrimg.length - 1) {
                    displayimg.appendChild(arrimg[arrimg.length - 1]);
                    displaybtn.style.pointerEvents = "none";
                    game.style.display = "none";
                    restart.style.display = "none";
                    gameover.style.display = "block";
                    gameovertitle.innerHTML = "You Win";
                    gameoverscore.innerHTML = `Score: ${score}`;
                }
                else {
                    displayimg.appendChild(arrimg[count]);
                    datainput = document.querySelector(".game .input input").value = "";
                }
                displayhead[1].innerHTML = `score: ${score}`;
            }
        } catch {}
    });
}