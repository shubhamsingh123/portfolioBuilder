
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Briefcase, GraduationCap, Award, Share2, Lock } from 'lucide-react';

const Landing = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Create Your Professional Profile
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            Build a customizable online presence to showcase your skills, experience, and achievements.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                    Log In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Built for professionals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center py-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-800">
                    <User size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Personalized Profile</h3>
                <p className="text-gray-600">
                  Create a customized profile that represents your professional identity.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center py-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-800">
                    <Briefcase size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Showcase Experience</h3>
                <p className="text-gray-600">
                  Add sections for work history, skills, and accomplishments.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center py-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-800">
                    <Share2 size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Easy Sharing</h3>
                <p className="text-gray-600">
                  Share your profile with potential employers or clients with a simple URL.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-2 -left-2 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold text-xl">
                  1
                </div>
                <Card className="overflow-hidden">
                  <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-400">
                    <User size={64} />
                  </div>
                </Card>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Create Your Account</h3>
              <p className="text-gray-600 mb-4">
                Sign up and set up your basic profile information including your name, bio, and profile picture.
              </p>
              {!user && (
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center mb-16">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-2 -left-2 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold text-xl">
                  2
                </div>
                <Card className="overflow-hidden">
                  <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-400">
                    <GraduationCap size={64} />
                  </div>
                </Card>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Add Custom Sections</h3>
              <p className="text-gray-600 mb-4">
                Build your profile by adding sections for your education, work experience, skills, certifications, and more.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-2 -left-2 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold text-xl">
                  3
                </div>
                <Card className="overflow-hidden">
                  <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-400">
                    <Share2 size={64} />
                  </div>
                </Card>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Share Your Profile</h3>
              <p className="text-gray-600 mb-4">
                Choose to make your profile public and share it with others using your unique profile link.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build your professional profile?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join thousands of professionals who are showcasing their skills and experience online.
          </p>
          
          {user ? (
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
                Get Started for Free
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
