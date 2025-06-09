
import React, { useState } from 'react';
import { Section as SectionType } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Code, Database, Layout, Server, Settings } from 'lucide-react';

interface SkillsSectionProps {
  section: SectionType;
}

const SkillItem = ({ skill, index }: { skill: any; index: number }) => {
  const value = skill.level ? skill.level : Math.floor(Math.random() * 30) + 70;
  
  return (
    <div className="animate-fade-in mb-6" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="flex justify-between mb-1">
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="text-sm font-medium cursor-help text-gray-300">{skill.title}</span>
          </HoverCardTrigger>
          <HoverCardContent className="w-64 bg-gray-900/90 backdrop-blur-md border-gray-800">
            <p className="text-sm text-gray-300">{skill.content || `Details about ${skill.title}`}</p>
          </HoverCardContent>
        </HoverCard>
        <span className="text-xs font-medium text-primary">
          {value}%
        </span>
      </div>
      <Progress 
        value={value} 
        className="h-2 bg-gray-800"
      />
    </div>
  );
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ section }) => {
  const [activeCategory, setActiveCategory] = useState('All Skills');
  const categories = ['All Skills', 'Backend', 'Frontend', 'Database', 'Tools & DevOps'];
  
  // Get icon based on category
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Backend':
        return <Server className="h-4 w-4 mr-1" />;
      case 'Frontend':
        return <Layout className="h-4 w-4 mr-1" />;
      case 'Database':
        return <Database className="h-4 w-4 mr-1" />;
      case 'Tools & DevOps':
        return <Settings className="h-4 w-4 mr-1" />;
      default:
        return <Code className="h-4 w-4 mr-1" />;
    }
  };
  
  return (
    <section id="skills" className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Skills & Expertise</h2>
        <div className="h-1 w-20 bg-primary mx-auto mb-12"></div>
        
        <div className="flex justify-center mb-10">
          <Tabs defaultValue="All Skills" className="w-full">
            <TabsList className="flex justify-center mb-8 bg-white/5 backdrop-blur-md p-1 border border-primary/10 rounded-md">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center"
                >
                  {getCategoryIcon(category)}
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="All Skills">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-3">
                {section.subsections.map((skill, index) => (
                  <SkillItem key={skill.id} skill={skill} index={index} />
                ))}
              </div>
            </TabsContent>
            
            {categories.slice(1).map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-3">
                  {section.subsections
                    .filter((_, idx) => idx % categories.length === categories.indexOf(category) - 1)
                    .map((skill, index) => (
                      <SkillItem key={skill.id} skill={skill} index={index} />
                    ))
                  }
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="glass-card p-8 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-4">Professional Summary</h3>
            <p className="text-gray-300 mb-8">
              With years of experience in development, I specialize in creating efficient, scalable applications. My expertise spans the full development lifecycle, from architecture design to deployment and monitoring.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-primary/10 p-4 rounded-lg backdrop-blur-md">
                <div className="text-3xl font-bold text-primary mb-1">5+</div>
                <div className="text-sm text-gray-400">Years of Experience</div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg backdrop-blur-md">
                <div className="text-3xl font-bold text-primary mb-1">20+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg backdrop-blur-md">
                <div className="text-3xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-gray-400">Happy Clients</div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg backdrop-blur-md">
                <div className="text-3xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-gray-400">Technologies Mastered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
