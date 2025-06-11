// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { useProfile } from '@/contexts/ProfileContext';
// import Layout from '@/components/Layout';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Progress } from '@/components/ui/progress';
// import { Switch } from '@/components/ui/switch';
// import { Label } from '@/components/ui/label';
// import { SectionType } from '@/types';
// import { Edit, Plus, Share2, Eye, EyeOff, LayoutDashboard, User, Settings, Briefcase, GraduationCap, Award, Code, Image } from 'lucide-react';
// import { ThemeToggler } from '@/components/ThemeToggler';
// import Background3D from '@/components/Background3D';
// import { useToast } from '@/components/ui/use-toast';
// import { getBackgroundStyle } from '@/lib/utils';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const { profile, isLoading, updateProfile, addSection } = useProfile();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [stats, setStats] = useState({
//     visitCount: 0,
//     completionPercentage: 0,
//     sectionsCount: 0,
//     lastUpdated: ''
//   });

//   // Redirect to login if user or profile is missing (after loading)
//   useEffect(() => {
//     if (!isLoading && (!user || !profile)) {
//       navigate('/login');
//     }
//   }, [user, profile, isLoading, navigate]);

//   useEffect(() => {
//     if (profile) {
//       setStats({
//         visitCount: Math.floor(Math.random() * 100) + 10,
//         completionPercentage: calculateProfileCompletion(),
//         sectionsCount: profile.sections.length,
//         lastUpdated: new Date().toLocaleDateString()
//       });
//     }
//   }, [profile]);

//   if (isLoading) {
//     return (
//       <Layout>
//         <div className="container py-8">
//           <p className="text-center">Loading your profile...</p>
//         </div>
//       </Layout>
//     );
//   }

//   // Render nothing while redirecting to login
//   if (!user || !profile) {
//     return null;
//   }

//   const calculateProfileCompletion = () => {
//     let score = 0;
    
//     if (profile.name) score += 10;
//     if (profile.bio) score += 10;
//     if (profile.avatarUrl) score += 10;
//     if (profile.coverUrl) score += 10;
    
//     const sectionsWithContent = profile.sections.filter(section => 
//       section.subsections.length > 0
//     );
    
//     score += sectionsWithContent.length * 10;
    
//     return Math.min(100, score);
//   };

//   const profileCompletion = calculateProfileCompletion();

//   const handleAddSection = (type: SectionType) => {
//     const sectionTitles: Record<SectionType, string> = {
//       'portfolio': 'Portfolio',
//       'career': 'Career Experience',
//       'education': 'Education',
//       'certifications': 'Certifications',
//       'skills': 'Skills',
//       'custom': 'Custom Section',
//       'about': 'About Me'
//     };
    
//     addSection(type, sectionTitles[type]);
//     toast({
//       title: "Section added",
//       description: `${sectionTitles[type]} section has been added to your profile.`,
//     });
//   };

//   const togglePublicProfile = () => {
//     updateProfile({ isPublic: !profile.isPublic });
//     toast({
//       title: profile.isPublic ? "Profile set to private" : "Profile set to public",
//       description: profile.isPublic 
//         ? "Your profile is now hidden from others" 
//         : "Your profile is now visible to everyone",
//     });
//   };

//   const sectionIcons: Record<SectionType, React.ReactNode> = {
//     'portfolio': <Code className="h-5 w-5" />,
//     'career': <Briefcase className="h-5 w-5" />,
//     'education': <GraduationCap className="h-5 w-5" />,
//     'certifications': <Award className="h-5 w-5" />,
//     'skills': <Settings className="h-5 w-5" />,
//     'custom': <Plus className="h-5 w-5" />,
//     'about': <User className="h-5 w-5" />
//   };

//   return (
//     <Layout>
//       <Background3D />
      
//       <div className="container py-8 relative z-10">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
//             <p className="text-muted-foreground mb-4">Manage your professional profile</p>
            
//             <div className="flex items-center gap-4 mb-2">
//               <Label htmlFor="public-profile" className="text-sm font-medium flex items-center gap-2">
//                 {profile.isPublic ? (
//                   <>
//                     <Eye size={16} className="text-primary" />
//                     Public Profile
//                   </>
//                 ) : (
//                   <>
//                     <EyeOff size={16} className="text-muted-foreground" />
//                     Private Profile
//                   </>
//                 )}
//               </Label>
//               <Switch
//                 id="public-profile"
//                 checked={profile.isPublic}
//                 onCheckedChange={togglePublicProfile}
//               />
//             </div>
            
//             {profile.isPublic && (
//               <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
//                 <Share2 size={14} />
//                 <span>Shareable URL: profilebuilder.app/{user.id}</span>
//               </div>
//             )}
//           </div>
          
