import React, { useState, useEffect } from 'react';
import { SectionService } from '../services/SectionService';
import { SectionDTO } from '../types/dto/SectionDTO';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';

interface SectionListProps {
  profileId: number | null;
}

export const SectionList: React.FC<SectionListProps> = ({ profileId }) => {
  const [sections, setSections] = useState<SectionDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSection, setNewSection] = useState<Partial<SectionDTO>>({
    title: '',
    content: '',
    profileId: profileId || 0,
    orderIndex: 0,
    subSections: []
  });
  const [sectionsAvailable, setSectionsAvailable] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    if (profileId !== null) {
      loadSections();
    } else {
      setLoading(false);
      setSections([]);
    }
  }, [profileId]);

  const loadSections = async () => {
    if (!sectionsAvailable || profileId === null) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await SectionService.getSectionsByProfile(profileId);
      setSections(data);
      setSectionsAvailable(data.length > 0);
      setError(null);
    } catch (err) {
      setError('Failed to load sections');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load sections"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSection = async () => {
    try {
      const created = await SectionService.createSection(newSection as SectionDTO);
      setSections([...sections, created]);
      setSectionsAvailable(true);
      setNewSection({
        title: '',
        content: '',
        profileId,
        orderIndex: sections.length,
        subSections: []
      });
      toast({
        title: "Success",
        description: "Section created successfully"
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create section"
      });
    }
  };

  const handleDeleteSection = async (sectionId: number) => {
    try {
      await SectionService.deleteSection(sectionId);
      const updatedSections = sections.filter(section => section.id !== sectionId);
      setSections(updatedSections);
      setSectionsAvailable(updatedSections.length > 0);
      toast({
        title: "Success",
        description: "Section deleted successfully"
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete section"
      });
    }
  };

  if (loading) {
    return <div>Loading sections...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <h2 className="text-2xl font-bold">Sections</h2>
        
        {/* Create new section form */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Create New Section</h3>
          <div className="space-y-4">
            <Input
              placeholder="Section Title"
              value={newSection.title}
              onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
            />
            <Textarea
              placeholder="Section Content"
              value={newSection.content}
              onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
            />
            <Button onClick={handleCreateSection}>Create Section</Button>
          </div>
        </Card>

        {/* List of sections */}
        {sections.map((section) => (
          <Card key={section.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <p className="mt-2">{section.content}</p>
                {section.subSections.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Subsections:</h4>
                    <ul className="list-disc pl-5">
                      {section.subSections.map((subsection) => (
                        <li key={subsection.id}>
                          <h5 className="font-medium">{subsection.title}</h5>
                          <p>{subsection.content}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <Button
                variant="destructive"
                onClick={() => section.id !== undefined && handleDeleteSection(section.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
