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
    // Copy and Past Section NOT TESTED: 


  } catch (error) {
    resultPanel.innerHTML = "<p>Something went wrong. Please try again.</p>";
    console.error(error);
  }
});

//////API SECTION 

async function transformText(text, persona) {
  var response = await fetch("?????????https://api.openai.com/v1/chat/completions?????????", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "?????????YOUR_OPENAI_API_KEY???????"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // ????????????
      messages: [
        {
          role: "user",
          content: `Rewrite the following text in the style of a ${persona}. Only return the rewritten text, nothing else.\n\n"${text}"`
        }]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content; // ← different shape than Claude
}

// Shake Effect ///
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