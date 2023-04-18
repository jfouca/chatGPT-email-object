chrome.commands.onCommand.addListener(function(command) {
  if (command == "suggest-email-object") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      if (tab.url.indexOf("https://mail.google.com/") == 0) {
        chrome.tabs.sendMessage(tab.id, {action: "get_body_content"}, function(response) {
          const chatGPTUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
          var requestData = {
            prompt: 'Écris l\'objet de l\'email en fonction du texte suivant: ' + response.content,
            max_tokens: 50,
            temperature: 0.5,
            n: 1
          };

          chrome.storage.local.get(["apiKey"], function(storage) {
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + storage.apiKey
              },
              body: JSON.stringify(requestData)
            };
            fetch(chatGPTUrl, requestOptions)
              .then(response => response.json())
              .then(data => {
                chrome.tabs.sendMessage(tab.id, {action: "set_subject", subject: data.choices[0].text.trim()});
              })
              .catch(error => console.error(error));
          });

        });
      }
    });
  }
});