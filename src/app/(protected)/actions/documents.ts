export async function createDocument(title: string, url: string) {
  const response = await fetch("/api/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      url,
    }),
  });

  return response.json();
}

