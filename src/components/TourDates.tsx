import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";

interface TourEvent {
  id: number;
  date: string;
  venue: string;
  location: string;
  time: string;
  status: "Available" | "Limited" | "Sold Out";
}

const tourDates: TourEvent[] = [
  {
    id: 1,
    date: "Apr 20, 2025",
    venue: "Cosmic Arena",
    location: "Los Angeles, CA",
    time: "8:00 PM",
    status: "Available",
  },
  {
    id: 2,
    date: "May 05, 2025",
    venue: "Stellar Stadium",
    location: "New York, NY",
    time: "7:30 PM",
    status: "Limited",
  },
  {
    id: 3,
    date: "May 18, 2025",
    venue: "Nebula Nightclub",
    location: "Miami, FL",
    time: "9:00 PM",
    status: "Sold Out",
  },
  {
    id: 4,
    date: "Jun 02, 2025",
    venue: "Echo Amphitheater",
    location: "Austin, TX",
    time: "8:30 PM",
    status: "Available",
  },
];

const TourDates = () => {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4">Upcoming Shows</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-sm md:text-base">
            Experience the electrifying live performance and immersive visuals at these upcoming tour dates
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-4 md:space-y-6">
            {tourDates.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
                className={`group relative bg-card rounded-xl p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 ${
                  hoveredEvent === event.id ? "bg-primary/5 transform scale-[1.02]" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Date Section */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl border border-primary/20">
                      <Calendar size={20} className="text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg md:text-xl font-bold text-foreground">{event.date}</span>
                      <div className="flex items-center gap-1 text-sm text-foreground/60">
                        <Clock size={14} />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Event Details */}
                  <div className="flex-1 md:mx-6">
                    <h3 className="font-bold text-lg md:text-xl text-foreground mb-2">{event.venue}</h3>
                    <div className="flex items-center gap-2 text-sm md:text-base text-foreground/70">
                      <MapPin size={16} className="text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  {/* Status Indicator */}
                  <div className="flex items-center justify-end">
                    <div className={`h-3 w-3 rounded-full ${
                      event.status === "Available" ? "bg-green-500" :
                      event.status === "Limited" ? "bg-amber-500" :
                      "bg-red-500"
                    } animate-pulse`} />
                  </div>
                </div>
                
                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 ${
                  hoveredEvent === event.id ? "opacity-100" : ""
                }`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TourDates;
