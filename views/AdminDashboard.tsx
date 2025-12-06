import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BusinessListing, SubscriptionTier } from '../types';
import Button from '../components/Button';
import { CheckCircle, XCircle, TrendingUp, Users, DollarSign } from 'lucide-react';

interface AdminDashboardProps {
  listings: BusinessListing[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ listings, onApprove, onReject }) => {
  const pendingListings = listings.filter(l => l.status === 'pending');
  
  // Calculate mock stats
  const totalRevenue = listings.reduce((acc, curr) => {
    const price = curr.subscriptionTier === SubscriptionTier.PLATINUM ? 5000 :
                  curr.subscriptionTier === SubscriptionTier.GOLD ? 1000 :
                  curr.subscriptionTier === SubscriptionTier.SILVER ? 500 : 300;
    return acc + price;
  }, 0);

  const chartData = [
    { name: 'Regular', count: listings.filter(l => l.subscriptionTier === SubscriptionTier.REGULAR).length },
    { name: 'Silver', count: listings.filter(l => l.subscriptionTier === SubscriptionTier.SILVER).length },
    { name: 'Gold', count: listings.filter(l => l.subscriptionTier === SubscriptionTier.GOLD).length },
    { name: 'Platinum', count: listings.filter(l => l.subscriptionTier === SubscriptionTier.PLATINUM).length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-3 bg-red-100 rounded-full mr-4">
            <DollarSign className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Revenue (Year)</p>
            <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-3 bg-blue-100 rounded-full mr-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Businesses</p>
            <p className="text-2xl font-bold text-gray-900">{listings.filter(l => l.status === 'active').length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-3 bg-amber-100 rounded-full mr-4">
            <TrendingUp className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Approvals</p>
            <p className="text-2xl font-bold text-gray-900">{pendingListings.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Approvals Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Pending Approvals</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {pendingListings.length === 0 ? (
               <div className="p-6 text-center text-gray-500">No pending listings.</div>
            ) : (
              pendingListings.map(listing => (
                <div key={listing.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{listing.name}</h4>
                    <p className="text-sm text-gray-500">{listing.category} • {listing.subscriptionTier}</p>
                    <p className="text-xs text-gray-400 mt-1">Submitted: {listing.createdAt.toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => onReject(listing.id)} className="text-red-600 hover:bg-red-50 border-red-100">
                      <XCircle className="h-4 w-4 mr-1" /> Reject
                    </Button>
                    <Button size="sm" onClick={() => onApprove(listing.id)} className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="h-4 w-4 mr-1" /> Approve
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-6">Subscriptions by Tier</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: '#fef2f2'}}
                />
                <Bar dataKey="count" fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;