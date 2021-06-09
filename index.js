var synth = window.speechSynthesis;
var flag = false;

var inputForm = document.querySelector("form");
var inputTxt = document.querySelector(".txt");
var voiceSelect = document.querySelector("select");

var pitch = document.querySelector("#pitch");
var pitchValue = document.querySelector(".pitch-value");
var rate = document.querySelector("#rate");
var rateValue = document.querySelector(".rate-value");

// var resume = document.querySelector("#play");
// var pause = document.querySelector("#pause");

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices();
  console.log(voices);
  for (let i = 0; i < voices.length; i++) {
    var option = document.createElement("option");
    option.textContent = voices[i].name + "(" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent + "--DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();

if (synth.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

speak = () => {
  if (synth.speaking) {
    console.error("Already Speaking...");
    return;
  }
  if (inputTxt.value !== "") {
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    //if speaking has ended
    utterThis.onend = (e) => {
      console.log("Done speaking...");
    };
    //if error while speaking
    utterThis.onerror = (e) => {
      console.log(e);
    };
    //choose the voice
    var selectedOption =
      voiceSelect.selectedOptions[0].getAttribute("data-name");
    voices.forEach((v) => {
      if (v.name === selectedOption) utterThis.voice = v;
    });

    //find pitch and rate
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;

    //speak the text
    synth.speak(utterThis);
    // synth.pause();
    console.log(utterThis);
  }
};

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  inputTxt.blur();
});
pitch.oninput = function () {
  pitchValue.textContent = pitch.value;
};

rate.oninput = function () {
  rateValue.textContent = rate.value;
};

// function playOnClick() {
//   if (synth.paused) {
//     /* unpause/resume narration */
//     synth.resume();
//   }
// }

// function pauseOnCLick() {
//   if (synth.speaking && !synth.paused) {
//     /* pause narration */
//     synth.pause();
//   }
// }

// resume.addEventListener("click", playOnClick);
// pause.addEventListener("click", pauseOnCLick);
var player = document.querySelector("#button_play");

player.onclick = function () {
  if (synth.paused) {
    /* unpause/resume narration */
    d3.select("#button_play i").attr("class", "fa fa-pause");
    synth.resume();
  }
  if (synth.speaking && !synth.paused) {
    /* pause narration */
    d3.select("#button_play i").attr("class", "fa fa-play");
    synth.pause();
  }
  console.log("button play pressed, synth.paused is " + synth.paused);
};

