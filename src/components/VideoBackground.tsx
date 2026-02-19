'use client';

export default function VideoBackground() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-50 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />
            <video
                autoPlay
                loop
                muted
                playsInline
                className="object-cover object-[center_15%] w-full h-full opacity-80 scale-110"
            >
                <source src="/bg-video.mp4" type="video/mp4" />
            </video>
        </div>
    );
}
