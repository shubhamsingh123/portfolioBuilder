
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CSSProperties } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Predefined background options
export const backgroundOptions = [
  { id: 'none', name: 'None', url: '' },
  { id: 'bubbles', name: 'Bubbles', url: '/backgrounds/bubbles.webp' },
  { id: 'geometric', name: 'Geometric', url: '/backgrounds/geometric.webp' },
  { id: 'gradient', name: 'Gradient', url: '/backgrounds/gradient.webp' },
  { id: 'waves', name: 'Waves', url: '/backgrounds/waves.webp' },
  { id: 'circuit', name: 'Circuit', url: '/backgrounds/circuit.webp' },
  { id: 'stars', name: 'Stars', url: '/backgrounds/stars.webp' },
  { id: 'particles', name: 'Particles', url: '/backgrounds/particles.webp' },
  { id: 'abstract', name: 'Abstract', url: '/backgrounds/abstract.webp' },
  { id: 'mountains', name: 'Mountains', url: '/backgrounds/mountains.webp' },
  { id: 'forest', name: 'Forest', url: '/backgrounds/forest.webp' },
  { id: 'city', name: 'City', url: '/backgrounds/city.webp' },
]

// Get background style based on background URL with proper typing
export function getBackgroundStyle(backgroundUrl: string | undefined): CSSProperties {
  if (!backgroundUrl) return {};
  
  return {
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
}

// Enhanced card styles with unique designs
export const cardStyleOptions = [
  { id: 'default', name: 'Default', icon: '🔳', color: 'default' },
  { id: 'modern', name: 'Modern', icon: '🌈', color: 'blue' },
  { id: 'minimal', name: 'Minimal', icon: '🔲', color: 'gray' },
  { id: 'gradient', name: 'Gradient', icon: '🎨', color: 'blue' },
  { id: 'flat', name: 'Flat', icon: '📄', color: 'purple' },
  { id: 'shadow', name: 'Shadow', icon: '💠', color: 'blue' },
  { id: 'rounded', name: 'Rounded', icon: '🔄', color: 'green' },
  { id: 'neon', name: 'Neon', icon: '✨', color: 'cyan' },
  { id: 'glass', name: 'Glass', icon: '🔍', color: 'transparent' },
  { id: 'outline', name: 'Outline', icon: '✏️', color: 'gray' },
  { id: 'soft', name: 'Soft', icon: '☁️', color: 'light-blue' },
  { id: 'vibrant', name: 'Vibrant', icon: '🎭', color: 'orange' },
  { id: 'elegant', name: 'Elegant', icon: '👔', color: 'navy' },
  { id: 'playful', name: 'Playful', icon: '🎮', color: 'pink' },
  { id: 'minimal-dark', name: 'Minimal Dark', icon: '⬛', color: 'black' },
  { id: 'sunset', name: 'Sunset', icon: '🌅', color: 'orange' },
  { id: 'nature', name: 'Nature', icon: '🌿', color: 'green' },
  { id: 'ocean', name: 'Ocean', icon: '🌊', color: 'blue' },
  { id: 'tech', name: 'Tech', icon: '💻', color: 'gray' },
  { id: 'retro', name: 'Retro', icon: '📼', color: 'purple' },
  { id: 'geometric', name: 'Geometric', icon: '🔷', color: 'teal' },
  { id: 'futuristic', name: 'Futuristic', icon: '🚀', color: 'silver' },
  { id: 'vintage', name: 'Vintage', icon: '🕰️', color: 'sepia' },
  { id: 'cosmic', name: 'Cosmic', icon: '🌌', color: 'indigo' }
]

// Get card style based on style type
export function getCardStyle(style: string | undefined) {
  switch(style) {
    case 'modern':
      return "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-md relative p-6";
    case 'minimal':
      return "border border-dashed border-muted-foreground/30 bg-background/50 shadow-sm relative p-6";
    case 'gradient':
      return "bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-none relative p-6";
    case 'flat':
      return "bg-blue-50 border-l-4 border-blue-400 relative p-6";
    case 'shadow':
      return "bg-white shadow-lg border border-gray-100 relative p-6";
    case 'rounded':
      return "bg-green-50 rounded-xl shadow border border-green-100 relative p-6";
    case 'neon':
      return "bg-black/80 border-2 border-cyan-400 text-white shadow-[0_0_10px_rgba(0,255,255,0.5)] relative p-6";
    case 'glass':
      return "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg relative p-6";
    case 'outline':
      return "bg-transparent border-2 border-gray-300 shadow-inner relative p-6";
    case 'soft':
      return "bg-blue-50/40 border border-blue-100 shadow-sm relative p-6";
    case 'vibrant':
      return "bg-gradient-to-r from-orange-100 to-yellow-100 border-l-4 border-orange-400 relative p-6";
    case 'elegant':
      return "bg-slate-900 text-white border-l-4 border-amber-400 shadow-md relative p-6";
    case 'playful':
      return "bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg border border-pink-200 shadow-md relative p-6";
    case 'minimal-dark':
      return "bg-gray-900 text-white border border-gray-800 relative p-6";
    case 'sunset':
      return "bg-gradient-to-r from-orange-200 to-red-200 border border-orange-300 relative p-6";
    case 'nature':
      return "bg-green-50 border-t-4 border-green-500 shadow-md relative p-6";
    case 'ocean':
      return "bg-gradient-to-r from-blue-100 to-cyan-100 border-b-4 border-blue-400 relative p-6";
    case 'tech':
      return "bg-gray-100 border-l-2 border-gray-400 shadow relative p-6";
    case 'retro':
      return "bg-amber-50 border-2 border-purple-300 shadow-md relative p-6";
    case 'geometric':
      return "bg-gradient-to-br from-teal-50 to-cyan-50 border-r-4 border-teal-400 relative p-6";
    case 'futuristic':
      return "bg-gradient-to-r from-gray-100 to-gray-200 border-t-2 border-b-2 border-gray-300 shadow-lg relative p-6";
    case 'vintage':
      return "bg-amber-50/70 border border-amber-200 shadow-inner relative p-6";
    case 'cosmic':
      return "bg-gradient-to-br from-indigo-100 to-purple-100 border border-indigo-200 shadow-lg relative p-6";
    case 'default':
    default:
      return "relative p-6";
  }
}

// Custom file upload handler - returns a Promise that resolves to the data URL
export function handleImageUpload(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
}
