var form = document.getElementById("transformer-form");
var resultPanel = document.getElementById("result-panel");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  var userText = document.getElementById("user-text").value.trim();
  var persona = document.getElementById("persona-select").value;

  if (!userText) {
    resultPanel.innerHTML = "<p>Please enter some text first.</p>";
    return;
  }

  resultPanel.innerHTML = "<p>Transforming your Text...</p>";

  try {
    const transformed = await transformText(userText, persona);
    resultPanel.innerHTML = `
    <p>${transformed}</p>


    // Copy and Past Section NOT TESTED: 
        <button id="copy-btn">Copy to Clipboard</button>`;
        document.getElementById("copy-btn").addEventListener("click", () => { navigator.clipboard.writeText(transformed) .then(() => {
        document.getElementById("copy-btn").textContent = "Copied!";
        setTimeout(() => { document.getElementById("copy-btn").textContent = "Copy to Clipboard"; }, 2000);
        })
        .catch(() => {
        resultPanel.innerHTML += "<p>Failed to copy. Please copy manually.</p>";
       });
        });
  


  } catch (error) {
    resultPanel.innerHTML = "<p>Something went wrong. Please try again.</p>";
    console.error(error);
  }
});



async function transformText(text, persona) {
  var response = await fetch("https://w5-collab-app.olliecatt123.workers.dev/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, persona})
});

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data.result;
}




const button = document.getElementById("shakeBtn");
const image = document.getElementById("myImage");

button.addEventListener("click", () => {
// Restart the animation if clicked repeatedly
image.classList.remove("shake");

requestAnimationFrame(() => {
image.classList.add("shake");
});

image.addEventListener(
"animationend",
() => {
image.classList.remove("shake");
},
{ once: true }
);
});