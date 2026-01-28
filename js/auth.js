// Authentication & Token Management

const AUTH_KEY = 'informatik_lernapp_users';
const SESSION_KEY = 'informatik_lernapp_session';

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
