const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Birds */}
      <div className="absolute top-20 right-10 animate-float-slow">
        <svg width="60" height="40" viewBox="0 0 60 40" className="text-white/30">
          <path
            d="M10 20 C15 10, 25 10, 30 20 C35 10, 45 10, 50 20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>
      
      {/* Hot Air Balloon */}
      <div className="absolute top-32 left-10 animate-float-slow [animation-delay:2s]">
        <svg width="80" height="100" viewBox="0 0 80 100" className="text-accent/40">
          {/* Balloon */}
          <ellipse cx="40" cy="35" rx="25" ry="30" fill="currentColor" />
          {/* Basket */}
          <rect x="35" y="70" width="10" height="8" fill="currentColor" />
          {/* Strings */}
          <line x1="20" y1="55" x2="35" y2="70" stroke="currentColor" strokeWidth="1" />
          <line x1="60" y1="55" x2="45" y2="70" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Floating Clouds */}
      <div className="absolute top-16 left-1/4 animate-float-slower">
        <svg width="100" height="60" viewBox="0 0 100 60" className="text-white/20">
          <path
            d="M20 40 C10 40, 5 30, 15 20 C20 10, 40 10, 50 20 C60 15, 80 15, 85 25 C95 30, 90 40, 80 40 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Stars */}
      <div className="absolute top-24 right-1/4 animate-star-twinkle">
        <svg width="20" height="20" viewBox="0 0 20 20" className="text-accent/60">
          <path
            d="M10 0 L12 6 L20 8 L12 10 L10 20 L8 10 L0 8 L8 6 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="absolute top-40 left-1/3 animate-star-twinkle [animation-delay:1s]">
        <svg width="15" height="15" viewBox="0 0 15 15" className="text-white/50">
          <path
            d="M7.5 0 L9 4.5 L15 6 L9 7.5 L7.5 15 L6 7.5 L0 6 L6 4.5 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Mountain Silhouette */}
      <div className="absolute bottom-0 right-0 opacity-30">
        <svg width="300" height="150" viewBox="0 0 300 150" className="text-white/20">
          <path
            d="M0 150 L50 100 L100 120 L150 80 L200 100 L250 60 L300 80 L300 150 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default FloatingElements;