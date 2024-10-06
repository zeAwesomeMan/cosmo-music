// Ensure the browser supports the Web Speech API
if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert("Sorry, your browser doesn't support the Web Speech API. Try using Chrome or Edge.");
} else {
    // Initialize speech recognition
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // Set the language
    recognition.interimResults = false; // Don't show partial results
    recognition.maxAlternatives = 1; // Only show the best result

    // Get the button and output elements
    const startBtn = document.getElementById('start-btn');
    const output = document.getElementById('output');
    const confirmationSound = document.getElementById('confirmation-sound');
    
    // Define actions based on recognized commands
    const processCommand = (command) => {
        command = command.toLowerCase(); // Convert to lowercase for easier matching
        if (command.includes("yes")){
            confirmationSound.play();

            if (command.includes("orion")) {
                output.textContent = "Opening orion";
                window.location.href = 'Nebula-Galaxy-Constellation/orion-constellation.html';
            } else if (command.includes("w r")) {
                output.textContent = "Opening WR-124"
                window.location.href='Nebula-Galaxy-Constellation/wr-124.html';
            } else if (command.includes("n g c")) {
                output.textContent = "Opening NGC-1333"
                window.location.href='Nebula-Galaxy-Constellation/ngc-1333.html';
        }}
        else {
            output.textContent = "Sorry, I didn't recognize that command.";
        }
    };

    // Start speech recognition when the button is clicked
    startBtn.addEventListener('click', () => {
        output.textContent = "Listening...";
        recognition.start();
    });

    // Handle the result when speech is recognized
    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        output.textContent = `You said: ${speechResult}`;
        processCommand(speechResult);
    };

    // Handle errors
    recognition.onerror = (event) => {
        output.textContent = `Error occurred: ${event.error}`;
    };

    // Stop recognition if no speech is detected
    recognition.onspeechend = () => {
        recognition.stop();
        output.textContent += " (Stopped listening)";
    };
    document.addEventListener('keydown', (event) => {
    if (event.key === 'S' || event.key === 's') {  // Check for 'S' or 's' key
        startBtn.click(); // Programmatically click the button
    }
});
}