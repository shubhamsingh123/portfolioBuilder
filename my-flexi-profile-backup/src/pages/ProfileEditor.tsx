
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import InputField from '@/components/forms/InputField';
import { useToast } from '@/components/ui/use-toast';
import { User, Image, Save, Eye } from 'lucide-react';
import PreviewDialog from '@/components/PreviewDialog';
import Background3D from '@/components/Background3D';
import { SectionManager } from '@/components/SectionManager';

const ProfileEditor = () => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const { toast } = useToast();
  
  const [name, setName] = useState(profile?.name || '');
  const [bio, setBio] = useState(profile?.bio || '');
  
  if (!user || !profile) {
    return <Navigate to="/login" />;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateProfile({
      name,
      bio
    });
    
    toast({
      title: 'Profile updated',
      description: 'Your profile changes have been saved',
    });
  };
  
  return (
    <Layout>
      <div className="three-bg" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
        <Background3D density="low" />
      </div>
      
      <div className="container py-8 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <div className="flex gap-2">
            <PreviewDialog buttonVariant="outline" size="sm" />
            <Button
              variant="outline"
              onClick={() => window.history.back()}
            >
              Back
            </Button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatarUrl} />
                  <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
                    <User size={32} />
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Image size={16} />
                    Upload Picture
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended size: 400x400px. Max size: 2MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <InputField
                  label="Display Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                />
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="bio">
                    Bio
                  </label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Write a brief description about yourself"
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Sections</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.id !== null ? (
                <SectionManager profileId={profile.id} />
              ) : (
                <p>Please save your profile before adding sections.</p>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" className="flex items-center gap-2">
              <Save size={16} />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ProfileEditor;
