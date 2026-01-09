async function rewrite() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");
  const article = input.value.trim();

  if (!article) return;

  // User message
  const userTurn = document.createElement("div");
  userTurn.className = "turn user";
  userTurn.innerHTML = `
    <div class="speaker">You</div>
    <div class="message">${article}</div>
  `;
  chat.appendChild(userTurn);

  input.value = "";

  // Assistant placeholder
  const assistantTurn = document.createElement("div");
  assistantTurn.className = "turn assistant";
  assistantTurn.innerHTML = `
    <div class="speaker">Rephraso</div>
    <div class="message">Rewriting…</div>
  `;
  chat.appendChild(assistantTurn);

  try {
    const response = await fetch("http://127.0.0.1:8000/rewrite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ article }),
    });

    const data = await response.json();
    assistantTurn.querySelector(".message").textContent =
      data.rewritten_text;
  } catch (error) {
    assistantTurn.querySelector(".message").textContent =
      "Something went wrong. Please try again.";
  }

  // Auto-scroll
  chat.scrollTop = chat.scrollHeight;
}
