
import React from 'react';
import { Section as SectionType } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  EnhancedCard, 
  EnhancedCardContent, 
  EnhancedCardFooter, 
  EnhancedCardHeader, 
  EnhancedCardTitle 
} from '@/components/ui/enhanced-card';
import { Github, ExternalLink, Code } from 'lucide-react';

interface ProjectSectionProps {
  section: SectionType;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ section }) => {
  return (
    <section id="projects" className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">{section.title}</h2>
        <div className="h-1 w-20 bg-primary mx-auto mb-12"></div>
        
        <div className="text-center mb-10">
          <p className="text-gray-300 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each demonstrates different aspects of my technical skills and problem-solving approach.
          </p>
        </div>
        
        {section.subsections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground italic">No projects added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {section.subsections.map((project) => (
              <EnhancedCard key={project.id} className="hover-lift hover-glow overflow-hidden h-full flex flex-col">
                {project.imageUrl && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                )}
                <EnhancedCardHeader icon={<Code className="h-5 w-5" />}>
                  <EnhancedCardTitle>{project.title}</EnhancedCardTitle>
                </EnhancedCardHeader>
                <EnhancedCardContent className="flex-grow">
                  <p className="text-gray-400 text-sm">{project.content}</p>
                </EnhancedCardContent>
                <EnhancedCardFooter 
                  badges={["React", "TypeScript", "Node.js"].slice(0, Math.floor(Math.random() * 3) + 1)}
                >
                  <Button 
                    variant="outline"
                    size="sm" 
                    className="flex items-center gap-1"
                    asChild
                  >
                    <a 
                      href="https://github.com"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Github size={14} className="mr-1" /> Code
                    </a>
                  </Button>
                  {project.link && (
                    <Button 
                      size="sm" 
                      className="flex items-center gap-1"
                      asChild
                    >
                      <a 
                        href={project.link}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={14} className="mr-1" /> Demo
                      </a>
                    </Button>
                  )}
                </EnhancedCardFooter>
              </EnhancedCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
