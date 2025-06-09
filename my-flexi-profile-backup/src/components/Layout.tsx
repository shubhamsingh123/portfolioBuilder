
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut, Menu, X } from 'lucide-react';
import { ThemeToggler } from './ThemeToggler';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-background/90 backdrop-blur-md shadow-md border-b border-border/50" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            ProfileBuilder
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {location.pathname === "/view" && (
              <nav className="flex items-center space-x-8">
                <Link to="#about" className="text-foreground hover:text-primary text-sm font-medium transition-colors">About</Link>
                <Link to="#experience" className="text-foreground hover:text-primary text-sm font-medium transition-colors">Experience</Link>
                <Link to="#skills" className="text-foreground hover:text-primary text-sm font-medium transition-colors">Skills</Link>
                <Link to="#projects" className="text-foreground hover:text-primary text-sm font-medium transition-colors">Projects</Link>
                <Link to="#contact" className="text-foreground hover:text-primary text-sm font-medium transition-colors">Contact</Link>
              </nav>
            )}
            
            <div className="flex items-center gap-2">
              <ThemeToggler />
              
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-primary/10">
                      <User size={18} className="mr-2" />
                      {user.name}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={logout}
                    className="border-primary/20 text-primary hover:bg-primary/10"
                  >
                    <LogOut size={16} className="mr-1" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button 
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md"
                  >
                    Get in Touch
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/50 animate-slide-up">
            <div className="container mx-auto py-4">
              {location.pathname === "/view" && (
                <nav className="flex flex-col space-y-4 mb-4">
                  <Link 
                    to="#about" 
                    className="text-foreground hover:text-primary px-4 py-2 rounded hover:bg-primary/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    to="#experience" 
                    className="text-foreground hover:text-primary px-4 py-2 rounded hover:bg-primary/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Experience
                  </Link>
                  <Link 
                    to="#skills" 
                    className="text-foreground hover:text-primary px-4 py-2 rounded hover:bg-primary/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Skills
                  </Link>
                  <Link 
                    to="#projects" 
                    className="text-foreground hover:text-primary px-4 py-2 rounded hover:bg-primary/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Projects
                  </Link>
                  <Link 
                    to="#contact" 
                    className="text-foreground hover:text-primary px-4 py-2 rounded hover:bg-primary/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>
              )}
              
              <div className="flex items-center justify-between mb-4">
                <ThemeToggler />
              </div>
              
              {user ? (
                <div className="flex flex-col gap-2">
                  <Link to="/dashboard" className="w-full">
                    <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/10">
                      <User size={18} className="mr-2" />
                      {user.name}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={logout}
                    className="w-full justify-start border-primary/20 text-primary hover:bg-primary/10"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login" className="block">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md"
                  >
                    Get in Touch
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-grow pt-16">
        {children}
      </main>
      
      <footer className="bg-muted/50 backdrop-blur-md py-6 border-t border-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold text-primary">
                ProfileBuilder
              </div>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <nav className="flex space-x-6">
                <Link to="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
                <Link to="#skills" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </Link>
                <Link to="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
                <Link to="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </nav>
              
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                size="sm"
                variant="outline" 
                className="rounded-full w-10 h-10 p-0 border-primary/20 text-primary hover:bg-primary/10"
                aria-label="Scroll to top"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 15-6-6-6 6"/>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
