let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

function populateVoiceList() {
  voices = window.speechSynthesis.getVoices();

  // Clear the select menu
  voiceSelect.innerHTML = "";

  // Log the voices array to see what's available
  console.log("Available Voices:", voices);

  // Filter voices by language and add them to the select menu
  voices.forEach((voice, i) => {
    if (["en", "es", "de", "nl"].includes(voice.lang.split("-")[0])) {
      // Filters for English, Spanish, German, Dutch
      let option = new Option(`${voice.name} (${voice.lang})`, i);
      voiceSelect.add(option);
    }
  });

  // Set the default voice to the first in the list
  if (voices.length > 0) {
    speech.voice = voices[0];
    voiceSelect.selectedIndex = 0;
    console.log("Default Voice Set:", speech.voice);
  } else {
    console.warn("No voices available.");
  }
}

window.speechSynthesis.onvoiceschanged = populateVoiceList;

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
  console.log("Selected Voice:", speech.voice);
});

document.querySelector("button").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  console.log("Speech Text:", speech.text);
  window.speechSynthesis.speak(speech);
});
