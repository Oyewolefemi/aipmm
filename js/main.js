// ... [PASTE ORIGINAL main.js CONTENT HERE IF YOU HAVE IT] ...
// If you don't paste the original content, the character layer logic won't load.
// Ensure "window.onload" doesn't conflict. Use the snippet below to add functionality.

// --- NEW: Submit Order Logic ---

function submitCharacterOrder() {
    // 1. Check Auth
    if (!currentUser) {
        alert("Please log in to save your persona.");
        toggleLoginModal();
        return;
    }

    // 2. Get Persona Details
    var characterName = prompt("Give your Persona a name:", "My New Persona");
    if (!characterName) return;

    var notes = prompt("Describe the persona's mood, backstory, or organization:", "e.g. Cyberpunk rebel leader, Happy vibe");

    // 3. Capture the Data
    // Note: 'c' is the global variable from logic.js that holds the current character state
    // We check if 'c' exists (it should if the original logic.js is loaded)
    var choicesData = (typeof window.c !== 'undefined') ? window.c.choices : {};

    if (Object.keys(choicesData).length === 0) {
        console.warn("No character data found in window.c. Sending test data.");
        // Fallback for testing if logic.js isn't fully hooked up yet
        choicesData = { test: "data", hair: "punk", color: "blue" }; 
    }

    var payload = {
        name: characterName,
        choices: choicesData,
        notes: notes
    };

    // 4. Send to PHP
    fetch('api/save_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(`✅ Success! Persona '${characterName}' saved.\nOrder ID: ${data.order_id}`);
        } else {
            alert("❌ Error saving: " + data.message);
        }
    })
    .catch(err => {
        console.error("Save Error:", err);
        alert("An error occurred. Check console.");
    });
}