//           <div className="flex gap-2 self-end md:self-auto">
//             <ThemeToggler />
//             <Button
//               variant="outline"
//               onClick={() => navigate('/profile')}
//               className="flex items-center gap-2"
//             >
//               <Edit size={16} />
//               Edit Profile
//             </Button>
//             <Button
//               onClick={() => navigate('/view')}
//               className="flex items-center gap-2"
//             >
//               <Eye size={16} />
//               View Profile
//             </Button>
//           </div>
//         </div>
        
//         <div className="dashboard-stats">
//           <div className="stat-card">
//             <span className="stat-value">{stats.visitCount}</span>
//             <span className="text-xs text-muted-foreground">Profile Views</span>
//           </div>
//           <div className="stat-card">
//             <span className="stat-value">{stats.completionPercentage}%</span>
//             <span className="text-xs text-muted-foreground">Profile Completed</span>
//           </div>
//           <div className="stat-card">
//             <span className="stat-value">{stats.sectionsCount}</span>
//             <span className="text-xs text-muted-foreground">Total Sections</span>
//           </div>
//           <div className="stat-card">
//             <span className="stat-value">{stats.lastUpdated}</span>
//             <span className="text-xs text-muted-foreground">Last Updated</span>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <Card className="md:col-span-2 elegant-card">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-xl flex items-center gap-2">
//                 <LayoutDashboard className="h-5 w-5" />
//                 Profile Sections
//               </CardTitle>
//               <CardDescription>Add and manage sections of your profile</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Tabs defaultValue="current" className="w-full">
//                 <TabsList className="mb-4 grid grid-cols-2">
//                   <TabsTrigger value="current">Current Sections</TabsTrigger>
//                   <TabsTrigger value="add">Add Section</TabsTrigger>
//                 </TabsList>
                
//                 <TabsContent value="current" className="space-y-4">
//                   {profile.sections.length === 0 ? (
//                     <div className="text-center py-8 text-muted-foreground">
//                       <p>You haven't added any sections to your profile yet.</p>
//                       <p className="text-sm mt-2">Get started by adding sections from the "Add Section" tab.</p>
//                     </div>
//                   ) : (
//                     profile.sections.map(section => (
//                       <div 
//                         key={section.id} 
//                         className={`p-4 border rounded-md hover:border-primary/40 hover:bg-muted/40 transition-colors ${section.backgroundUrl ? 'relative overflow-hidden' : ''}`}
//                       >
//                         {section.backgroundUrl && (
//                           <>
//                             <div 
//                               className="absolute inset-0 z-0 opacity-20" 
//                               style={getBackgroundStyle(section.backgroundUrl)}
//                             ></div>
//                             <div className="absolute inset-0 bg-background/50 z-0"></div>
//                           </>
//                         )}
                        
//                         <div className="flex justify-between items-center relative z-10">
//                           <div className="flex items-center gap-2">
//                             {sectionIcons[section.type as SectionType]}
//                             <h3 className="font-medium">{section.title}</h3>
//                             {section.backgroundUrl && (
//                               <div className="ml-2 bg-primary/20 text-primary text-xs rounded-full px-2 py-0.5 flex items-center gap-1">
//                                 <Image size={10} />
//                                 <span>Custom Background</span>
//                               </div>
//                             )}
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <span className="text-sm text-muted-foreground">
//                               {section.subsections.length} {section.subsections.length === 1 ? 'item' : 'items'}
//                             </span>
//                             <Button 
//                               variant="ghost" 
//                               size="sm" 
//                               onClick={() => navigate(`/section/${section.id}`)}
//                             >
//                               <Edit size={16} />
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </TabsContent>
                
//                 <TabsContent value="add" className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {(['portfolio', 'career', 'education', 'certifications', 'skills', 'custom', 'about'] as SectionType[]).map(type => (
//                     <Card key={type} className="hover:border-primary/40 hover:shadow-md transition-all duration-300">
//                       <CardHeader className="pb-2">
//                         <CardTitle className="text-lg capitalize flex items-center gap-2">
//                           {sectionIcons[type]}
//                           {type}
//                         </CardTitle>
//                       </CardHeader>
//                       <CardFooter>
//                         <Button 
//                           variant="outline" 
//                           size="sm" 
//                           className="w-full flex items-center gap-2"
//                           onClick={() => handleAddSection(type)}
//                         >
//                           <Plus size={16} />
//                           Add Section
//                         </Button>
//                       </CardFooter>
//                     </Card>
//                   ))}
//                 </TabsContent>
//               </Tabs>
//             </CardContent>
//           </Card>
          
