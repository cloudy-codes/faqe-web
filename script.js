
const startButton = document.querySelector("#startButton");

const welcome = document.querySelector("#welcome");
const birthday = document.querySelector("#birthday");

const confettiContainer =
    document.querySelector("#confettiContainer");

// Change these two numbers to your birthday.
// Months: 0 = January, 1 = February, ..., 11 = December.
const birthdayMonth = 11;
const birthdayDay = 17;


// Show the birthday surprise when the button is clicked.
startButton.addEventListener("click", function () {

        welcome.classList.add("hidden");
        birthday.classList.remove("hidden");

        createConfetti();
        updateCountdown();

    });


// Create a small burst of confetti.
function createConfetti() {

    const colors = [
        "#e88caf",
        "#f4c95d",
        "#b8a1e3",
        "#a8d5ba",
        "#ff9b85"
    ];

    for (let i = 0; i < 45; i++) {

        const piece = document.createElement("span");

        piece.classList.add("confetti");

        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        const x = (Math.random() - 0.5) * 320;
        const y = (Math.random() - 0.5) * 200;

        piece.style.setProperty("--x", `${x}px`);
        piece.style.setProperty("--y", `${y}px`);

        confettiContainer.appendChild(piece);

        piece.addEventListener("animationend", function () {
            piece.remove();
        });

    }

}


// Find the next birthday.
function getNextBirthday() {

    const now = new Date();

    let target = new Date(
        now.getFullYear(),
        birthdayMonth,
        birthdayDay,
        0, 0, 0
    );

    if (target <= now) {
        target = new Date(
            now.getFullYear() + 1,
            birthdayMonth,
            birthdayDay,
            0, 0, 0
        );
    }

    return target;

}


// Update the countdown.
function updateCountdown() {

    const now = new Date();
    const target = getNextBirthday();

    const difference = target - now;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.querySelector("#days").textContent = days;
    document.querySelector("#hours").textContent = hours;
    document.querySelector("#minutes").textContent = minutes;
    document.querySelector("#seconds").textContent = seconds;

}


// Keep the countdown running once per second.
setInterval(function () {

    if (!birthday.classList.contains("hidden")) {
        updateCountdown();
    }

}, 1000);
