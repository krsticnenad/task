/**
 * Preload images from a data array
 */
export const preloadImages = async (
  data: any[],
  image: string
): Promise<void> => {
  const promises = data
    .filter((item) => item[image])
    .map((item) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = item[image];
      });
    });

  await Promise.all(promises);
};
