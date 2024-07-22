/* ---- piano keys---- */
const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    /* ---- volume slider ---- */
    volumeSlider = document.querySelector(".volume-slider input"),
    /* ---- keys show/hide ---- */
    keysCheckbox = document.querySelector(".keys-checkbox input");

/* -------- */

let allKeys = [],
    /* new Audio creates an HTML audio element */
    audio = new Audio("tunes/a.wav"); // by default, audio src is "a" tune

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`; /* passing audio src
    based on key pressed*/
    audio.play(); // playing audio

    const clickedKey = document.querySelector(`[data-key="${key}"]`); // getting clicked key element
    clickedKey.classList.add("active"); // adding active class to the clicked key element
    setTimeout(() => {  // removing active class after 150 ms from the clicked key element
        clickedKey.classList.remove("active");
    }, 150);
}

/* -------------------------------------- */

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key); // adding data-key value to the allKeys array
    key.addEventListener("click", () => playTune(key.dataset.key));
    /* calling playTune function with passing data-key 
    value as an argument */
});

/* -------------------------------------- */
const handleVolume = (e) => {
    /* to set audio volume, value must be between 0 to 1.
    0 is 0%, 0.5 is 50%, and 1 is 100% */
    audio.volume = e.target.value; // passing the range slider value as an audio volume
}

/* ------------ */

const showHideKeys = () => {
    // toggling hide class from each key on the checkbox click
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

/* ------------ */

const pressedKey = (e) => {
    // if the pressed key is in the allKeys array, only call the playTune function
    if (allKeys.includes(e.key)) playTune(e.key);
}

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);