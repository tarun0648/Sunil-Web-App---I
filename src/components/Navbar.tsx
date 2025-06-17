import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Music, 
  Disc, 
  Calendar, 
  Image, 
  Menu, 
  X,
  Calendar as CalendarIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const logoTexts = ["ARTIST", "EMCEE", "BEATBOXER", "GAME JOCKEY"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % logoTexts.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [logoTexts.length]);

  const navItems = [
    { name: "Music", path: "/music", icon: <Music size={20} /> },
    { name: "Albums", path: "/albums", icon: <Disc size={20} /> },
    { name: "Tour", path: "/tour", icon: <Calendar size={20} /> },
    { name: "Gallery", path: "/gallery", icon: <Image size={20} /> },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md py-4 shadow-lg border-b border-primary/20"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center gap-2 group">
          <div className="min-w-[140px] h-10 flex items-center justify-center">
            <motion.span
              key={currentTextIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform"
              style={{ cursor: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0L19.0211 17.5H0.978853L10 0Z' fill='%23D35400'/%3E%3C/svg%3E\") 10 10, auto" }}
            >
              {logoTexts[currentTextIndex]}
            </motion.span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                style={{ cursor: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0L19.0211 17.5H0.978853L10 0Z' fill='%23D35400'/%3E%3C/svg%3E\") 10 10, auto" }}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </motion.div>
          ))}
          
          {/* Book Now Button */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Button 
              className="bg-gradient-to-r from-primary via-accent to-primary text-white border-none hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 px-6 py-2 rounded-full font-semibold relative overflow-hidden group"
              style={{ cursor: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0L19.0211 17.5H0.978853L10 0Z' fill='%23D35400'/%3E%3C/svg%3E\") 10 10, auto" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <CalendarIcon size={16} />
                Book Now
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-foreground p-2 hover:bg-primary/10 rounded-full transition-colors"
          aria-label="Toggle Menu"
          style={{ cursor: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0L19.0211 17.5H0.978853L10 0Z' fill='%23D35400'/%3E%3C/svg%3E\") 10 10, auto" }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-card/95 backdrop-blur-md border-t border-primary/20"
      >
        <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                to={item.path}
                className="flex items-center gap-3 p-3 rounded-xl text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ cursor: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0L19.0211 17.5H0.978853L10 0Z' fill='%23D35400'/%3E%3C/svg%3E\") 10 10, auto" }}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            </motion.div>
          ))}
          
          {/* Mobile Book Now Button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="mt-4"
          >
            <Button 
              className="w-full bg-gradient-to-r from-primary via-accent to-primary text-white border-none hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 px-6 py-3 rounded-full font-semibold relative overflow-hidden group"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ cursor: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0L19.0211 17.5H0.978853L10 0Z' fill='%23D35400'/%3E%3C/svg%3E\") 10 10, auto" }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <CalendarIcon size={16} />
                Book Now
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;