
import React, { useState, useEffect } from 'react';
import profileApiService, { RequestHelpers, ResponseValidators } from '../services/ProfileApiService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react';

const ProfileApiExample = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    tagline: '',
    email: '',
    phone: '',
    isPublic: false
  });
  const [editMode, setEditMode] = useState(false);
  const { toast } = useToast();

  // Initialize API service with auth token
  useEffect(() => {
    // In a real app, get this from your auth system
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      profileApiService.setAuthToken(authToken);
    }
    
    loadProfiles();
  }, []);

  // Load all profiles
  const loadProfiles = async () => {
    try {
      setLoading(true);
      const response = await profileApiService.getAllProfiles();
      
      if (ResponseValidators.isSuccessResponse(response)) {
        setProfiles(response.data || []);
      } else {
        throw new Error(ResponseValidators.extractErrorMessage(response));
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
      toast({
        title: "Error",
        description: "Failed to load profiles. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Create new profile
  const handleCreateProfile = async () => {
    try {
      setLoading(true);
      
      const requestData = RequestHelpers.createProfileRequest({
        ...formData,
        userId: 'current-user-id' // In real app, get from auth context
      });
      
      const response = await profileApiService.createProfile(requestData);
      
      if (ResponseValidators.isSuccessResponse(response)) {
        setProfiles(prev => [...prev, response.data]);
        setFormData({
          name: '',
          bio: '',
          tagline: '',
          email: '',
          phone: '',
          isPublic: false
        });
        
        toast({
          title: "Success",
          description: "Profile created successfully!"
        });
      } else {
        throw new Error(ResponseValidators.extractErrorMessage(response));
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Update existing profile
  const handleUpdateProfile = async () => {
    if (!selectedProfile) return;
    
    try {
      setLoading(true);
      
      const requestData = RequestHelpers.updateProfileRequest(formData);
      const response = await profileApiService.updateProfile(selectedProfile.id, requestData);
      
      if (ResponseValidators.isSuccessResponse(response)) {
        setProfiles(prev => prev.map(profile => 
          profile.id === selectedProfile.id ? response.data : profile
        ));
        
        setEditMode(false);
        setSelectedProfile(null);
        setFormData({
          name: '',
          bio: '',
          tagline: '',
          email: '',
          phone: '',
          isPublic: false
        });
        
        toast({
          title: "Success",
          description: "Profile updated successfully!"
        });
      } else {
        throw new Error(ResponseValidators.extractErrorMessage(response));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete profile
  const handleDeleteProfile = async (profileId) => {
    try {
      setLoading(true);
      
      const response = await profileApiService.deleteProfile(profileId);
      
      if (ResponseValidators.isSuccessResponse(response)) {
        setProfiles(prev => prev.filter(profile => profile.id !== profileId));
        
        toast({
          title: "Success",
          description: "Profile deleted successfully!"
        });
      } else {
        throw new Error(ResponseValidators.extractErrorMessage(response));
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      toast({
        title: "Error",
        description: "Failed to delete profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Start editing profile
  const startEdit = (profile) => {
    setSelectedProfile(profile);
    setFormData({
      name: profile.name || '',
      bio: profile.bio || '',
      tagline: profile.tagline || '',
      email: profile.email || '',
      phone: profile.phone || '',
      isPublic: profile.isPublic || false
    });
    setEditMode(true);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditMode(false);
    setSelectedProfile(null);
    setFormData({
      name: '',
      bio: '',
      tagline: '',
      email: '',
      phone: '',
      isPublic: false
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Profile API Demo</h1>
        <Button onClick={loadProfiles} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
          Refresh
        </Button>
      </div>

      {/* Create/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editMode ? 'Edit Profile' : 'Create New Profile'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <Input
              name="tagline"
              placeholder="Tagline"
              value={formData.tagline}
              onChange={handleInputChange}
            />
            <div className="md:col-span-2">
              <Textarea
                name="bio"
                placeholder="Bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleInputChange}
                className="rounded"
              />
              <label>Make profile public</label>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            {editMode ? (
              <>
                <Button onClick={handleUpdateProfile} disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Update Profile
                </Button>
                <Button variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleCreateProfile} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                <Plus className="h-4 w-4 mr-2" />
                Create Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Profiles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map(profile => (
          <Card key={profile.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {profile.name}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEdit(profile)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteProfile(profile.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.tagline && (
                <p className="text-sm text-gray-600 mb-2">{profile.tagline}</p>
              )}
              <p className="text-sm mb-2">{profile.bio}</p>
              <div className="text-xs text-gray-500">
                <p>Email: {profile.email || 'N/A'}</p>
                <p>Phone: {profile.phone || 'N/A'}</p>
                <p>Public: {profile.isPublic ? 'Yes' : 'No'}</p>
                <p>Sections: {profile.sections?.length || 0}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {profiles.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          No profiles found. Create your first profile above.
        </div>
      )}
    </div>
  );
};

export default ProfileApiExample;