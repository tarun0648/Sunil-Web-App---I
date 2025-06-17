import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoTimeoutRef = useRef<NodeJS.Timeout>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const images = [
    "/sunilImages/sunil/1.jpg",
    "/sunilImages/sunil/2.jpg", 
    "/sunilImages/sunil/3.jpeg",
    "/sunilImages/sunil/4.jpeg",
    "/sunilImages/sunil/5.jpeg",
    "/sunilImages/sunil/6.jpeg"
  ];

  // Set isMobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];

    // Updated colors for orange theme
    const colors = ["#D35400", "#E67E22", "#F39C12"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Auto-play video on mobile when page loads
  useEffect(() => {
    if (isMobile) {
      setIsFullscreen(true);
      setShowVideo(true);
    }
  }, [isMobile]);

  // Auto-play video on desktop when showVideo is true
  useEffect(() => {
    if (showVideo && videoRef.current) {
      // Try to play the video (autoplay may be blocked if not muted)
      videoRef.current.play().catch(() => {});
    }
  }, [showVideo]);

  const handleVideoClick = () => {
    if (isMobile) {
      setIsFullscreen(true);
      setShowVideo(true);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      clearTimeout(videoTimeoutRef.current);
      setShowVideo(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      videoTimeoutRef.current = setTimeout(() => {
        setShowVideo(false);
      }, 300);
    }
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    setIsFullscreen(false);
  };

  // For mobile: handle "Read More" button click
  const handleReadMore = () => {
    setShowVideo(false);
    setIsFullscreen(false);
  };

  return (
    <section className="relative h-screen flex items-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 -z-20 before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/70 before:via-black/70 before:to-transparent/0 md:bg-[image:url('/sunilImages/sunil/sunilbg.png')] bg-[image:url('/sunilImages/sunil/sunilbg1.png')] bg-cover bg-center bg-no-repeat"
      />
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-2"
            >
              <span className="text-primary font-semibold tracking-wider text-sm md:text-base">I'm</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-gradient"
            >
              Sunil Suresh
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl"
            >
              Fueled by a love for Stage and the art of
              beatboxing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 relative"
            >
              <div className="relative">
                <Button 
                  size="lg" 
                  className="relative overflow-hidden group bg-gradient-to-r from-primary via-accent to-primary text-white border-none hover:shadow-lg hover:shadow-primary/40 transition-all duration-500 px-8 py-3 rounded-full font-semibold text-base"
                  onClick={isMobile ? handleVideoClick : undefined}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Play size={18} className="animate-pulse" /> Watch Performance
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                </Button>

                <AnimatePresence>
                  {showVideo && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 20 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                      className={`${
                        isFullscreen 
                          ? "fixed inset-0 z-50 bg-black flex flex-col items-center justify-center" 
                          : "fixed top-[30%] right-8 w-[80vw] max-w-[800px] aspect-video rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(211,84,0,0.4)] bg-black/95 backdrop-blur-lg border-2 border-primary/50 z-50"
                      }`}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Desktop: show close button, Mobile: show Read More below video */}
                      {isFullscreen && !isMobile && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-4 right-4 z-50 text-white bg-black/50 hover:bg-black/70"
                          onClick={handleCloseVideo}
                        >
                          <X size={24} />
                        </Button>
                      )}
                      <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        controls={false}
                        className={`${
                          isFullscreen 
                            ? "w-full h-full object-contain"
                            : "w-full h-full object-cover rounded-2xl"
                        }`}
                        playsInline
                      >
                        <source src="/videos/abcd.mp4" type="video/mp4" />
                      </video>
                      {isFullscreen && isMobile && (
                        <div className="w-full flex justify-center mt-4 absolute bottom-8 left-0">
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-primary via-accent to-primary text-white font-medium shadow-lg px-10 py-4 rounded-full hover:shadow-primary/50 transition-all duration-300"
                            onClick={handleReadMore}
                          >
                            Vibes Only. Let's Go.
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-center text-muted-foreground"
        >
          <ChevronDown size={24} className="mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;