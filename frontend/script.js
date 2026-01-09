async function rewrite() {
  const article = document.getElementById("input").value;
  const response = await fetch("http://127.0.0.1:8000/rewrite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ article }),
  });
  const data = await response.json();
  document.getElementById("output").value = data.rewritten_text;
}
