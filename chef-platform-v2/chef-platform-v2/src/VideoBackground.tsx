import { useEffect, useRef } from 'react';
import chefPlatingImage from 'figma:asset/fbd08740c25c6303c64f7f0a2943bd27e8005882.png';

interface VideoBackgroundProps {
  className?: string;
  videoUrl?: string;
  gifUrl?: string;
}

export function VideoBackground({ className = '', videoUrl, gifUrl }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Slow down the video for a more elegant feel
    }
  }, []);

  // Placeholder video URL - this can be replaced with a user-uploaded video
  const defaultVideoUrl = "https://videos.pexels.com/video-files/3298882/3298882-uhd_2560_1440_25fps.mp4";

  return (
    <div className={`fixed inset-0 overflow-hidden -z-10 ${className}`}>
      {/* Video/GIF Layer */}
      <div className="w-full h-full relative">
        {/* Video Background */}
        {(videoUrl || gifUrl) ? (
          <>
            {videoUrl && !gifUrl && (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-[0.08] scale-105"
                style={{
                  filter: 'brightness(1.2) contrast(0.9)',
                }}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            )}
            {gifUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] scale-105"
                style={{
                  backgroundImage: `url('${gifUrl}')`,
                  filter: 'brightness(1.2) contrast(0.9)',
                }}
              />
            )}
          </>
        ) : (
          <>
            {/* Default placeholder video */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-[0.08] scale-105"
              style={{
                filter: 'brightness(1.2) contrast(0.9)',
              }}
            >
              <source src={defaultVideoUrl} type="video/mp4" />
            </video>
            
            {/* Fallback to static image with animation if video fails */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 scale-110 animate-pulse"
              style={{
                backgroundImage: `url('${chefPlatingImage}')`,
                animationDuration: '12s',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out',
                filter: 'blur(1px) brightness(1.5)',
              }}
            />
          </>
        )}
        
        {/* Very subtle floating elements */}
        <div className="absolute inset-0">
          <div className="absolute w-1 h-1 bg-white/5 rounded-full animate-bounce" style={{ top: '25%', left: '15%', animationDelay: '0s', animationDuration: '6s' }} />
          <div className="absolute w-2 h-2 bg-pink-500/3 rounded-full animate-bounce" style={{ top: '70%', left: '85%', animationDelay: '3s', animationDuration: '8s' }} />
          <div className="absolute w-1 h-1 bg-rose-500/4 rounded-full animate-bounce" style={{ top: '45%', left: '65%', animationDelay: '6s', animationDuration: '7s' }} />
        </div>
      </div>
      
      {/* Enhanced gradient overlays for maximum readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/96 to-background/98" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/85 to-background/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/85 to-background/90" />
      
      {/* Final subtle brand colour overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/[0.005] via-transparent to-rose-500/[0.005]" />
    </div>
  );
}