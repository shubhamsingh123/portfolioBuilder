
import React from 'react';
import { Profile } from '@/types';
import { Button } from '@/components/ui/button';
import { Share2, Edit, ArrowDown, Download, User } from 'lucide-react';
import { NavigateFunction } from 'react-router-dom';

interface HeroSectionProps {
  profile: Profile;
  handleShare: () => void;
  navigate: NavigateFunction;
}

const BubbleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large center bubble */}
      <div 
        className="absolute w-[800px] h-[800px] left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 opacity-30"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'pulse 8s ease-in-out infinite alternate'
        }}
      ></div>
      
      {/* Smaller bubbles */}
      <div className="absolute w-64 h-64 top-[30%] right-[10%] opacity-20"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.05) 60%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'float 15s ease-in-out infinite'
        }}></div>
      <div className="absolute w-96 h-96 bottom-[10%] left-[5%] opacity-15"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 60%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 20s ease-in-out 2s infinite alternate'
        }}></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
    </div>
  );
};

const HeroSection: React.FC<HeroSectionProps> = ({ profile, handleShare, navigate }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <BubbleBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0 animate-fade-in">
            <div className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
              Welcome to my portfolio
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
              Hi, I'm <span className="text-primary">{profile.name}</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
              {profile.tagline || "Professional Profile"}
            </h2>
            
            <p className="max-w-2xl mx-auto md:mx-0 text-gray-400 mb-8 text-lg">
              {profile.bio || "Welcome to my professional profile showcase. Browse through my experience, skills, and projects."}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {profile.isPublic && (
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="border-primary/50 text-primary hover:bg-primary/10"
                >
                  <Share2 size={16} className="mr-2" />
                  Share Profile
                </Button>
              )}
              <Button
                onClick={() => navigate('/profile')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Edit size={16} className="mr-2" />
                Edit Profile
              </Button>
              <Button
                variant="outline" 
                className="border-muted-foreground/30 text-muted-foreground hover:bg-muted/20"
              >
                <Download size={16} className="mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float">
              <div className="absolute -inset-4 rounded-full bg-primary/20 blur-xl animate-pulse-subtle"></div>
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="rounded-full border-4 border-primary/30 shadow-lg object-cover w-full h-full relative z-10"
                />
              ) : (
                <div className="rounded-full border-4 border-primary/30 shadow-lg bg-muted w-full h-full relative z-10 flex items-center justify-center">
                  <User size={80} className="text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary animate-bounce cursor-pointer"
           onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <ArrowDown size={20} />
      </div>
    </section>
  );
};

export default HeroSection;
