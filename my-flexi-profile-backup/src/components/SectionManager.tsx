import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import { useProfile } from '../contexts/ProfileContext';
import { Section, SectionType } from '@/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface SectionManagerProps {
  profileId: number | null;
}

export const SectionManager: React.FC<SectionManagerProps> = ({ profileId }) => {
  const { profile, addSection, updateSection, removeSection } = useProfile();
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [deletingSection, setDeletingSection] = useState<Section | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

const sections = profile?.sections || [];

  useEffect(() => {
    // Set loading state based on profile ID
    setIsLoading(profileId === null);
    setError(null);
  }, [profileId]);

  const handleCreateSection = async () => {
    if (!newSectionTitle.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Section title cannot be empty"
      });
      return;
    }
    try {
      if (!profileId) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Profile ID is required to create a section"
        });
        return;
      }
      await addSection('custom' as SectionType, newSectionTitle.trim());
      setNewSectionTitle('');
      toast({
        title: "Success",
        description: "Section created successfully"
      });
    } catch (err) {
      console.error('Error creating section:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create section"
      });
    }
  };

  const handleUpdateSection = async () => {
    if (!editingSection) return;
    if (!editingSection.title.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Section title cannot be empty"
      });
      return;
    }
    try {
      await updateSection(editingSection.id ?? 0, {
        title: editingSection.title,
      });
      setEditingSection(null);
      toast({
        title: "Success",
        description: "Section updated successfully"
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update section"
      });
    }
  };

  const handleDeleteSection = async () => {
    if (!deletingSection) return;
    try {
      await removeSection(deletingSection.id!);
      setDeletingSection(null);
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

  if (isLoading) {
    return <div>Loading sections...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Error: Profile not found</div>;
  }

  return (
    <div className="space-y-4">
      {sections.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>You haven't added any sections yet.</p>
          <p className="text-sm mt-2">Switch to the "Add Section" tab to create your first section.</p>
        </div>
      ) : (
        sections.map((section) => (
          <Card key={section.id} className="p-4">
            {editingSection?.id === section.id ? (
              <div className="space-y-4">
                <Input
                  value={editingSection.title}
                  onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button onClick={handleUpdateSection}>Save</Button>
                  <Button variant="outline" onClick={() => setEditingSection(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setEditingSection(section)}>Edit</Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" onClick={() => setDeletingSection(section)}>
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the
                          "{section.title}" section and all its contents.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeletingSection(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteSection}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
          </Card>
        ))
      )}
    </div>
  );
};
