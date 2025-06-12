import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

const Description: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState(['JavaScript', 'Java', 'React']);
  const [description, setDescription] = useState('');

  const handleBack = () => {
    navigate('/post-new-job');
  };

  const handlePostJob = () => {
    // Here you would typically handle the job posting logic
    // For now, we'll just redirect to the HR Dashboard
    navigate('/hr_dashboard');
  };

  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center gap-2">
          <img src="/favicon.ico" alt="HR Dashboard" className="w-8 h-8" />
          <h1 className="text-xl font-semibold">HR Dashboard</h1>
        </div>
        <Button 
          variant="outline"
          onClick={handleBack}
          className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
        >
          <span>←</span> Back
        </Button>
      </div>

      <div className="container mx-auto p-8 mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Post New Job</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto border-0">
          <h3 className="text-xl font-semibold mb-6">Skills & Description</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Required Skills</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedSkills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    className="bg-blue-100 text-blue-800 border-0 flex items-center gap-1"
                  >
                    {skill}
                    <button 
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-black hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <Input 
                type="text"
                placeholder="Click to see popular skills"
                className="w-full bg-white border-gray-200 shadow-sm"
              />
              <p className="text-sm text-gray-500 mt-1">Press Enter to add a skill</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Job Description</label>
              <Textarea 
                placeholder="Enter job description"
                className="w-full bg-white border-gray-200 shadow-sm min-h-[200px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <Button 
                onClick={() => {}}
                className="bg-blue-600 text-white hover:bg-blue-700 w-full mb-4"
              >
                Get AI Suggestions
              </Button>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    AI
                  </div>
                  <h4 className="font-semibold">AI Suggestions</h4>
                </div>
                <p className="text-gray-700">We are seeking a talented professional with expertise in JavaScript, Java, React.</p>
                <p className="text-gray-700">The ideal candidate will have strong skills in JavaScript, Java, React and a passion for innovation.</p>
                <p className="text-gray-700">Join our team and utilize your knowledge of JavaScript, Java, React to drive cutting-edge projects.</p>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button 
                variant="outline"
                onClick={handleBack}
                className="px-8 bg-gray-600 text-white hover:bg-gray-700"
              >
                Back
              </Button>
              <Button 
                onClick={handlePostJob}
                className="px-8 bg-blue-600 text-white hover:bg-blue-700"
              >
                Post Job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
