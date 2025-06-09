
import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const Background3D = ({ density = "medium" }: { density?: "low" | "medium" | "high" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, accent } = useTheme();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Number of floating elements based on density
    const densityMap = {
      low: 8,
      medium: 15,
      high: 25
    };
    
    const numBubbles = densityMap[density];
    
    // Remove existing bubbles
    container.innerHTML = '';
    
    // Get color based on accent
    let bubbleColor = "rgba(59, 130, 246, 0.2)"; // blue default
    if (accent === "purple") bubbleColor = "rgba(147, 51, 234, 0.2)";
    if (accent === "green") bubbleColor = "rgba(16, 185, 129, 0.2)";
    if (accent === "orange") bubbleColor = "rgba(249, 115, 22, 0.2)";
    
    // Create grid overlay
    const grid = document.createElement('div');
    grid.classList.add('absolute', 'inset-0');
    grid.style.background = "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzMCwzMCw2MCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')";
    grid.style.opacity = theme === 'dark' ? '0.5' : '0.2';
    container.appendChild(grid);
    
    // Create large center bubble
    const centerBubble = document.createElement('div');
    centerBubble.classList.add('absolute');
    centerBubble.style.width = '600px';
    centerBubble.style.height = '600px';
    centerBubble.style.left = '50%';
    centerBubble.style.top = '30%';
    centerBubble.style.transform = 'translate(-50%, -50%)';
    centerBubble.style.background = `radial-gradient(circle at center, ${bubbleColor.replace('0.2', '0.15')} 0%, ${bubbleColor.replace('0.2', '0.05')} 60%, transparent 70%)`;
    centerBubble.style.borderRadius = '50%';
    centerBubble.style.filter = 'blur(60px)';
    centerBubble.style.animation = 'pulse 8s ease-in-out infinite alternate';
    container.appendChild(centerBubble);
    
    // Create bubbles
    for (let i = 0; i < numBubbles; i++) {
      const size = Math.random() * 300 + 100;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.2 + 0.05;
      
      const bubble = document.createElement('div');
      bubble.classList.add('absolute', 'rounded-full');
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;
      bubble.style.background = bubbleColor.replace('0.2', opacity.toString());
      bubble.style.filter = 'blur(40px)';
      bubble.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
      
      container.appendChild(bubble);
    }
    
    // Add keyframe animation
    if (!document.getElementById('background3d-keyframes')) {
      const style = document.createElement('style');
      style.id = 'background3d-keyframes';
      style.innerHTML = `
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -15px); }
          50% { transform: translate(-5px, 10px); }
          75% { transform: translate(-15px, -5px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.1; transform: translate(-50%, -50%) scale(1.1); }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      container.innerHTML = '';
    };
  }, [theme, accent, density]);
  
  return <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"></div>;
};

export default Background3D;
