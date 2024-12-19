const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to load an image and return a promise
const loadImage = (image) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => resolve(img); // Resolve with the loaded image element
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
  });
};

// Event listener for the button
btn.addEventListener("click", () => {
  output.innerHTML = "Loading images..."; // Display loading message

  // Create an array of promises to load all images
  const imagePromises = images.map((image) => loadImage(image));

  // Use Promise.all to wait for all images to load
  Promise.all(imagePromises)
    .then((loadedImages) => {
      output.innerHTML = ""; // Clear the loading message
      loadedImages.forEach((img) => {
        output.appendChild(img); // Append each loaded image to the output div
      });
    })
    .catch((error) => {
      output.innerHTML = error.message; // Display the error message
    });
});
