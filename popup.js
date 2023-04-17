document.getElementById("btn").addEventListener("click", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    // Récupération de l'onglet actif
    var activeTab = tabs[0];

    // Envoi d'un message à l'onglet actif pour récupérer les données du message en cours de rédaction
    chrome.tabs.sendMessage(activeTab.id, { action: "getDraftData" }, function(draftData) {
      // Modification de l'objet du message en cours de rédaction
      draftData.subject = "Nouvel objet du message";

      // Envoi d'un message à l'onglet actif pour mettre à jour le message en cours de rédaction
      chrome.tabs.sendMessage(activeTab.id, { action: "updateDraftData", draftData: draftData });
    });
  });
});