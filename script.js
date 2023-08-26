const userInput = document.getElementById("userInput");
const cursor = document.querySelector(".cursor");
const sound = document.getElementById("sound");

let text = "";
let index = 0;

function updateText() {
    userInput.textContent = text.slice(0, index);
    index++;

    if (index <= text.length) {
        setTimeout(updateText, 100);
    } else {
        cursor.style.display = "inline-block";
    }
}

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        cursor.style.display = "none";
        handleCommand(text.trim());
        text = "";
        userInput.textContent = "";
        index = 0;
    } else if (event.key === "Backspace") {
        text = text.slice(0, -1);
        index = Math.max(index - 1, 0);
        userInput.textContent = text;
    } else if (event.key === "ArrowLeft") {
        index = Math.max(index - 1, 0);
    } else if (event.key === "ArrowRight") {
        index = Math.min(index + 1, text.length);
    } else if (!event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
        text += event.key;
        updateText();
    }
});

document.addEventListener("keyup", event => {
    if (!event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
        // Этот блок кода нужен для обработки "keyup" и предотвращения ввода символов при зажатых специальных клавишах.
        // Мы можем добавить здесь нужные действия при отпускании клавиши, если необходимо.
    }
});

function handleCommand(command) {
    const output = document.createElement("div");
    output.classList.add("white");
    let result = "";
    
    if (command === "govno") {
        sound.play();
        result = "Наверни говна, олух!";
    } else if (command === "") {
        result = "Неизвесная команда, попробуй help";
    } else if (command === "help") {
        result = "Список команд: about, govno, help, hui";
    } else if (command === "about") {
        result = "жрать говно";
    } else if (command === "hui") {
        result = "http://78.26.214.220/ad.mp4/";
    } else {
        result = `Неизвесная команда: ${command}, попробуй help`;
    }
    
    output.textContent = `$ ${command}\n${result}`;

    const terminalText = document.querySelector(".terminal-text");
    terminalText.appendChild(output);
}
