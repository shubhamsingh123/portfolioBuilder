
import React from 'react';
import { Profile } from '@/types';

interface AboutSectionProps {
  profile: Profile;
}

const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="about" className="py-20 bg-[#0B1120]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">About Me</h2>
        <div className="h-1 w-20 bg-primary mx-auto mb-12"></div>
        
        <div className="max-w-3xl mx-auto glass-card p-8 border border-primary/20">
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {profile.bio || "Bio information not available."}
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-5 rounded-lg backdrop-blur-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Skills</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">Web Development</li>
                <li className="text-gray-300">UI/UX Design</li>
                <li className="text-gray-300">Mobile Development</li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-5 rounded-lg backdrop-blur-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Interests</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">AI & Machine Learning</li>
                <li className="text-gray-300">Cloud Computing</li>
                <li className="text-gray-300">IoT Development</li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-5 rounded-lg backdrop-blur-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Education</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">BS Computer Science</li>
                <li className="text-gray-300">MS Software Engineering</li>
                <li className="text-gray-300">Multiple Certifications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
