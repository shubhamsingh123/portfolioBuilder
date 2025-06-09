
import React, { useEffect, useState } from 'react';
import { ProfileService } from '@/types/ProfileService';
import { Profile } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/**
 * Example component showcasing how to use the ProfileService
 * This is just for demonstration and should not be used in production
 */
const ProfileServiceExample: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Initialize the service - in a real app, you would use dependency injection or a context
  const profileService = new ProfileService('http://localhost:8080/api');
  
  // Fetch profiles on component mount
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Set the auth token (in a real app, this would come from your auth system)
        profileService.setAuthToken('example-auth-token');
        
        // Fetch all profiles
        const fetchedProfiles = await profileService.getAllProfiles();
        setProfiles(fetchedProfiles);
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError('Failed to load profiles. Please try again later.');
        
        // Show error toast
        toast({
          title: "Error",
          description: "Failed to load profiles. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfiles();
  }, []);
  
  // Example of creating a new profile
  const handleCreateProfile = async () => {
    try {
      setLoading(true);
      
      // Create a new profile
      const newProfile: Profile = {
        id: '', // Will be assigned by the backend
        userId: 'current-user-id',
        name: 'New Profile',
        bio: 'This is a new profile created via the API',
        isPublic: false,
        sections: []
      };
      
      const createdProfile = await profileService.createProfile(newProfile);
      
      // Add the new profile to the list
      setProfiles(prev => [...prev, createdProfile]);
      
      // Show success toast
      toast({
        title: "Success",
        description: "New profile created successfully!",
      });
    } catch (err) {
      console.error('Error creating profile:', err);
      
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Example of deleting a profile
  const handleDeleteProfile = async (id: string) => {
    try {
      setLoading(true);
      
      // Delete the profile
      await profileService.deleteProfile(id);
      
      // Remove it from the list
      setProfiles(prev => prev.filter(profile => profile.id !== id));
      
      // Show success toast
      toast({
        title: "Success",
        description: "Profile deleted successfully!",
      });
    } catch (err) {
      console.error(`Error deleting profile with ID ${id}:`, err);
      
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to delete profile. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profiles</h1>
        <Button onClick={handleCreateProfile} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
          Create Profile
        </Button>
      </div>
      
      {loading && profiles.length === 0 ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : error ? (
        <div className="py-8 text-center text-red-500">{error}</div>
      ) : profiles.length === 0 ? (
        <div className="py-8 text-center text-gray-500">No profiles found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map(profile => (
            <Card key={profile.id}>
              <CardHeader>
                <CardTitle>{profile.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{profile.bio}</p>
                <p className="text-sm text-gray-500">
                  Sections: {profile.sections.length}
                </p>
                <div className="flex justify-end mt-4">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteProfile(profile.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileServiceExample;
