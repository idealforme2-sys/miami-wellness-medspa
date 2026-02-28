import { useEffect, useRef, useState } from "react";

export function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Try to autoplay
        const attemptPlay = () => {
            audio.play().then(() => {
                setIsPlaying(true);
                setHasInteracted(true);
            }).catch(() => {
                // Autoplay blocked by browser
                console.log("Autoplay was prevented");
            });
        };

        const handleFirstInteraction = () => {
            if (!hasInteracted) {
                attemptPlay();
            }
        };

        window.addEventListener("click", handleFirstInteraction);
        window.addEventListener("scroll", handleFirstInteraction);

        return () => {
            window.removeEventListener("click", handleFirstInteraction);
            window.removeEventListener("scroll", handleFirstInteraction);
        };
    }, [hasInteracted]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="flex items-center justify-center">
            <button
                onClick={togglePlay}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-md transition-all hover:bg-black/60 hover:text-white"
                style={{
                    border: "1px solid rgba(201,169,110,0.3)",
                    boxShadow: isPlaying ? "0 0 10px rgba(201,169,110,0.2)" : "none"
                }}
                aria-label={isPlaying ? "Mute music" : "Play music"}
            >
                {isPlaying ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                        <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
                    </svg>
                )}
            </button>
            <audio
                ref={audioRef}
                src="/music/bg-music.mp3"
                loop
                preload="auto"
            />
        </div>
    );
}
