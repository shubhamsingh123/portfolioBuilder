import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProfileProvider } from "@/contexts/ProfileContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProfileEditor from "./pages/ProfileEditor";
import ProfileViewer from "./pages/ProfileViewer";
import SectionEditorPage from "./pages/SectionEditorPage";
import HRDashboard from "./pages/hr_dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// For demonstration purposes, you can temporarily disable authentication
const DISABLE_AUTH = false;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          DISABLE_AUTH ? <Dashboard /> : <ProtectedRoute><Dashboard /></ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          DISABLE_AUTH ? <ProfileEditor /> : <ProtectedRoute><ProfileEditor /></ProtectedRoute>
        }
      />
      <Route
        path="/view"
        element={
          DISABLE_AUTH ? <ProfileViewer /> : <ProtectedRoute><ProfileViewer /></ProtectedRoute>
        }
      />
      <Route
        path="/hr_dashboard"
        element={
          DISABLE_AUTH ? <HRDashboard /> : <ProtectedRoute><HRDashboard /></ProtectedRoute>
        }
      />
      {/* <Route
        path="/section/:id"
        element={
          DISABLE_AUTH ? <SectionEditorPage /> : <ProtectedRoute><SectionEditorPage /></ProtectedRoute>
        }
      /> */}
      <Route
  path="/section/:sectionId"
  element={
    DISABLE_AUTH ? <SectionEditorPage /> : <ProtectedRoute><SectionEditorPage /></ProtectedRoute>
  }
/>


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <BrowserRouter> {/* ✅ Router moved to top level */}
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <ProfileProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </ProfileProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
