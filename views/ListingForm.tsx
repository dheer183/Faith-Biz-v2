import React, { useState } from 'react';
import { BusinessCategory, SubscriptionPlan, SubscriptionTier } from '../types';
import { SUBSCRIPTION_PLANS } from '../constants';
import Button from '../components/Button';
import { Check, Wand2, Upload, DollarSign, ArrowRight, ArrowLeft } from 'lucide-react';
import { generateBusinessDescription } from '../services/geminiService';

interface ListingFormProps {
  onComplete: (data: any) => void;
  onCancel: () => void;
}

const STEPS = ['Details', 'Plan', 'Payment'];

const ListingForm: React.FC<ListingFormProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: BusinessCategory.SERVICES as string,
    description: '',
    phone: '',
    address: '',
    website: '',
    selectedPlan: null as SubscriptionTier | null,
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAiGenerate = async () => {
    if (!formData.name) return;
    setIsGenerating(true);
    const desc = await generateBusinessDescription(formData.name, formData.category, "");
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(c => c + 1);
    else onComplete(formData);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  const isDetailsValid = formData.name && formData.phone && formData.address && formData.description;
  const isPlanValid = !!formData.selectedPlan;
  const isPaymentValid = formData.cardNumber && formData.expiry && formData.cvc;

  const canProceed = () => {
    if (currentStep === 0) return isDetailsValid;
    if (currentStep === 1) return isPlanValid;
    if (currentStep === 2) return isPaymentValid;
    return false;
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
          {STEPS.map((step, index) => (
            <div key={step} className={`flex flex-col items-center bg-gray-50 px-2`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                index <= currentStep ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-500'
              }`}>
                {index + 1}
              </div>
              <span className={`text-xs mt-2 font-medium ${index <= currentStep ? 'text-red-600' : 'text-gray-500'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8">
          
          {/* STEP 1: Details */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Tell us about your business</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Business Name</label>
                  <input name="name" value={formData.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none" placeholder="e.g. Grace Books" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none">
                    {Object.values(BusinessCategory).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="col-span-full space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex justify-between">
                    Description
                    <button onClick={handleAiGenerate} disabled={!formData.name || isGenerating} className="text-red-600 text-xs flex items-center hover:underline disabled:opacity-50">
                      <Wand2 className="w-3 h-3 mr-1" />
                      {isGenerating ? 'Drafting...' : 'Auto-Write with AI'}
                    </button>
                  </label>
                  <textarea name="description" rows={4} value={formData.description} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none" placeholder="Describe your services..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none" placeholder="(555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <input name="address" value={formData.address} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none" placeholder="123 Main St" />
                </div>
                <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload business photos (Demo only)</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Plan Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center">Choose your growth plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <div 
                    key={plan.id}
                    onClick={() => setFormData({...formData, selectedPlan: plan.id})}
                    className={`relative cursor-pointer border-2 rounded-xl p-5 transition-all ${
                      formData.selectedPlan === plan.id 
                        ? 'border-red-600 bg-red-50' 
                        : 'border-gray-200 hover:border-red-200'
                    }`}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        MOST POPULAR
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-bold text-lg ${plan.id === SubscriptionTier.PLATINUM ? 'text-purple-900' : 'text-gray-900'}`}>{plan.name}</h3>
                      <span className="font-bold text-xl">${plan.price}<span className="text-sm font-normal text-gray-500">/yr</span></span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600">
                          <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="text-xs text-gray-500 mt-2 border-t pt-2">
                      Promotes on: {plan.platforms.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {currentStep === 2 && (
             <div className="space-y-6 max-w-md mx-auto">
               <div className="text-center mb-6">
                 <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                   <DollarSign className="h-6 w-6 text-green-600" />
                 </div>
                 <h2 className="text-2xl font-bold text-gray-900">Secure Checkout</h2>
                 <p className="text-gray-600">Total due: <span className="font-bold text-gray-900">${SUBSCRIPTION_PLANS.find(p => p.id === formData.selectedPlan)?.price}.00</span></p>
               </div>

               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                 <div className="space-y-2">
                   <label className="text-xs uppercase font-bold text-gray-500">Card Number</label>
                   <input 
                      name="cardNumber" 
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="0000 0000 0000 0000" 
                      className="w-full bg-white border border-gray-300 rounded p-2.5 font-mono"
                      maxLength={19}
                   />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-gray-500">Expiry</label>
                      <input 
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY" 
                        className="w-full bg-white border border-gray-300 rounded p-2.5 font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-gray-500">CVC</label>
                      <input 
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        placeholder="123" 
                        className="w-full bg-white border border-gray-300 rounded p-2.5 font-mono"
                        maxLength={3}
                      />
                    </div>
                 </div>
               </div>
               
               <p className="text-xs text-center text-gray-400">
                 <span className="inline-block mr-1">🔒</span> 
                 Payments processed securely. This is a demo; do not enter real card details.
               </p>
             </div>
          )}

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between">
            <Button variant="ghost" onClick={currentStep === 0 ? onCancel : handleBack}>
              {currentStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            <Button onClick={handleNext} disabled={!canProceed()}>
              {currentStep === STEPS.length - 1 ? 'Complete Order' : 'Next Step'}
              {currentStep !== STEPS.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingForm;