// Authentication & Token Management

const AUTH_KEY = 'informatik_lernapp_users';
const SESSION_KEY = 'informatik_lernapp_session';

// Check if localStorage is available and working
function isLocalStorageAvailable() {
    const testKey = '__storage_test__';
    try {
        localStorage.setItem(testKey, testKey);
        const result = localStorage.getItem(testKey);
        localStorage.removeItem(testKey);
        return result === testKey;
    } catch (e) {
        return false;
    }
}

// Check if running in file:// protocol (problematic in Firefox)
function isFileProtocol() {
    return window.location.protocol === 'file:';
}

// Show warning if storage is not available
function checkStorageAvailability() {
    if (!isLocalStorageAvailable()) {
        const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
        const isFile = isFileProtocol();
        
        // Show warning banner with context
        showStorageWarning(isFirefox, isFile);
        return false;
    }
    return true;
}

// Display a warning banner at the top of the page
function showStorageWarning(isFirefox, isFile) {
    // Check if warning already exists
    if (document.getElementById('storage-warning-banner')) return;
    
    const banner = document.createElement('div');
    banner.id = 'storage-warning-banner';
    banner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #f56565;
        color: white;
        padding: 1rem;
        text-align: center;
        z-index: 10000;
        font-weight: bold;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;
    
    // Create message text element
    const messageSpan = document.createElement('span');
    if (isFirefox && isFile) {
        messageSpan.innerHTML = `
            ⚠️ <strong>Firefox-Hinweis:</strong> Die App funktioniert nicht mit lokalen Dateien (file://).
            <br>Bitte öffne die App über einen <strong>lokalen Webserver</strong> oder verwende <strong>Chrome/Edge</strong>.
        `;
    } else {
        messageSpan.innerHTML = `
            ⚠️ <strong>Speicherproblem:</strong> Daten können nicht gespeichert werden. Registrierung/Login funktioniert nicht.
        `;
    }
    banner.appendChild(messageSpan);
    
    // Create close button with proper event listener
    const closeButton = document.createElement('button');
    closeButton.textContent = '✕ Schließen';
    closeButton.style.cssText = 'margin-left: 1rem; padding: 0.25rem 0.5rem; cursor: pointer;';
    closeButton.addEventListener('click', function() {
        banner.remove();
    });
    banner.appendChild(closeButton);
    
    document.body.insertBefore(banner, document.body.firstChild);
}

// Run storage check when auth.js loads
if (typeof window !== 'undefined') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkStorageAvailability);
    } else {
        checkStorageAvailability();
    }
}

// Token generieren (6 Zeichen: A-Z, 0-9)
function generateToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 6; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Prüfen ob Token bereits existiert
    const users = getAllUsers();
    if (users[token]) {
        return generateToken(); // Rekursiv neuen Token generieren
    }
    return token;
}

// Alle Nutzer laden
function getAllUsers() {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : {};
}

// Nutzer speichern
function saveUser(token, userData) {
    const users = getAllUsers();
    users[token] = userData;
    localStorage.setItem(AUTH_KEY, JSON.stringify(users));
}

// Schüler registrieren
function registerStudent(name, className) {
    const token = generateToken();
    const userData = {
        name: name,
        class: className,
        role: 'student',
        registeredAt: new Date().toISOString(),
        progress: {}
    };
    saveUser(token, userData);
    return token;
}

// Login mit Token
function loginWithToken(token) {
    const users = getAllUsers();
    const user = users[token.toUpperCase()];
    
    if (user) {
        // Session speichern
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({
            token: token.toUpperCase(),
            role: user.role
        }));
        return user;
    }
    return null;
}

// Lehrer-Login
function loginTeacher(password) {
    // Passwort aus curriculum.json wird später geladen
    const correctPassword = 'P3stal0zzi';
    
    if (password === correctPassword) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({
            role: 'teacher'
        }));
        return true;
    }
    return false;
}

// Aktuelle Session prüfen
function getCurrentSession() {
    const session = sessionStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
}

// Logout
function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = 'index.html';
}

// Nutzer-Daten laden
function getUserData(token) {
    const users = getAllUsers();
    return users[token] || null;
}

// Prüfen ob eingeloggt
function requireAuth(requiredRole = null) {
    const session = getCurrentSession();
    
    if (!session) {
        window.location.href = 'index.html';
        return false;
    }
    
    if (requiredRole && session.role !== requiredRole) {
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}
