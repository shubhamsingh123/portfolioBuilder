
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useProfile } from '@/contexts/ProfileContext';
// import { Section, SubSection } from '@/types';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
// import { useToast } from '@/components/ui/use-toast';
// import { Plus, Trash2, Edit, Image, Palette, UploadIcon } from 'lucide-react';
// import BackgroundSelector from '@/components/BackgroundSelector';
// import PreviewDialog from '@/components/PreviewDialog';
// import { handleImageUpload } from '@/lib/utils';

// interface SectionEditorProps {
//   sectionId: number;
// }

// const SectionEditor: React.FC<SectionEditorProps> = ({ sectionId }) => {
//   const navigate = useNavigate();
//   const { profile, updateSection, removeSection, addSubsection, updateSubsection, removeSubsection } = useProfile();
//   const { toast } = useToast();
  
//   const [newSubsectionTitle, setNewSubsectionTitle] = useState('');
//   const [newSubsectionContent, setNewSubsectionContent] = useState('');
//   const [editSubsectionId, setEditSubsectionId] = useState<number | null>(null);
//   const [editTitle, setEditTitle] = useState('');
//   const [editContent, setEditContent] = useState('');
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [isStyleDialogOpen, setIsStyleDialogOpen] = useState(false);
//   const [customBackgroundUrl, setCustomBackgroundUrl] = useState('');
//   const [isUploading, setIsUploading] = useState(false);
  
//   if (!profile) {
//     navigate('/dashboard');
//     return null;
//   }
  
//   const section = profile.sections.find(s => s.id === sectionId);
  
//   if (!section) {
//     navigate('/dashboard');
//     return null;
//   }
  
//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     updateSection(sectionId, { title: e.target.value });
//   };
  
//   const handleDelete = () => {
//     removeSection(sectionId);
//     toast({
//       title: 'Section removed',
//       description: 'Section has been deleted from your profile'
//     });
//     navigate('/dashboard');
//   };
  
//   const handleAddSubsection = () => {
//     if (!newSubsectionTitle.trim()) return;
    
//     addSubsection(sectionId, {
//       title: newSubsectionTitle,
//       content: newSubsectionContent
//     });
    
//     setNewSubsectionTitle('');
//     setNewSubsectionContent('');
//     setIsAddDialogOpen(false);
    
//     toast({
//       title: 'Item added',
//       description: 'New item has been added to this section'
//     });
//   };
  
//   const openEditSubsection = (subsection: SubSection) => {
//     if (subsection.id === null) return;
//     setEditSubsectionId(subsection.id);
//     setEditTitle(subsection.title);
//     setEditContent(subsection.content);
//     setIsEditDialogOpen(true);
//   };
  
//   const handleUpdateSubsection = () => {
//     if (!editSubsectionId || !editTitle.trim()) return;
    
//     updateSubsection(sectionId, editSubsectionId, {
//       title: editTitle,
//       content: editContent
//     });
    
//     setEditSubsectionId(null);
//     setIsEditDialogOpen(false);
    
//     toast({
//       title: 'Item updated',
//       description: 'Changes have been saved'
//     });
//   };
  
//   const handleRemoveSubsection = (subsectionId: number | null) => {
//     if (subsectionId === null) {
//       console.error('Cannot remove subsection with null id');
//       return;
//     }
//     removeSubsection(sectionId, subsectionId);
//     toast({
//       title: 'Item removed',
//       description: 'Item has been deleted from this section'
//     });
//   };

//   const handleBackgroundChange = (backgroundUrl: string) => {
//     updateSection(sectionId, { backgroundUrl });
//     toast({
//       title: 'Background updated',
//       description: 'Section background has been changed'
//     });
//   };
  
//   const handleImageUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
    
//     try {
//       setIsUploading(true);
//       const dataUrl = await handleImageUpload(file);
//       setCustomBackgroundUrl(dataUrl);
//       updateSection(sectionId, { backgroundUrl: dataUrl });
//       toast({
//         title: 'Background updated',
//         description: 'Your custom background has been set'
//       });
//       setIsUploading(false);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       toast({ 
//         title: 'Upload failed', 
//         description: 'Failed to upload image. Please try again.',
//         variant: 'destructive'
//       });
//       setIsUploading(false);
//     }
//   };
  
//   return (
//     <div className="container py-8 max-w-4xl">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Edit {section.title}</h1>
//         <div className="flex gap-2">
//           <PreviewDialog sectionId={sectionId.toString()} buttonVariant="outline" />
          
//           <Button 
//             variant="outline" 
//             size="sm" 
//             onClick={() => setIsStyleDialogOpen(true)}
//             className="flex items-center gap-2"
//           >
//             <Palette size={16} />
//             Background
//           </Button>
          
