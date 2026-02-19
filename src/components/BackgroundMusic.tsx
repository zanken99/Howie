'use client';

import { useState, useRef, useEffect } from 'react';

const TRACKS = [
    { src: '/media/hero-audio.mp3', name: 'Theme' },
    { src: '/media/Cocktail Lounge - Dyalla.mp3', name: 'Cocktail Lounge' },
    { src: '/media/Cooked - Dyalla.mp3', name: 'Cooked' },
    { src: '/media/Flowers - Anno Domini Beats.mp3', name: 'Flowers' },
    { src: '/media/Golden Hour - Telecasted.mp3', name: 'Golden Hour' },
    { src: "/media/You'll Find A Way - Telecasted.mp3", name: "You'll Find A Way" },
];

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isLooping, setIsLooping] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }
    };

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                playAudio();
            }
        }
    };

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
    };

    const prevTrack = () => {
        setCurrentTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    };

    const toggleLoop = () => {
        setIsLooping((prev) => !prev);
    };

    // When track changes, load and play new track
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = TRACKS[currentTrack].src;
            audioRef.current.loop = isLooping;
            if (isPlaying) {
                playAudio();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTrack]);

    // Update loop attribute when toggled
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = isLooping;
        }
    }, [isLooping]);

    // When current track ends, play next (if not looping)
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => {
            if (!isLooping) {
                nextTrack();
            }
        };

        audio.addEventListener('ended', handleEnded);
        return () => audio.removeEventListener('ended', handleEnded);
    }, [isLooping]);

    // Attempt auto-play on mount
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = TRACKS[0].src;
            audioRef.current.volume = 0.3;
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }
    }, []);

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
            <audio ref={audioRef} />

            {/* Track name tooltip */}
            {isPlaying && (
                <div className="px-3 py-1.5 bg-black/70 backdrop-blur-md border border-[var(--color-primary)]/30 rounded-full text-[10px] text-[var(--color-primary)] font-bold tracking-wider max-w-[200px] truncate animate-pulse">
                    ♪ {TRACKS[currentTrack].name}
                </div>
            )}

            {/* Controls */}
            <div className="flex items-center gap-1">
                {/* Prev */}
                <button
                    onClick={prevTrack}
                    title="Предыдущий трек"
                    className="w-9 h-9 flex items-center justify-center bg-black/60 backdrop-blur-md border border-[var(--color-primary)]/40 text-[var(--color-primary)] rounded-full hover:bg-[var(--color-primary)] hover:text-black transition-all duration-300 text-sm"
                >
                    ⏮
                </button>

                {/* Play/Pause */}
                <button
                    onClick={togglePlay}
                    title={isPlaying ? "Пауза" : "Играть"}
                    className="w-11 h-11 flex items-center justify-center bg-black/60 backdrop-blur-md border border-[var(--color-primary)] text-[var(--color-primary)] rounded-full hover:bg-[var(--color-primary)] hover:text-black transition-all duration-300 text-lg"
                >
                    {isPlaying ? '⏸' : '▶'}
                </button>

                {/* Next */}
                <button
                    onClick={nextTrack}
                    title="Следующий трек"
                    className="w-9 h-9 flex items-center justify-center bg-black/60 backdrop-blur-md border border-[var(--color-primary)]/40 text-[var(--color-primary)] rounded-full hover:bg-[var(--color-primary)] hover:text-black transition-all duration-300 text-sm"
                >
                    ⏭
                </button>

                {/* Loop */}
                <button
                    onClick={toggleLoop}
                    title={isLooping ? "Зацикливание вкл" : "Зацикливание выкл"}
                    className={`w-9 h-9 flex items-center justify-center backdrop-blur-md border rounded-full transition-all duration-300 text-sm ${isLooping
                            ? 'bg-[var(--color-primary)] text-black border-[var(--color-primary)]'
                            : 'bg-black/60 border-[var(--color-primary)]/40 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-black'
                        }`}
                >
                    🔁
                </button>
            </div>
        </div>
    );
}
