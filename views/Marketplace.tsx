import React, { useState, useMemo } from 'react';
import { Search, MapPin, Phone, Filter } from 'lucide-react';
import { BusinessCategory, BusinessListing, SubscriptionTier } from '../types';
import Button from '../components/Button';

interface MarketplaceProps {
  listings: BusinessListing[];
}

const Marketplace: React.FC<MarketplaceProps> = ({ listings }) => {
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredListings = useMemo(() => {
    return listings.filter(l => {
      const matchesCategory = selectedCategory === 'All' || l.category === selectedCategory;
      const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            l.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch && l.status === 'active';
    });
  }, [listings, selectedCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Filters */}
      <div className="mb-8 space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Community Marketplace</h2>
        <p className="text-gray-600">Support local faith-based businesses.</p>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search businesses..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'All' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {Object.values(BusinessCategory).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="relative h-48">
                <img src={listing.imageUrl} alt={listing.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                   <span className="px-2 py-1 bg-white/90 backdrop-blur text-xs font-semibold rounded-md shadow-sm text-gray-800">
                     {listing.category}
                   </span>
                </div>
                {listing.subscriptionTier === SubscriptionTier.PLATINUM && (
                   <div className="absolute top-2 left-2">
                   <span className="px-2 py-1 bg-amber-400 text-xs font-bold rounded-md shadow-sm text-white flex items-center">
                     Featured
                   </span>
                </div>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{listing.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{listing.description}</p>
                
                <div className="space-y-2 mt-auto">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2 text-red-500" />
                    <span className="truncate">{listing.address}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-2 text-red-500" />
                    <span>{listing.phone}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No businesses found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;