//           <AlertDialog>
//             <AlertDialogTrigger asChild>
//               <Button variant="destructive" size="sm" className="flex items-center gap-2">
//                 <Trash2 size={16} />
//                 Delete Section
//               </Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//               <AlertDialogHeader>
//                 <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                 <AlertDialogDescription>
//                   This will permanently delete this section and all its content. This action cannot be undone.
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel>Cancel</AlertDialogCancel>
//                 <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
          
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => navigate('/dashboard')}
//           >
//             Back to Dashboard
//           </Button>
//         </div>
//       </div>
      
//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle className="text-xl">Section Details</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="section-title">
//                 Title
//               </label>
//               <Input
//                 id="section-title"
//                 value={section.title}
//                 onChange={handleTitleChange}
//                 placeholder="Section Title"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="section-content">
//                 Content
//               </label>
//               <Textarea
//                 id="section-content"
//                 value={section.subsections[0]?.content || ''}
//                 onChange={(e) => {
//                   const content = e.target.value;
//                   if (section.subsections.length === 0) {
//                     addSubsection(sectionId, { title: 'Main Content', content });
//                   } else {
//                     updateSubsection(sectionId, section.subsections[0].id!, { content });
//                   }
//                 }}
//                 placeholder="Section Content"
//                 className="min-h-[200px]"
//                 required
//               />
//             </div>

//             <div className="flex justify-end space-x-2 pt-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => navigate('/dashboard')}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="button"
//                 onClick={() => {
//                   if (section.subsections.length === 0) {
//                     addSubsection(sectionId, {
//                       title: 'Main Content',
//                       content: section.subsections[0]?.content || ''
//                     });
//                   } else {
//                     updateSubsection(sectionId, section.subsections[0].id!, {
//                       content: section.subsections[0].content
//                     });
//                   }
//                   toast({
//                     title: 'Success',
//                     description: 'Section updated successfully',
//                   });
//                 }}
//               >
//                 Save Changes
//               </Button>
//             </div>
            
//             {section.backgroundUrl && (
//               <div className="pt-4 border-t">
//                 <label className="block text-sm font-medium mb-2">
//                   Current Background
//                 </label>
//                 <div className="w-full h-32 rounded-md overflow-hidden relative">
//                   <img 
//                     src={section.backgroundUrl} 
//                     alt="Section background" 
//                     className="w-full h-full object-cover"
//                   />
//                   <button
//                     onClick={() => handleBackgroundChange('')}
//                     className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 rounded-full"
//                   >
//                     <Trash2 size={14} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </form>
//         </CardContent>
//       </Card>
      
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Content Items</h2>
//         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//           <DialogTrigger asChild>
//             <Button size="sm" className="flex items-center gap-2">
//               <Plus size={16} />
//               Add Item
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Add New Item</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-4 py-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="new-title">
//                   Title
//                 </label>
//                 <Input
//                   id="new-title"
//                   value={newSubsectionTitle}
//                   onChange={e => setNewSubsectionTitle(e.target.value)}
//                   placeholder="Item Title"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="new-content">
//                   Content
//                 </label>
//                 <Textarea
//                   id="new-content"
//                   value={newSubsectionContent}
//                   onChange={e => setNewSubsectionContent(e.target.value)}
//                   placeholder="Item Description"
//                   rows={4}
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={handleAddSubsection}>Add Item</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
      
