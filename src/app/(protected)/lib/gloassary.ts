export const downloadGlossary = (text: string, name: string) => {
  // TODO: Implement download
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.txt`;
  a.click();
};

