/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
const MAX_IMAGE_BYTES = 900_000;

export function validateImageFile(file) {
  if (!file) {
    return "Choose an image file first.";
  }

  if (!file.type.startsWith("image/")) {
    return "The selected file must be an image.";
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return "Use a smaller image. For this prototype, images should be under 900 KB.";
  }

  return "";
}

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const validationError = validateImageFile(file);

    if (validationError) {
      reject(new Error(validationError));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(String(reader.result));
    };

    reader.onerror = () => {
      reject(new Error("Could not read the selected image."));
    };

    reader.readAsDataURL(file);
  });
}
