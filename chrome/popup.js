const cookieName =  "MyCustomCookie";
const successMessage = `${cookieName} was propagated.`;

const form = document.getElementById("control-row");
const go = document.getElementById("go");
const input = document.getElementById("input");
const message = document.getElementById("message");
const inputlabel = document.getElementById("inputlabel");

(async function initPopupWindow() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  inputlabel.textContent = `${cookieName} cookie source URL:`;

  if (tab?.url) {
    try {
      let url = new URL(tab.url);
      input.value = url.origin;
    } catch { }
  }

  input.focus();
})();

form.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  clearMessage();

  let url = stringToUrl(input.value);
  if (!url) {
    setMessage("Invalid URL");
    return;
  }

  let message = await copyDomainCookie(url.origin);

  if (message === successMessage) {
    setMessage(message, "black");
  }
  else {
    setMessage(message, "red");
  }
}

function stringToUrl(input) {
  try {
    return new URL(input);
  } catch { }
  try {
    return new URL("http://" + input);
  } catch { }

  return null;
}

async function copyDomainCookie(url) {
  try {
    const trackedCookie = await chrome.cookies.get({ url: url, name: cookieName });

    if (trackedCookie.length === 0) {
      return `No ${cookieName} cookie found`;
    }

    await copyCookieToLocalhost(trackedCookie);
  } catch (error) {
    return `Unexpected error: ${error.message}`;
  }

  return successMessage;
}

function copyCookieToLocalhost(cookie) {
  return chrome.cookies.set({
    url: "http://localhost",
    name: cookie.name,
    value: cookie.value
  });
}


function setMessage(str, color) {
  message.textContent = str;
  message.style.color = color
  message.hidden = false;
}

function clearMessage() {
  message.hidden = true;
  message.textContent = "";
}

