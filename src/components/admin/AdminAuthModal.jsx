import React, { useState } from 'react';
import { X, Lock, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';
import brandLogo from '../../assets/sheru-baai-logo.jpg';

export default function AdminAuthModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'Sherubai@123') {
      setError(false);
      setErrorMessage('');
      setPassword('');
      onSuccess();
    } else {
      setError(true);
      setErrorMessage('Incorrect Security Passcode. Access Denied.');
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-darkbrown-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className={`relative bg-cream-50 w-full max-w-md rounded-3xl border-2 border-gold-500 shadow-2xl overflow-hidden transition-all ${
          error ? 'animate-bounce' : 'animate-in fade-in zoom-in-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-cream-100 hover:bg-gold-100 border border-gold-300 flex items-center justify-center text-darkbrown-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-burgundy-700 via-burgundy-600 to-burgundy-800 text-cream-100 p-7 text-center relative border-b-2 border-gold-400">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-gold-400 shadow-lg bg-black mb-3">
            <img src={brandLogo} alt="Sheru Baai Logo" className="w-full h-full object-cover" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-[10px] font-serif font-bold uppercase tracking-widest mb-1.5">
            <Sparkles className="w-3 h-3" /> Master Admin Gate
          </div>

          <h3 className="font-serif text-xl font-bold tracking-wide text-white">
            SHERU BAAI ATELIER
          </h3>
          <p className="text-xs text-gold-200 mt-0.5">
            Confidential Shop Owner Portal
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-serif font-bold text-darkbrown-900">
              Enter Admin Security Passcode:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter security passcode..."
                className="w-full pl-4 pr-11 py-3 rounded-xl border border-gold-400 bg-white text-darkbrown-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-500 font-sans shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-darkbrown-500 hover:text-darkbrown-800 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-gold-600" /> : <Eye className="w-5 h-5 text-gold-600" />}
              </button>
            </div>

            {errorMessage && (
              <p className="text-red-600 text-xs font-semibold pt-1 animate-pulse">
                {errorMessage}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-burgundy-500 hover:bg-burgundy-600 active:bg-burgundy-700 text-cream-100 font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-burgundy-glow transition-all flex items-center justify-center gap-2 text-xs tracking-wider uppercase"
          >
            <Lock className="w-4 h-4 text-gold-300" />
            <span>Unlock Admin Panel</span>
          </button>

          <div className="pt-2 text-center text-[11px] text-darkbrown-600 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
            <span>Authorized Sheru Baai Personnel Only</span>
          </div>
        </form>
      </div>
    </div>
  );
}