//           <Card className="elegant-card">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-xl flex items-center gap-2">
//                 <User className="h-5 w-5" />
//                 Profile Progress
//               </CardTitle>
//               <CardDescription>Complete your profile to stand out</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <div className="progress-title">
//                   <span>Profile Completion</span>
//                   <span>{profileCompletion}%</span>
//                 </div>
//                 <Progress value={profileCompletion} className="h-2" />
//               </div>
              
//               <div className="space-y-3">
//                 {!profile.bio && (
//                   <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 text-sm">
//                     <span>• Add a bio description</span>
//                   </div>
//                 )}
//                 {!profile.avatarUrl && (
//                   <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 text-sm">
//                     <span>• Upload a profile picture</span>
//                   </div>
//                 )}
//                 {profile.sections.length === 0 && (
//                   <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 text-sm">
//                     <span>• Add at least one section</span>
//                   </div>
//                 )}
//                 {/* Add more hints as needed */}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { SectionType, Profile } from '@/types';
import { Edit, Plus, Share2, Eye, EyeOff, LayoutDashboard, User, Settings, Briefcase, GraduationCap, Award, Code, Image } from 'lucide-react';
import { ThemeToggler } from '@/components/ThemeToggler';
import Background3D from '@/components/Background3D';
import { useToast } from '@/components/ui/use-toast';
import { getBackgroundStyle } from '@/lib/utils';
import { SectionManager } from '@/components/SectionManager';

function calculateProfileCompletion(profile: Profile | null) {
  if (!profile) return 0;
  
  let score = 0;

  if (profile.name) score += 10;
  if (profile.bio) score += 10;
  if (profile.avatarUrl) score += 10;
  if (profile.coverUrl) score += 10;

  const sectionsWithContent = profile.sections?.filter(section =>
    section.subsections && section.subsections.length > 0
  ) || [];

  score += sectionsWithContent.length * 10;

  return Math.min(100, score);
}

