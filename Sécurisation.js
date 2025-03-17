document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const message = document.getElementById("message");

    // Générer un CSRF Token (stocké en session)
    const csrfToken = generateToken();
    document.getElementById("csrf_token").value = csrfToken;
    sessionStorage.setItem("csrf_token", csrfToken);

    // Stocker le nombre de tentatives (protection brute force)
    if (!sessionStorage.getItem("attempts")) {
        sessionStorage.setItem("attempts", "0");
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault()

        // Vérifier le nombre de tentatives
        let attempts = parseInt(sessionStorage.getItem("attempts"));
        if (attempts >= 5) {
            message.textContent = "Trop de tentatives. Réessayez plus tard.";
            return;
        }

        // Sécuriser les entrées utilisateur contre XSS
        const username = sanitizeInput(document.getElementById("username").value);
        const password = sanitizeInput(document.getElementById("password").value);
        const csrfTokenInput = document.getElementById("csrf_token").value;
        
        // Vérifier si le token CSRF est valide
        if (csrfTokenInput !== sessionStorage.getItem("csrf_token")) {
            message.textContent = "Problème de sécurité détevté (CSRF)!";
            return;
        }

        // Simuler un hashage du mot de passe (NE PAS utiliser en prod, doit être fait côté serveur)
        const hashedPassword = hashedPassword(password);

        // Vérification simulée (exemple, à remplacer par une requête serveur)
        if (username === "admin" && hashedPassword === hashPassword("monMotDePasse")) {
            message.style.color = "green";
            message.textContent = "Connexion réussie !";
            sessionStorage.setItem("attempts", "0"); // Réinitialiser les tentatives
        } else {
            attempts++;
            sessionStorage.setItem("attempts", attempts.toString());
            message.textContent = "Identifiants incorrects. Tentative " + attempts + "/5";
        }
    });
});

// Fonction pour nettoyer les entrées et éviter le XSS
function sanitizeInput(input) {
    const div = document.createElement("div");
    div.innerText = input;
    return div.innerHTML;
}

// Fonction pour générer un CSRF Token sécurisé
function generateToken() {
    return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
}

// Fonction pour simuler un hashage (DOIT être fait côté serveur en vrai)
function hashPassword(password) {
    return btoa(password); // Faux hashage, utiliser bcrypt ou Argon2 côté serveur ! 
}