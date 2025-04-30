let bgSound = document.querySelector("#bgSound");
let clickSound = document.querySelector("#clickSound");
let spinSound = document.querySelector("#spinSound");
let spinSound2 = document.querySelector("#spinSound2");
let coinsSound = document.querySelector("#coinsSound");
let win1 = document.querySelector("#win1");
let bigWinSound = document.querySelector("#bigWinSound");
let fogosSound = document.querySelector("#fogosSound");
let levelupSound = document.querySelector("#levelupSound");
let levelupSound2 = document.querySelector("#levelupSound2");

bgSound.volume = 0;
document.querySelector(".start-button").addEventListener("click", () => {
  document.querySelector(".stage1").style.display = "none";
  document.querySelector(".stage2").style.maxHeight = "unset";
  document.querySelector(".stage2").style.maxWidth = "unset";
  document.querySelector(".stage2").style.opacity = "1";
  startVolumeIncrease();
});

function startVolumeIncrease() {
  bgSound.volume = 0.3;
  bgSound.play();

  const targetVolume = 0.6;
  const interval = 100;
  const step = 0.01;

  const intervalId = setInterval(() => {
    if (bgSound.volume < targetVolume) {
      bgSound.volume = Math.min(bgSound.volume + step, targetVolume);
    } else {
      clearInterval(intervalId);
    }
  }, interval);
}

const marquees = document.querySelectorAll(".marquee .marqueeSpace");
let currentIndex = 0;
function updateMarquee() {
  marquees.forEach((marquee) => marquee.classList.add("hidden"));
  marquees[currentIndex].classList.remove("hidden");
  currentIndex = (currentIndex + 1) % marquees.length;
}
updateMarquee();
setInterval(updateMarquee, 8000);

const positions = [
  ["-41.4%", "-30%", "-81.8%"],
  ["-7.8%", "0", "-14.8%"],
  ["-15%", "-7.4%", "-26.05%"],
];
let countSpins = 0;

document.getElementById("spinButton").addEventListener("click", function (e) {
  if (countSpins == 0 || countSpins == 1) {
    document.querySelector("#carteira").textContent = "18.00";
  }
  if (countSpins == 2) {
    document.querySelector("#carteira").textContent = "16.00";
  }
  clickSound.play();
  spinSound.play();
  document.querySelector(".allmarquee").style.opacity = "1";
  document.querySelector(".speedlight").style.opacity = "0";
  document.querySelector("#ganhoCols1").style.opacity = "0";
  document.querySelector(".ganho").classList.remove("show");

  e.target.classList.add("rotateFaster");
  e.target.blur();
  document.querySelector("body").focus();
  let stars = document.querySelector(".stars");
  stars.classList.add("anim");

  const columns = [
    document.getElementById("col1"),
    document.getElementById("col2"),
    document.getElementById("col3"),
  ];

  columns.forEach((col, index) => {
    col.style.animation = `spin ${0.7}s linear infinite`;
  });

  const cols = document.querySelectorAll(".col");
  cols.forEach((col, index) => {
    col.classList.add("shinecol");
  });

  setTimeout(() => stopSpin(columns[0], 0), 2000);
  setTimeout(() => stopSpin(columns[1], 1), 2500);
  setTimeout(() => {
    stopSpin(columns[2], 2);

    e.target.classList.remove("rotateFaster");
    stars.classList.remove("anim");

    cols.forEach((col, index) => {
      col.classList.remove("shinecol");
    });

    if (countSpins == 0) {
      document.querySelector(".allmarquee").style.opacity = "0";
      document.querySelector(".speedlight").style.opacity = "0.2";
      document.querySelector(".ganho").classList.add("show");
      document.querySelector("#ganhoCols1").style.opacity = "1";
      win1.play();
      document.querySelector("#total").textContent = "2.00";
      document.querySelector("#carteira").textContent = "20.00";
    }
    if (countSpins == 2) {
      e.target.style.pointerEvents = "none";
      document.querySelector("#ganhoCols2").style.opacity = "1";
      win1.play();
      setTimeout(() => {
        coinsSound.play();
        bgSound.volume = 0.3;
        document.querySelector("#ganhoCols2").style.display = "none";
        document.querySelector(".grandeGanho").style.display = "block";
        document.querySelector(".grandeGanho").style.opacity = "1";
        count(0, 100, "cont1");
      }, 1000);
    }

    countSpins++;
  }, 3000);
});

function stopSpin(column, index) {
  column.style.animation = "none";
  column.style.transform = "translateY(" + positions[countSpins][index] + ")";
}

function count(start, finish, div) {
  let count = parseInt(start);
  let moreCount = parseInt(start);
  const interval = 40; // 0.5 segundos

  const counterElement = document.getElementById(div);

  const intervalId = setInterval(() => {
    count++;
    counterElement.textContent =
      "R$ " + count + "." + moreCount.toString().padStart(2, "0");

    if (count == 1) {
      document.querySelector(".grandeGanho").classList.add("explode");
      coinsSound.play();
      levelupSound.play();
    }
    if (count == 10) {
      document.querySelector(".grandeGanho").classList.remove("explode");
    }

    if (count >= parseInt(finish)) {
      clearInterval(intervalId);
    }
    if (count == 45) {
      document.querySelector("#grandeGanhoImg").style.display = "none";
      document.querySelector("#megaGanhoImg").style.display = "block";
      document.querySelector(".grandeGanho").classList.add("explode");
      document.querySelector(".grandeGanho").style.backgroundColor =
        "rgba(0,0,0,0.9)";
      document.querySelector(".bgGanho").classList.add("mixed");
      spinSound2.play();
      levelupSound2.play();
    }
    if (count == 70) {
      document.querySelector(".grandeGanho").classList.remove("explode");
      document.querySelector(".btnFim").style.display = "block";
    }
    if (count == 99) {
      document
        .querySelector(".grandeGanho")
        .classList.add("explode", "pinkBright");
      document.querySelector("#megaGanhoImg").style.display = "none";
      document.querySelector("#superMegaGanhoImg").style.display = "block";
      fogosSound.play();
      bigWinSound.play();
      document.querySelector(".btnFim").style.opacity = "1";
      document.querySelector(".circle").classList.add("lastCircle");
    }
    if (count == 100) {
      counterElement.innerText = "R$ 100.00";
      counterElement.style.top = "130px";
      counterElement.style.fontSize = "90px";
      document.querySelector("#cont2").style.display = "flex";
      document.querySelector("#cont2").style.top = "270px";
    }
  }, interval);

  const intervalId2 = setInterval(() => {
    moreCount++;
    if (moreCount >= 99) {
      moreCount = 0;
    }
  }, interval / 20);
}
