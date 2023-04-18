document.addEventListener("DOMContentLoaded", function() {
  // Récupération du formulaire
  const form = document.getElementById("api-key-form");

  // Récupération de la clé API saisie par l'utilisateur
  const apiKeyInput = document.getElementById("api-key");

  // Ecouteur d'événement sur le formulaire pour stocker la clé API saisie par l'utilisateur
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const apiKey = apiKeyInput.value;
    chrome.storage.local.set({apiKey: apiKey}, function() {});
  });

  // Récupération de la clé API depuis le stockage local et pré-remplissage du champ correspondant dans le formulaire
  chrome.storage.local.get(["apiKey"], function(result) {
    if (result.apiKey) {
      apiKeyInput.value = result.apiKey;
    }
  });
});