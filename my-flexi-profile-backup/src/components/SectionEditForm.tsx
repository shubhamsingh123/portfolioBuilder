import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { SectionService } from '@/services/SectionService';

interface SectionFormData {
  title: string;
  content: string;
}

export const SectionEditForm: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<SectionFormData>({
    title: '',
    content: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadSection = async () => {
      if (!sectionId) return;
      
      try {
        setIsLoading(true);
        const section = await SectionService.getSection(parseInt(sectionId));
        setFormData({
          title: section.title,
          content: section.content || ''
        });
      } catch (error) {
        console.error('Failed to load section:', error);
        toast({
          title: 'Error',
          description: 'Failed to load section. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSection();
  }, [sectionId, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectionId) return;

    try {
      setIsLoading(true);
      await SectionService.updateSection(parseInt(sectionId), {
        ...formData,
        id: parseInt(sectionId),
        profileId: 0, // This will be set by the backend
        orderIndex: 0, // This will be preserved by the backend
        type: 'custom', // This will be preserved by the backend
        subSections: [] // This will be preserved by the backend
      });

      toast({
        title: 'Success',
        description: 'Section updated successfully',
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to update section:', error);
      toast({
        title: 'Error',
        description: 'Failed to update section. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter section title"
                disabled={isLoading}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Enter section content"
                disabled={isLoading}
                required
                className="min-h-[200px]"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SectionEditForm;
