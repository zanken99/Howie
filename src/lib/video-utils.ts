export function isVideoUrl(url: string): boolean {
    if (!url) return false;

    // Check if it's a base64 video data URL
    if (url.startsWith('data:video/')) {
        return true;
    }

    // Check file extensions
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    const lowerUrl = url.toLowerCase();

    // Remove query parameters or hash fragments for extension checking
    const urlWithoutQuery = lowerUrl.split('?')[0].split('#')[0];

    if (videoExtensions.some(ext => urlWithoutQuery.endsWith(ext))) {
        return true;
    }

    // Check YouTube (optional, but good to have)
    if (lowerUrl.includes('youtube.com/watch') || lowerUrl.includes('youtu.be/')) {
        return true;
    }

    return false;
}
