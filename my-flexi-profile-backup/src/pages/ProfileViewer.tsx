
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Background3D from '@/components/Background3D';

// Import sections
import HeroSection from '@/components/ProfileSections/HeroSection';
import AboutSection from '@/components/ProfileSections/AboutSection';
import TimelineSection from '@/components/ProfileSections/TimelineSection';
import ProjectSection from '@/components/ProfileSections/ProjectSection';
import SkillsSection from '@/components/ProfileSections/SkillsSection';
import ContactSection from '@/components/ProfileSections/ContactSection';

const ProfileViewer = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!user || !profile) {
    return <Navigate to="/login" />;
  }
  
  // Sort sections by their order property
  const sortedSections = [...profile.sections].sort((a, b) => a.order - b.order);
  
  // Find specific section types
  const skillsSection = sortedSections.find(s => s.type === 'skills');
  const careerSection = sortedSections.find(s => s.type === 'career');
  const portfolioSection = sortedSections.find(s => s.type === 'portfolio');
  const educationSection = sortedSections.find(s => s.type === 'education');
  const certificationsSection = sortedSections.find(s => s.type === 'certifications');
  const aboutSection = sortedSections.find(s => s.type === 'about');
  const otherSections = sortedSections.filter(
    s => !['skills', 'career', 'portfolio', 'education', 'certifications', 'about'].includes(s.type)
  );
  
  const handleShare = () => {
    // Copy the profile URL to clipboard
    navigator.clipboard.writeText(`profilebuilder.app/${user.id}`)
      .then(() => {
        toast({
          title: "Profile link copied!",
          description: "You can now share your profile with others."
        });
      })
      .catch(() => {
        toast({
          title: "Couldn't copy link",
          description: "Please try again or copy manually: profilebuilder.app/" + user.id,
          variant: "destructive"
        });
      });
  };
  
  if (!mounted) return null;

  // Function to render a section with its background
  const renderSection = (section, children) => {
    if (!section) return children;
    
    // Apply background if available
    if (section.backgroundUrl) {
      return (
        <div 
          className="relative mb-8"
          style={{
            backgroundImage: `url(${section.backgroundUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 p-6">
            {children}
          </div>
        </div>
      );
    }
    
    // Return children as is if no styling needed
    return <div className="mb-8">{children}</div>;
  };
  
  return (
    <Layout>
      {/* 3D Background */}
      <div className="fixed inset-0 -z-10">
        <Background3D density="high" />
      </div>
      
      {/* Hero Section */}
      <HeroSection 
        profile={profile}
        handleShare={handleShare}
        navigate={navigate}
      />
      
      {/* About Section */}
      {aboutSection && renderSection(
        aboutSection,
        <AboutSection profile={profile} />
      )}
      
      {/* Display specific sections with enhanced components */}
      {careerSection && renderSection(
        careerSection,
        <TimelineSection section={careerSection} />
      )}
      
      {educationSection && renderSection(
        educationSection,
        <TimelineSection section={educationSection} />
      )}
      
      {certificationsSection && renderSection(
        certificationsSection,
        <TimelineSection section={certificationsSection} />
      )}
      
      {skillsSection && renderSection(
        skillsSection,
        <SkillsSection section={skillsSection} />
      )}
      
      {portfolioSection && renderSection(
        portfolioSection,
        <ProjectSection section={portfolioSection} />
      )}
      
      {/* Display other sections */}
      {otherSections.map(section => {
        const sectionType = section.type;
        if (sectionType === 'skills') {
          return renderSection(
            section,
            <SkillsSection key={section.id} section={section} />
          );
        }
        if (sectionType === 'portfolio') {
          return renderSection(
            section,
            <ProjectSection key={section.id} section={section} />
          );
        }
        return renderSection(
          section,
          <TimelineSection key={section.id} section={section} />
        );
      })}
      
      {/* Contact Section */}
      <ContactSection profile={profile} />
      
      {/* Back to Top Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="icon"
          className="rounded-full bg-primary hover:bg-primary/90 shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </Layout>
  );
};

export default ProfileViewer;
