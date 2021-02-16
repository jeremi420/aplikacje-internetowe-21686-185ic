var firstButton = document.getElementById("firstButton");
var firstOutput = document.getElementById("firstOutput");
var firstInput = document.getElementById("firstInput");
var secondButton = document.getElementById("secondButton");
var secondOutput = document.getElementById("secondOutput");
var secondInput = document.getElementById("secondInput");

function handleFirstClick() {
    if (window.Worker) {
        firstOutput.innerHTML = "wyrazy ciągu: ";
        var worker = new Worker("fibonacci.js");
        worker.onmessage = function (event) {
            var number = event.data;
            if (firstOutput.innerHTML !== "wyrazy ciągu: ") {
                firstOutput.innerHTML = firstOutput.innerHTML + ", ";
            }
            firstOutput.innerHTML = firstOutput.innerHTML + number.toString();
        };
        worker.postMessage(firstInput.value);
    }
}

function handleSecondClick() {
    console.log("bla");
    if (window.Worker) {
        secondOutput.innerHTML = "silnia liczby: ";
        var worker = new Worker("factorial.js");
        worker.onmessage = function (event) {
            var number = event.data;
            secondOutput.innerHTML = secondOutput.innerHTML + number;
        };
        worker.postMessage(secondInput.value);
    }
}

firstButton.onclick = handleFirstClick;
secondButton.onclick = handleSecondClick;
