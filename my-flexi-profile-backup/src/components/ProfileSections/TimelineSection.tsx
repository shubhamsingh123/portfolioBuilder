
import React from 'react';
import { 
  Calendar, MapPin, Briefcase, GraduationCap, Award, ExternalLink 
} from 'lucide-react';
import { Timeline, TimelineItem } from '@/components/ui/enhanced-timeline';
import { Section as SectionType } from '@/types';

interface TimelineSectionProps {
  section: SectionType;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ section }) => {
  // Choose icon based on section type
  const getIcon = (type: string) => {
    switch (type) {
      case 'career':
        return <Briefcase className="text-primary h-5 w-5" />;
      case 'education':
        return <GraduationCap className="text-primary h-5 w-5" />;
      case 'certifications':
        return <Award className="text-primary h-5 w-5" />;
      default:
        return null;
    }
  };

  const sectionIcon = getIcon(section.type);

  return (
    <section 
      id={section.type === 'career' ? 'experience' : section.type} 
      className="py-20 bg-black relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">
          {section.type === 'career' ? 'Professional Experience' : section.title}
        </h2>
        <div className="h-1 w-20 bg-primary mx-auto mb-12"></div>
        
        {section.subsections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground italic">No items in this section yet.</p>
          </div>
        ) : (
          <Timeline className="max-w-3xl mx-auto">
            {section.subsections.map((subsection, index) => (
              <TimelineItem
                key={subsection.id}
                title={subsection.title}
                subtitle={subsection.subtitle || ''}
                date={`${subsection.dateStart || ''} ${subsection.dateStart && subsection.dateEnd ? '—' : ''} ${subsection.dateEnd || 'Present'}`}
                content={subsection.content}
                icon={sectionIcon}
                badges={['React', 'TypeScript', 'Node.js'].slice(0, Math.floor(Math.random() * 3) + 1)}
                link={subsection.link}
                isLast={index === section.subsections.length - 1}
                className="animate-slide-up"
              />
            ))}
          </Timeline>
        )}
      </div>
    </section>
  );
};

export default TimelineSection;
