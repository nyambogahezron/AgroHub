
import { Link } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="grow flex items-center justify-center bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <AlertCircle size={64} className="text-agri-green mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
          <Button asChild size="lg" className="btn-primary inline-flex items-center">
            <Link to="/">
              <Home className="mr-2" size={20} />
              Return to Home
            </Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
