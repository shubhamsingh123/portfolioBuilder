import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Box
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
  <Card className={`${className} relative overflow-hidden`}>
    <CardContent className="pt-6">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </CardContent>
  </Card>
);

const JobCard = ({ job }: { job: Job }) => (
  <Card className="mb-4">
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{job.title}</h3>
        <Badge 
          variant={job.status === 'closed' ? 'secondary' : job.status === 'interview' ? 'outline' : 'default'}
          className="capitalize"
        >
          {job.status}
        </Badge>
      </div>
      <div className="grid gap-2 text-sm text-muted-foreground">
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
      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.map((skill, index) => (
          <Badge key={index} variant="outline" className="bg-primary/5">
            {skill}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

const HRDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">HR Dashboard</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>

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
            <Input placeholder="Search jobs..." className="flex-grow" />
            <Select>
              <SelectTrigger className="w-[180px]">
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
              <SelectTrigger className="w-[180px]">
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
              <SelectTrigger className="w-[180px]">
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
    </Layout>
  );
};

export default HRDashboard;
