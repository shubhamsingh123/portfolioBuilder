import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const PostNewJob: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/hr_dashboard');
  };

  const handleNext = () => {
    navigate('/description');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          <img src="/favicon.ico" alt="HR Dashboard" className="w-8 h-8" />
          <h1 className="text-xl font-semibold">HR Dashboard</h1>
        </div>
        <Button 
          variant="outline"
          onClick={handleBack}
          className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
        >
          <span>←</span> Back to Dashboard
        </Button>
      </div>

      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8">Post New Job</h2>
        
        <div className="rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-6">Basic Information</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Job Title</label>
              <Input 
                type="text"
                placeholder="Software Engineer"
                className="w-full bg-white border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Department</label>
              <Select>
                <SelectTrigger className="w-full bg-white border-black">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">Information Technology</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input 
                type="text"
                placeholder="Noida"
                className="w-full bg-white border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Job Type</label>
              <Select>
                <SelectTrigger className="w-full bg-white border-black">
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end mt-8">
              <Button onClick={handleNext} className="px-8">
                Next <span>→</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostNewJob;
