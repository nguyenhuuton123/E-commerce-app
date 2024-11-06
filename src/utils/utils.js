export const imagesToGallery = (imageUrls) => {
    return imageUrls.map(url => ({
        original: url,
        thumbnail: url
    }));
}

