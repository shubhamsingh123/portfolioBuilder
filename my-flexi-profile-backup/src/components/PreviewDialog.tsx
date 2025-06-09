
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext';
import { getBackgroundStyle } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PreviewDialogProps {
  sectionId?: string;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "sm" | "default" | "lg";
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({ 
  sectionId,
  buttonVariant = "outline",
  size = "sm"
}) => {
  const { profile } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  
  if (!profile) return null;
  
  // Get the specific section if sectionId is provided
  const section = sectionId 
    ? profile.sections.find(s => s.id === sectionId) 
    : null;
  
  // Render a specific section preview
  const renderSectionPreview = () => {
    if (!section) return null;
    
    let content = (
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">{section.title}</h3>
        {section.subsections.slice(0, 3).map((subsection, idx) => (
          <div key={idx} className="mb-3">
            <h4 className="font-medium">{subsection.title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{subsection.content}</p>
          </div>
        ))}
        {section.subsections.length > 3 && (
          <p className="text-sm text-muted-foreground italic">+{section.subsections.length - 3} more items</p>
        )}
      </div>
    );

    // Apply background if available
    if (section.backgroundUrl) {
      return (
        <div 
          className="relative bg-cover bg-center rounded-md overflow-hidden"
          style={getBackgroundStyle(section.backgroundUrl)}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 p-6">
            {content}
          </div>
        </div>
      );
    }
    
    // Default styling
    return <div className="border rounded-md">{content}</div>;
  };
  
  // Render full profile preview
  const renderFullProfilePreview = () => {
    if (!profile.sections.length) {
      return <div className="text-center py-8">No sections to preview</div>;
    }
    
    const sortedSections = [...profile.sections].sort((a, b) => a.order - b.order);
    
    return (
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-6 p-2">
          {/* Header preview */}
          <div className="bg-primary/10 p-6 rounded-md">
            <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
            <p className="text-muted-foreground line-clamp-2">{profile.bio}</p>
          </div>
          
          {/* Sections preview */}
          {sortedSections.map(section => {
            let content = (
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{section.title}</h3>
                {section.subsections.slice(0, 2).map((subsection, idx) => (
                  <div key={idx} className="mb-2">
                    <h4 className="font-medium">{subsection.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">{subsection.content}</p>
                  </div>
                ))}
                {section.subsections.length > 2 && (
                  <p className="text-sm text-muted-foreground italic">+{section.subsections.length - 2} more items</p>
                )}
              </div>
            );

            // Apply background if available
            if (section.backgroundUrl) {
              return (
                <div 
                  key={section.id}
                  className="relative bg-cover bg-center rounded-md overflow-hidden"
                  style={getBackgroundStyle(section.backgroundUrl)}
                >
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="relative z-10 p-6">
                    {content}
                  </div>
                </div>
              );
            }
            
            // Default styling
            return (
              <div key={section.id} className="border rounded-md">
                {content}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={buttonVariant} 
          size={size} 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1"
        >
          <Eye size={16} />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {sectionId ? "Section Preview" : "Profile Preview"}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {sectionId ? renderSectionPreview() : renderFullProfilePreview()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialog;
