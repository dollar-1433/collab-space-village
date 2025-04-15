
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { BookOpen, CalendarDays, Lightbulb, MessageCircle, PenTool, User } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Connect, Share & <span className="text-edu-blue">Learn</span> Together
              </h1>
              <p className="text-gray-500 md:text-xl">
                A collaborative platform where students and teachers can share ideas, projects, notes, and organize study groups.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/auth?type=signup">
                  <Button className="bg-edu-blue hover:bg-edu-blue/90 text-lg px-8 py-6">
                    Get Started
                  </Button>
                </Link>
                <Link to="/auth?type=login">
                  <Button variant="outline" className="text-lg px-8 py-6">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:pl-10">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
                  alt="Students collaborating" 
                  className="aspect-video object-cover w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Everything You Need for Academic Success</h2>
            <p className="text-gray-500 mt-4 md:text-lg md:w-3/4 mx-auto">
              A comprehensive platform designed to enhance collaboration and knowledge sharing in academic environments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-edu-blue/10 rounded-lg flex items-center justify-center mb-4">
                <PenTool className="h-6 w-6 text-edu-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Notes & Resources</h3>
              <p className="text-gray-500">
                Create, share, and access educational content including lecture notes, study guides, and course materials.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-edu-green/10 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-edu-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaborate on Projects</h3>
              <p className="text-gray-500">
                Find project partners, share ideas, and work together on academic and research projects.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-edu-orange/10 rounded-lg flex items-center justify-center mb-4">
                <CalendarDays className="h-6 w-6 text-edu-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Stay Updated on Events</h3>
              <p className="text-gray-500">
                Never miss important academic events, seminars, workshops, and campus activities.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-edu-blue/10 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-edu-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Study Groups & Discussions</h3>
              <p className="text-gray-500">
                Form study groups, engage in academic discussions, and prepare for exams together.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-edu-green/10 rounded-lg flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-edu-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customizable Profiles</h3>
              <p className="text-gray-500">
                Create your academic profile, showcase your skills, projects, and academic achievements.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-edu-orange/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-edu-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Organized Content</h3>
              <p className="text-gray-500">
                Easily search, filter, and organize educational content by subjects, courses, and topics.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials/CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Academic Journey?</h2>
            <p className="text-gray-500 mb-8 md:text-lg md:w-2/3 mx-auto">
              Join thousands of students and educators already using our platform to connect, collaborate, and succeed together.
            </p>
            <Link to="/auth?type=signup">
              <Button className="bg-edu-blue hover:bg-edu-blue/90 text-lg px-8 py-6">
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-edu-blue text-white grid place-items-center font-bold">E</div>
              <span className="font-bold text-xl">EduCollab</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-500">© 2023 EduCollab. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
