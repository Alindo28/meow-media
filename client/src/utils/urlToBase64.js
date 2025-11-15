export default async function urlToBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob(); // convert response to Blob

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob); // convert Blob to base64
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
}