function playMemeSound() {
    const audioUrl = chrome.runtime.getURL("faah.mp3");
    const audio = new Audio(audioUrl);
    audio.play().catch(error => console.log("Audio play failed: ", error));
}

const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
        if (mutation.type === 'childList') {
            const pageText = document.body.innerText;
            if (pageText.includes("Compile Error") && !window.hasScreamed) {
                playMemeSound();
                window.hasScreamed = true; 
                setTimeout(() => {
                    window.hasScreamed = false;
                }, 5000); 
            }
        }
    }
});
observer.observe(document.body, { childList: true, subtree: true });