const Dashboard = () => {
  const { user } = useAuth();
  const { profile, isLoading, isCreatingProfile, isFetchingProfile, updateProfile, addSection } = useProfile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    visitCount: 0,
    completionPercentage: 0,
    sectionsCount: 0,
    lastUpdated: ''
  });
  const [activeTab, setActiveTab] = useState<string>("current");
  const [isAddingSectionLoading, setIsAddingSectionLoading] = useState(false);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  // Update stats when profile changes
  useEffect(() => {
    console.log('Profile in Dashboard:', profile);
    if (profile) {
      setStats({
        visitCount: Math.floor(Math.random() * 100) + 10,
        completionPercentage: calculateProfileCompletion(profile),
        sectionsCount: profile.sections?.length || 0,
        lastUpdated: new Date().toLocaleDateString()
      });
    }
  }, [profile]);

  useEffect(() => {
    console.log('Dashboard mounted. Profile:', profile);
  }, []);

  if (isLoading || isCreatingProfile || isFetchingProfile) {
    return (
      <Layout>
        <div className="container py-8">
          <p className="text-center">
            {isCreatingProfile ? "Creating your profile..." : 
             isFetchingProfile ? "Fetching your profile..." : 
             "Loading your profile..."}
          </p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  if (!profile) {
    return (
      <Layout>
        <div className="container py-8">
          <p className="text-center text-red-500">
            Failed to load or create profile. Please try refreshing the page.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 mx-auto block"
          >
            Refresh Page
          </Button>
        </div>
      </Layout>
    );
  }

  const profileCompletion = calculateProfileCompletion(profile);

  const handleAddSection = async (type: SectionType) => {
    console.log('handleAddSection called with type:', type);
    console.log('Current profile state:', profile);
    
    if (!profile?.id) {
      console.error('Profile ID is not available');
      toast({
        title: "Error",
        description: "Profile ID is not available. Please try refreshing the page.",
        variant: "destructive",
      });
      return;
    }

    if (isCreatingProfile || isFetchingProfile) {
      toast({
        title: "Please wait",
        description: "Profile is still being processed...",
        variant: "default",
      });
      return;
    }

    const sectionTitles: Record<SectionType, string> = {
      'portfolio': 'Portfolio',
      'career': 'Career Experience',
      'education': 'Education',
      'certifications': 'Certifications',
      'skills': 'Skills',
      'custom': 'Custom Section',
      'about': 'About Me'
    };

    setIsAddingSectionLoading(true);
    try {
      const newSection = await addSection(type, sectionTitles[type]);
      console.log('Section added successfully:', newSection);
      toast({
        title: "Success",
        description: `${sectionTitles[type]} section has been added to your profile.`,
      });
      setActiveTab("current");
    } catch (error) {
      console.error('Error adding section:', error);
      toast({
        title: "Error",
        description: "Failed to add section. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingSectionLoading(false);
    }
  };

  const togglePublicProfile = () => {
    updateProfile({ isPublic: !profile.isPublic });
    toast({
      title: profile.isPublic ? "Profile set to private" : "Profile set to public",
      description: profile.isPublic
        ? "Your profile is now hidden from others"
        : "Your profile is now visible to everyone",
    });
  };

  const sectionIcons: Record<SectionType, React.ReactNode> = {
    'portfolio': <Code className="h-5 w-5" />,
    'career': <Briefcase className="h-5 w-5" />,
    'education': <GraduationCap className="h-5 w-5" />,
    'certifications': <Award className="h-5 w-5" />,
    'skills': <Settings className="h-5 w-5" />,
    'custom': <Plus className="h-5 w-5" />,
    'about': <User className="h-5 w-5" />
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-black">Welcome, {user.name}!</h1>
            <p className="text-black mb-4">Manage your professional profile</p>

            <div className="flex items-center gap-4 mb-2">
              <Label htmlFor="public-profile" className="text-sm font-medium flex items-center gap-2">
                {profile.isPublic ? (
                  <>
                    <Eye size={16} className="text-primary" />
                    Public Profile
                  </>
                ) : (
                  <>
                    <EyeOff size={16} className="text-muted-foreground" />
                    Private Profile
                  </>
                )}
              </Label>
              <Switch
                id="public-profile"
                checked={profile.isPublic}
                onCheckedChange={togglePublicProfile}
              />
            </div>

            {profile.isPublic && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Share2 size={14} />
                <span>Shareable URL: profilebuilder.app/{user.id}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 self-end md:self-auto">
            <ThemeToggler />
            <Button
              variant="outline"
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 bg-black text-white hover:bg-white hover:text-black border border-black"
            >
              <Edit size={16} />
              Edit Profile
            </Button>
            <Button
              onClick={() => navigate('/view')}
                                className="flex items-center gap-2 bg-black text-white hover:bg-white hover:text-black border border-black"
            >
              <Eye size={16} />
              View Profile
            </Button>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-value">{stats.visitCount}</span>
            <span className="text-xs text-muted-foreground">Profile Views</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.completionPercentage}%</span>
            <span className="text-xs text-muted-foreground">Profile Completed</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.sectionsCount}</span>
            <span className="text-xs text-muted-foreground">Total Sections</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.lastUpdated}</span>
            <span className="text-xs text-muted-foreground">Last Updated</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 elegant-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5" />
                Profile Sections
              </CardTitle>
              <CardDescription>Add and manage sections of your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4 grid grid-cols-2">
                  <TabsTrigger value="current">Current Sections</TabsTrigger>
                  <TabsTrigger value="add">Add Section</TabsTrigger>
                </TabsList>

                <TabsContent value="current" className="space-y-4">
                  {profile.id !== null ? (
                    <div className="grid grid-cols-1 gap-4">
                      {profile.sections.map(section => (
                        <Card key={section.id} className="hover:border-primary/40 hover:shadow-md transition-all duration-300">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg capitalize flex items-center gap-2">
                              {sectionIcons[section.type as SectionType]}
                              {section.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                {section.subsections?.length || 0} {section.subsections?.length === 1 ? 'item' : 'items'}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/section/${section.id}`)}
                                className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
                              >
                                <Edit size={16} />
                                Edit Content
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p>Loading profile...</p>
                  )}
                </TabsContent>

                <TabsContent value="add" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(['portfolio', 'career', 'education', 'certifications', 'skills', 'custom', 'about'] as SectionType[]).map(type => (
                    <Card key={type} className="hover:border-primary/40 hover:shadow-md transition-all duration-300">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg capitalize flex items-center gap-2">
                          {sectionIcons[type]}
                          {type}
                        </CardTitle>
                      </CardHeader>
                      <CardFooter>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full flex items-center gap-2 bg-black text-white hover:bg-white hover:text-black border border-black"
                          onClick={() => handleAddSection(type)}
                          disabled={isAddingSectionLoading}
                        >
                          {isAddingSectionLoading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                          ) : (
                            <Plus size={16} />
                          )}
                          {isAddingSectionLoading ? 'Adding...' : 'Add Section'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="elegant-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Progress
              </CardTitle>
              <CardDescription>Complete your profile to stand out</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="progress-title">
                  <span>Profile Completion</span>
                  <span>{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
              </div>

              <div className="space-y-3">
                {!profile.bio && (
                  <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 text-sm">
                    <span>• Add a bio description</span>
                  </div>
                )}
                {!profile.avatarUrl && (
                  <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 text-sm">
                    <span>• Upload a profile avatar</span>
                  </div>
                )}
                {profile.sections.length === 0 && (
                  <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 text-sm">
                    <span>• Add sections like career, skills, and portfolio</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
