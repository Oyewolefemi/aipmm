// Global state for the user
var currentUser = null;

// Generic Helper to talk to PHP
async function fetchDb(endpoint, data) {
    const response = await fetch(`api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
}

// --- Authentication Functions ---

async function handleLogin() {
    const username = document.getElementById('login-username').value;
    const pass = document.getElementById('login-password').value;

    if(!username || !pass) return alert("Please fill in all fields");

    try {
        const res = await fetchDb('login.php', { username: username, password: pass });
        
        if (res.status === 'success') {
            currentUser = res.user;
            updateUI_LoggedIn();
            toggleLoginModal(); // Close modal
            alert("Welcome back, " + currentUser.name);
        } else {
            alert(res.message);
        }
    } catch (err) {
        console.error(err);
        alert("Login failed. Check console.");
    }
}

async function handleRegister() {
    const email = document.getElementById('reg-email').value;
    const username = document.getElementById('reg-username').value;
    const pass = document.getElementById('reg-password').value;

    if(!username || !pass || !email) return alert("Please fill in all fields");

    try {
        const res = await fetchDb('register.php', { username, password: pass, email });
        
        if (res.status === 'success') {
            alert("Registration successful! Please login.");
            switchAuthMode('login');
        } else {
            alert(res.message);
        }
    } catch (err) {
        console.error(err);
        alert("Registration error.");
    }
}

// --- UI Helpers ---

function toggleLoginModal() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

function switchAuthMode(mode) {
    if(mode === 'register') {
        document.getElementById('login-form-container').classList.add('hidden');
        document.getElementById('register-form-container').classList.remove('hidden');
    } else {
        document.getElementById('login-form-container').classList.remove('hidden');
        document.getElementById('register-form-container').classList.add('hidden');
    }
}

function updateUI_LoggedIn() {
    if(currentUser) {
        document.getElementById('user-display').innerText = currentUser.name;
        document.getElementById('auth-btn').innerText = "Logout";
        document.getElementById('auth-btn').onclick = function() { location.reload(); }; // Simple logout
    }
}