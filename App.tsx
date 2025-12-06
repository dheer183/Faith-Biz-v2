import React, { useState } from 'react';
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard, PlusCircle, ShoppingBag } from 'lucide-react';
import { MOCK_LISTINGS, ADMIN_USER, MOCK_OWNER } from './constants';
import { BusinessListing, UserRole } from './types';
import Landing from './views/Landing';
import Marketplace from './views/Marketplace';
import ListingForm from './views/ListingForm';
import AdminDashboard from './views/AdminDashboard';
import Button from './components/Button';

// Simple view state management for demo purposes
type ViewState = 'landing' | 'marketplace' | 'create-listing' | 'admin' | 'profile';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [currentUser, setCurrentUser] = useState<any>(null); // Simplified user state
  const [listings, setListings] = useState<BusinessListing[]>(MOCK_LISTINGS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Actions
  const handleLogin = (role: UserRole) => {
    setCurrentUser(role === UserRole.ADMIN ? ADMIN_USER : MOCK_OWNER);
    setCurrentView(role === UserRole.ADMIN ? 'admin' : 'marketplace');
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
    setIsMobileMenuOpen(false);
  };

  const handleCreateListing = (data: any) => {
    // Simulate API call
    const newListing: BusinessListing = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      category: data.category,
      description: data.description,
      phone: data.phone,
      address: data.address,
      imageUrl: "https://picsum.photos/400/300", // Placeholder
      subscriptionTier: data.selectedPlan,
      status: 'pending',
      ownerId: currentUser?.id,
      createdAt: new Date()
    };
    
    setListings([newListing, ...listings]);
    setCurrentView('marketplace');
    // In a real app, we'd show a success toast here
    alert("Listing submitted successfully! Pending admin approval.");
  };

  const handleApproveListing = (id: string) => {
    setListings(listings.map(l => l.id === id ? { ...l, status: 'active' } : l));
  };

  const handleRejectListing = (id: string) => {
    setListings(listings.map(l => l.id === id ? { ...l, status: 'rejected' } : l));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentView('landing')}>
              <img 
                src="/icon.png" 
                alt="FaithBiz Logo" 
                className="h-10 w-auto mr-3 object-contain"
              />
              <span className="text-xl font-bold text-gray-900 tracking-tight">FaithBiz</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => setCurrentView('marketplace')} className={`text-gray-600 hover:text-red-600 font-medium ${currentView === 'marketplace' ? 'text-red-600' : ''}`}>Marketplace</button>
              
              {currentUser ? (
                <>
                  {currentUser.role === UserRole.ADMIN && (
                     <button onClick={() => setCurrentView('admin')} className={`text-gray-600 hover:text-red-600 font-medium ${currentView === 'admin' ? 'text-red-600' : ''}`}>Admin</button>
                  )}
                  {currentUser.role === UserRole.BUSINESS_OWNER && (
                    <Button size="sm" onClick={() => setCurrentView('create-listing')}>
                      <PlusCircle className="w-4 h-4 mr-2" /> List Business
                    </Button>
                  )}
                  <div className="h-6 w-px bg-gray-300 mx-2"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => handleLogin(UserRole.BUSINESS_OWNER)}>Login</Button>
                  <Button onClick={() => handleLogin(UserRole.BUSINESS_OWNER)}>List Business</Button>
                  {/* Hidden Admin Login Trigger for Demo */}
                  <span onClick={() => handleLogin(UserRole.ADMIN)} className="text-xs text-transparent hover:text-gray-300 cursor-pointer ml-2">.</span>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-lg absolute w-full z-50">
            <button onClick={() => { setCurrentView('marketplace'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium text-gray-700 py-2">Marketplace</button>
            {currentUser ? (
               <>
                 {currentUser.role === UserRole.ADMIN && (
                   <button onClick={() => { setCurrentView('admin'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium text-gray-700 py-2">Admin Dashboard</button>
                 )}
                 {currentUser.role === UserRole.BUSINESS_OWNER && (
                   <button onClick={() => { setCurrentView('create-listing'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium text-red-600 py-2">Create Listing</button>
                 )}
                 <button onClick={handleLogout} className="block w-full text-left font-medium text-gray-500 py-2 border-t mt-2">Sign Out</button>
               </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Button className="w-full justify-center" onClick={() => handleLogin(UserRole.BUSINESS_OWNER)}>Business Login</Button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {currentView === 'landing' && (
          <Landing 
            onGetStarted={() => {
              if(!currentUser) handleLogin(UserRole.BUSINESS_OWNER);
              setCurrentView('create-listing');
            }} 
            onBrowse={() => setCurrentView('marketplace')} 
          />
        )}
        
        {currentView === 'marketplace' && (
          <Marketplace listings={listings} />
        )}

        {currentView === 'create-listing' && (
          <ListingForm 
            onComplete={handleCreateListing} 
            onCancel={() => setCurrentView('marketplace')} 
          />
        )}

        {currentView === 'admin' && currentUser?.role === UserRole.ADMIN && (
          <AdminDashboard 
            listings={listings} 
            onApprove={handleApproveListing} 
            onReject={handleRejectListing} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
             <span className="text-2xl font-bold tracking-tight">FaithBiz</span>
             <p className="text-gray-400 text-sm mt-1">Connecting Kingdom Businesses.</p>
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;