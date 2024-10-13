/// scripts.js

// Initialiser AOS
AOS.init({
    duration: 1200,
    once: true,
});

// Bouton Retour en Haut
const btnRetourHaut = document.getElementById('btnRetourHaut');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnRetourHaut.classList.add('show'); // Ajouter la classe 'show' pour l'apparition
    } else {
        btnRetourHaut.classList.remove('show'); // Retirer la classe 'show' pour la disparition
    }
});

btnRetourHaut.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Fonction pour gérer la soumission de formulaire avec un indicateur de chargement
function handleFormSubmit(formSelector, messageSelector) {
    const form = document.querySelector(formSelector);
    const formMessage = document.querySelector(messageSelector);
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche la soumission par défaut

        // Désactiver le bouton et afficher le texte de chargement
        submitButton.disabled = true;
        submitButton.innerText = 'Envoi en cours...';

        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                form.reset();
                formMessage.innerHTML = '<div class="alert alert-success" role="alert">Merci! Votre message a été envoyé.</div>';
            } else {
                return response.json().then(data => {
                    if (data.errors) {
                        let errorMessages = data.errors.map(error => `<p>${error.message}</p>`).join('');
                        formMessage.innerHTML = `<div class="alert alert-danger" role="alert">${errorMessages}</div>`;
                    } else {
                        formMessage.innerHTML = '<div class="alert alert-danger" role="alert">Oops! Il y a eu un problème avec votre soumission.</div>';
                    }
                });
            }
        })
        .catch(error => {
            formMessage.innerHTML = '<div class="alert alert-danger" role="alert">Erreur réseau : Veuillez vérifier votre connexion.</div>';
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerText = 'Envoyer'; // Remettre le texte du bouton
        });
    });
}

// Appel de la fonction pour un formulaire spécifique
handleFormSubmit('#contact-form', '#form-message');