//       {section.subsections.length === 0 ? (
//         <div className="text-center py-12 border rounded-lg bg-gray-50">
//           <p className="text-gray-500">No items yet. Click "Add Item" to create your first item.</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {section.subsections.map((subsection) => (
//             <Card key={subsection.id}>
//               <CardContent className="pt-6">
//                 <div className="flex justify-between items-start gap-4">
//                   <div className="flex-1">
//                     <h3 className="text-lg font-medium mb-2">{subsection.title}</h3>
//                     <p className="text-gray-600 whitespace-pre-line">{subsection.content}</p>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => openEditSubsection(subsection)}
//                       className="h-8 w-8 p-0"
//                     >
//                       <Edit size={16} />
//                     </Button>
//                     <AlertDialog>
//                       <AlertDialogTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
//                         >
//                           <Trash2 size={16} />
//                         </Button>
//                       </AlertDialogTrigger>
//                       <AlertDialogContent>
//                         <AlertDialogHeader>
//                           <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                           <AlertDialogDescription>
//                             This will permanently delete this item.
//                           </AlertDialogDescription>
//                         </AlertDialogHeader>
//                         <AlertDialogFooter>
//                           <AlertDialogCancel>Cancel</AlertDialogCancel>
//                           <AlertDialogAction
//                             onClick={() => handleRemoveSubsection(subsection.id)}
//                           >
//                             Delete
//                           </AlertDialogAction>
//                         </AlertDialogFooter>
//                       </AlertDialogContent>
//                     </AlertDialog>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
      
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Item</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="edit-title">
//                 Title
//               </label>
//               <Input
//                 id="edit-title"
//                 value={editTitle}
//                 onChange={e => setEditTitle(e.target.value)}
//                 placeholder="Item Title"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="edit-content">
//                 Content
//               </label>
//               <Textarea
//                 id="edit-content"
//                 value={editContent}
//                 onChange={e => setEditContent(e.target.value)}
//                 placeholder="Item Description"
//                 rows={4}
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleUpdateSubsection}>Save Changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={isStyleDialogOpen} onOpenChange={setIsStyleDialogOpen}>
//         <DialogContent className="sm:max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Background Options</DialogTitle>
//             <DialogDescription>
//               Choose a background for this section
//             </DialogDescription>
//           </DialogHeader>
//           <div className="py-4">
//             <BackgroundSelector 
//               value={section.backgroundUrl || ''} 
//               onChange={handleBackgroundChange} 
//             />
//             <div className="mt-6 pt-6 border-t">
//               <h3 className="text-lg font-medium mb-4">Upload Custom Background</h3>
//               <div className="flex items-center gap-4">
//                 <div className="flex-1">
//                   <label htmlFor="background-upload" className="cursor-pointer flex items-center justify-center w-full h-24 border-2 border-dashed border-muted-foreground/30 rounded-lg hover:border-primary/50 transition-colors">
//                     <div className="flex flex-col items-center space-y-2">
//                       <UploadIcon className="h-6 w-6 text-muted-foreground" />
//                       <span className="text-sm text-muted-foreground">
//                         {isUploading ? 'Uploading...' : 'Upload an image'}
//                       </span>
//                     </div>
//                   </label>
//                   <input
//                     id="background-upload"
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleImageUploadChange}
//                     disabled={isUploading}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsStyleDialogOpen(false)}>
//               Close
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default SectionEditor;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfile } from '@/contexts/ProfileContext';
import { useToast } from '@/components/ui/use-toast';
import { Section, SubSection } from '@/types';
import axios from 'axios';

interface SectionEditorProps {}

const SectionEditor: React.FC<SectionEditorProps> = () => {
  const { sectionId, subsectionId } = useParams<{ sectionId: string; subsectionId?: string }>();
  const navigate = useNavigate();
  const { profile, updateSection, updateSubsection } = useProfile();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile || !sectionId) return;

    const section = profile.sections.find(s => s.id === Number(sectionId));
    if (!section) {
      toast({
        title: 'Error',
        description: 'Section not found',
        variant: 'destructive',
      });
      navigate('/dashboard');
      return;
    }

    if (subsectionId) {
      const subsection = section.subsections?.find(sub => sub.id === Number(subsectionId));
      if (!subsection) {
        toast({
          title: 'Error',
          description: 'Subsection not found',
          variant: 'destructive',
        });
        navigate(`/section/${sectionId}`);
        return;
      }
      setTitle(subsection.title);
      setContent(subsection.content);
    } else {
      setTitle(section.title);
      setContent(section.subsections[0]?.content || '');
    }
  }, [profile, sectionId, subsectionId, toast, navigate]);

const handleSave = async () => {
  if (!sectionId) {
    setError('Invalid section ID');
    return;
  }

  if (!content.trim()) {
    setError('Content is required');
    return;
  }

  setIsSaving(true);
  setError(null);
  try {
    const numSectionId = Number(sectionId);

    if (subsectionId) {
      const numSubsectionId = Number(subsectionId);
      const subsectionData: Partial<SubSection> = {
        id: numSubsectionId,
        content: content.trim()
      };
      await updateSubsection(numSectionId, numSubsectionId, subsectionData);
    } else {
      const sectionData: Partial<Section> = {
        subsections: [{
          id: null,
          title: 'Main Content',
          content: content.trim()
        }]
      };
      await updateSection(numSectionId, sectionData);
    }
    
    toast({
      title: 'Success',
      description: 'Changes saved successfully!',
    });
    navigate('/dashboard');
  } catch (error) {
    console.error('Error saving:', error);
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (axios.isAxiosError(error) && error.response) {
      errorMessage = `Server error: ${error.response.status} - ${error.response.data.message || error.message}`;
    }
    setError(errorMessage);
    toast({
      title: 'Error',
      description: `Failed to update: ${errorMessage}`,
      variant: 'destructive',
    });
    if (errorMessage.includes('Access token not found') || errorMessage.includes('401')) {
      toast({
        title: 'Authentication Error',
        description: 'Your session may have expired. Please log in again.',
        variant: 'destructive',
      });
      navigate('/login');
    }
  } finally {
    setIsSaving(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {subsectionId ? 'Edit Subsection' : 'Edit Section'}
      </h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Section Type
          </label>
          <input
            id="title"
            type="text"
            value={title}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="content" className="block mb-1 font-medium">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={8}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(`/section/${sectionId}`)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
        {error && (
          <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default SectionEditor;
