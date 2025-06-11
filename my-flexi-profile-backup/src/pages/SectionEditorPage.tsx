
// import React from 'react';
// import { useParams, Navigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { useProfile } from '@/contexts/ProfileContext';
// import Layout from '@/components/Layout';
// import SectionEditor from '@/components/SectionEditor';
// import Background3D from '@/components/Background3D';

// const SectionEditorPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const { user } = useAuth();
//   const { profile } = useProfile();
  
//   if (!user || !profile) {
//     return <Navigate to="/login" />;
//   }
  
//   if (!id) {
//     return <Navigate to="/dashboard" />;
//   }
  
//   return (
//     <Layout>
//       <div className="fixed inset-0 -z-10">
//         <Background3D density="low" />
//       </div>
//       <SectionEditor sectionId={id} />
//     </Layout>
//   );
// };

// export default SectionEditorPage;

import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import Layout from '@/components/Layout';
import SectionEditor from '@/components/SectionEditor';

const SectionEditorPage: React.FC = () => {
  const { sectionId, subsectionId } = useParams<{ sectionId: string; subsectionId: string }>();
  const { user } = useAuth();
  const { profile } = useProfile();

  if (!user || !profile) {
    return <Navigate to="/login" />;
  }

  if (!sectionId) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Layout>
      <div className="container py-8">
        <SectionEditor />
      </div>
    </Layout>
  );
};

export default SectionEditorPage;
