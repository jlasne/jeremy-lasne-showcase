import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Intro = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // @ts-ignore
    window.onYouTubeIframeAPIReady = () => {
      // @ts-ignore
      playerRef.current = new window.YT.Player('youtube-player', {
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          },
        },
      });
    };
  }, []);

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        playerRef.current.mute();
      } else {
        playerRef.current.playVideo();
        playerRef.current.unMute();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 text-white hover:bg-white/10"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Introduction</h1>
            <p className="text-gray-300">Get to know Jeremy LASNE</p>
          </div>

          <Card className="p-0 overflow-hidden border border-[#0d2000]/10 bg-white">
            <div 
              className="relative w-full cursor-pointer" 
              style={{ paddingBottom: "56.25%" }}
              onClick={togglePlayPause}
            >
              <iframe
                id="youtube-player"
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/FoPWLZdk51M?autoplay=1&loop=1&playlist=FoPWLZdk51M&controls=0&modestbranding=1&enablejsapi=1"
                title="Introduction Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[24px] border-l-[#0d2000] border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Intro;
