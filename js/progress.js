// Progress Management

// Fortschritt speichern
function saveProgress(token, lessonId, progressData) {
    const users = getAllUsers();
    const user = users[token];
    
    if (!user) return false;
    
    if (!user.progress) {
        user.progress = {};
    }
    
    user.progress[lessonId] = {
        ...progressData,
        timestamp: new Date().toISOString()
    };
    
    saveUser(token, user);
    return true;
}

// Fortschritt laden
function getProgress(token, lessonId = null) {
    const user = getUserData(token);
    if (!user) return null;
    
    if (lessonId) {
        return user.progress[lessonId] || null;
    }
    
    return user.progress || {};
}

// Lektion als abgeschlossen markieren
function completeLesson(token, lessonId, score = 100) {
    return saveProgress(token, lessonId, {
        status: 'completed',
        score: score
    });
}

// Lektion als "in Bearbeitung" markieren
function startLesson(token, lessonId) {
    const existing = getProgress(token, lessonId);
    if (existing && existing.status === 'completed') {
        return true; // Bereits abgeschlossen
    }
    
    return saveProgress(token, lessonId, {
        status: 'in-progress',
        score: 0
    });
}

// Fortschritt für eine Klasse berechnen
function getClassProgress(className) {
    const users = getAllUsers();
    const classStudents = Object.entries(users)
        .filter(([token, user]) => user.class === className && user.role === 'student')
        .map(([token, user]) => ({
            token,
            name: user.name,
            progress: user.progress || {}
        }));
    
    return classStudents;
}

// Gesamtfortschritt berechnen (%)
function calculateOverallProgress(token, grade) {
    const progress = getProgress(token);
    if (!progress) return 0;
    
    // Lektionen für die Klassenstufe laden
    const curriculum = window.curriculum || {};
    const lessons = curriculum.lessons?.[grade] || [];
    
    if (lessons.length === 0) return 0;
    
    const completedCount = lessons.filter(lesson => 
        progress[lesson.id]?.status === 'completed'
    ).length;
    
    return Math.round((completedCount / lessons.length) * 100);
}

// Alle Schüler einer Klasse exportieren
function exportClassData(className) {
    const students = getClassProgress(className);
    
    const csvData = students.map(student => {
        const completedLessons = Object.values(student.progress)
            .filter(p => p.status === 'completed').length;
        
        return {
            Token: student.token,
            Name: student.name,
            'Abgeschlossen': completedLessons,
            'Durchschnitt': calculateAverageScore(student.progress)
        };
    });
    
    return csvData;
}

// Durchschnittsnote berechnen
function calculateAverageScore(progress) {
    const scores = Object.values(progress)
        .filter(p => p.status === 'completed' && p.score)
        .map(p => p.score);
    
    if (scores.length === 0) return 0;
    
    const sum = scores.reduce((a, b) => a + b, 0);
    return Math.round(sum / scores.length);
}

// Lektion-Status ermitteln
function getLessonStatus(token, lessonId, allLessons = []) {
    const progress = getProgress(token, lessonId);
    
    // Manuell freigeschaltet?
    if (progress && progress.status === 'unlocked') return 'unlocked';
    
    // Bereits abgeschlossen?
    if (progress && progress.status === 'completed') return 'completed';
    
    // In Bearbeitung?
    if (progress && progress.status === 'in-progress') return 'in-progress';
    
    // Erste Lektion ist immer freigeschaltet
    if (allLessons.length > 0 && lessonId === allLessons[0].id) {
        return 'unlocked';
    }
    
    // Prüfe ob vorherige Lektion abgeschlossen ist
    if (allLessons.length > 0) {
        const currentIndex = allLessons.findIndex(l => l.id === lessonId);
        if (currentIndex > 0) {
            const previousLesson = allLessons[currentIndex - 1];
            const previousProgress = getProgress(token, previousLesson.id);
            
            if (previousProgress && previousProgress.status === 'completed') {
                return 'unlocked';
            }
        }
    }
    
    return 'locked';
}

// Lektion manuell freischalten (für Lehrer)
function unlockLesson(token, lessonId) {
    return saveProgress(token, lessonId, {
        status: 'unlocked',
        score: 0,
        unlockedBy: 'teacher',
        unlockedAt: new Date().toISOString()
    });
}

// Lektion sperren (für Lehrer)
function lockLesson(token, lessonId) {
    const users = getAllUsers();
    const user = users[token];
    
    if (!user) return false;
    
    if (user.progress && user.progress[lessonId]) {
        delete user.progress[lessonId];
        saveUser(token, user);
        return true;
    }
    
    return false;
}

// Alle Lektionen für eine Klasse freischalten
function unlockAllLessonsForClass(className, lessonIds) {
    const users = getAllUsers();
    let count = 0;
    
    Object.entries(users).forEach(([token, user]) => {
        if (user.class === className && user.role === 'student') {
            lessonIds.forEach(lessonId => {
                unlockLesson(token, lessonId);
            });
            count++;
        }
    });
    
    return count;
}
