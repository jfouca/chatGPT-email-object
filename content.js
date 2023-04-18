chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == "get_body_content") {
    var bodyElement = document.querySelector('.editable');
    var body = bodyElement ? bodyElement.innerHTML : '';
    sendResponse({content: body});
  } else if (request.action == "set_subject") {
    document.querySelector("input[name='subjectbox']").value = request.subject;
    sendResponse({});
  }
  return true;
});