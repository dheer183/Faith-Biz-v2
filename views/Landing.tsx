import React from 'react';
import Button from '../components/Button';
import { ShieldCheck, Heart, Globe, ArrowRight } from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
  onBrowse: () => void;
}

const Landing: React.FC<LandingProps> = ({ onGetStarted, onBrowse }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <div className="bg-red-600 text-white pt-24 pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8">
             <div className="bg-white p-4 rounded-3xl shadow-xl">
               <img src="/icon.png" alt="FaithBiz Logo" className="h-24 w-auto" />
             </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Connecting Faith & Business
          </h1>
          <p className="text-xl md:text-2xl text-red-100 mb-10 max-w-3xl mx-auto">
            The premier marketplace for the church community. List your business, find trusted services, and support Kingdom growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onBrowse}
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-50 transition-transform hover:-translate-y-1"
            >
              Browse Marketplace
            </button>
            <button 
              onClick={onGetStarted}
              className="bg-red-800 text-white border border-red-700 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-red-900 transition-transform hover:-translate-y-1 flex items-center justify-center"
            >
              List Your Business <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Curve Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L1440 120L1440 0C1440 0 1082.5 97.5 720 97.5C357.5 97.5 0 0 0 0L0 120Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Trusted & Verified</h3>
            <p className="text-gray-600">Every business is vetted to ensure alignment with community values and service standards.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Multi-Platform Reach</h3>
            <p className="text-gray-600">We promote your services across Facebook, Instagram, TikTok, and our dedicated app.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Community First</h3>
            <p className="text-gray-600">A portion of subscription fees goes directly back into supporting local church initiatives.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;