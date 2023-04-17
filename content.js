chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getDraftData") {
    var draftData = {};

    // Récupération de l'objet du message en cours de rédaction
    var subjectElement = document.querySelector("input[name='subjectbox']");
    draftData.subject = subjectElement.value;

    sendResponse(draftData);
  } else if (request.action === "updateDraftData") {
    // Mise à jour de l'objet du message en cours de rédaction
    var subjectElement = document.querySelector("input[name='subjectbox']");
    subjectElement.value = request.draftData.subject;

    sendResponse({});
  }
});
