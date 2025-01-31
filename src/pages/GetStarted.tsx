import React from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card';
import '../app.css';

const GetStarted: React.FC = () => {
  return (
    <div className="get-started-container flex flex-col items-center w-full min-h-screen px-4 sm:px-8 lg:px-16">
 
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-20 sm:mt-32">
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 gray-1 font-figtree">Welcome to Eventurelly</h2>
        <p className="text-xl font-normal gray-2 font-figtree">Choose your account type to get started</p>
      </div>

      {/* Card Section */}
      <div className="flex flex-wrap justify-center gap-6 mt-10">
  <Card
    image="/images/p1.jpeg"
    title="Corporate Admin"
    description="Manage your company's event operations effortlessly."
    buttonText="Next"
    className="bg-pink rounded-lg" 
  />
  
    <Card
    image="/images/p2.jpeg"
    title="Corporate Member"
    description="Join your company's event team and collaborate seamlessly."
    buttonText="Next"
    className="bg-pink rounded-3xl" 
  />

</div>


      {/* Join Section */}
      <div className="flex flex-col items-center text-center mt-12">
        <h2 className="text-lg sm:text-2xl font-normal dark font-figtree mb-4">Join our team as an Event Architect</h2>
        <Button label="Join Now" 
         className="bg-white rounded-lg border border-color hover-effect mb-20"
        />
      </div>
    </div>
  );
};

export default GetStarted;
