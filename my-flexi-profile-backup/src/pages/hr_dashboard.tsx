import React from 'react';
// import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

import { Navigate, useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  MapPin,
  Calendar,
  Plus,
  CheckCircle,
  Clock,
  Calendar as CalendarIcon,
  Box,
  Pencil,
  Trash2
} from 'lucide-react';

interface Job {
  title: string;
  department: string;
  location: string;
  date: string;
  skills: string[];
  status: 'active' | 'closed' | 'interview';
}

const mockJobs: Job[] = [
  {
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "New York",
    date: "June 1, 2025",
    skills: ["Java", "Spring Boot", "Microservices", "AWS"],
    status: "active"
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    date: "June 3, 2025",
    skills: ["Agile Methodologies", "User Story Mapping", "Data Analysis", "Stakeholder Management"],
    status: "active"
  },
  {
    title: "UX Designer",
    department: "Design",
    location: "San Francisco",
    date: "May 28, 2025",
    skills: ["Figma", "User Research", "Prototyping"],
    status: "interview"
  },
  {
    title: "Marketing Specialist",
    department: "Marketing",
    location: "London",
    date: "May 25, 2025",
    skills: ["SEO", "Content Marketing", "Social Media Management", "Google Analytics"],
    status: "closed"
  }
];

const StatCard = ({ icon: Icon, title, value, className = "" }: { icon: any, title: string, value: string | number, className?: string }) => (
  <Card className={`${className} relative overflow-hidden bg-white shadow-md border-0`}>
    <CardContent className="pt-6">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-black">{title}</p>
          <h3 className="text-2xl font-bold text-black">{value}</h3>
        </div>
      </div>
    </CardContent>
  </Card>
);

const JobCard = ({ job }: { job: Job }) => (
  <Card className="mb-4 bg-white shadow-md border-0 relative">
    <CardContent className="pt-6 pb-16">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-black border-b pb-2">{job.title}</h3>
        <Badge 
          className={`capitalize border-0 ${
            job.status === 'active' ? 'bg-green-200 text-green-800' :
            job.status === 'interview' ? 'bg-yellow-200 text-yellow-800' :
            job.status === 'closed' ? 'bg-gray-200 text-gray-800' :
            'bg-white text-black'
          }`}
        >
          {job.status}
        </Badge>
      </div>
      <div className="grid gap-2 text-sm text-black">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          <span>{job.department}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{job.date}</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.map((skill, index) => (
            <Badge key={index} className="bg-blue-100 text-blue-800 border-0">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </CardContent>
    <div className="absolute bottom-0 right-0 left-0 flex justify-end gap-2 p-4 border-t border-gray-200">
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Pencil className="h-4 w-4 text-blue-600" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Trash2 className="h-4 w-4 text-red-600" />
      </button>
    </div>
  </Card>
);

const HRDashboard = () => {

  
const navigate = useNavigate();

  const handlePostNewJob = () => {
    navigate('/post-new-job');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 right-0 bg-white z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl text-black font-bold">HR Dashboard</h1>
         <Button className="bg-blue-600 hover:bg-blue-700 border-0" onClick={handlePostNewJob}>
  <Plus className="h-4 w-4 mr-2" />
  Post New Job
</Button>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 bg-gray-100 text-black mt-16">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Box}
            title="Total Openings"
            value="24"
          />
          <StatCard
            icon={CheckCircle}
            title="Closed"
            value="8"
          />
          <StatCard
            icon={Clock}
            title="In Progress"
            value="12"
          />
          <StatCard
            icon={CalendarIcon}
            title="Scheduled Interviews"
            value="15"
          />
        </div>

        {/* Recent Openings */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Recent Openings</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input placeholder="Search jobs..." className="flex-grow bg-white shadow-sm border-0" />
            <Select>
              <SelectTrigger className="w-[180px] bg-white shadow-sm border-0">
                <SelectValue placeholder="Filter by Skills" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="agile">Agile</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px] bg-white shadow-sm border-0">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fulltime">Full Time</SelectItem>
                <SelectItem value="parttime">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px] bg-white shadow-sm border-0">
                <SelectValue placeholder="Filter by Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newyork">New York</SelectItem>
                <SelectItem value="sanfrancisco">San Francisco</SelectItem>
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
