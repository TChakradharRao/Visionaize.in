/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';

function requireAuth() {
  return localStorage.getItem('adminAuth') === 'true';
}

export const AdminLayout: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => {
  useEffect(() => {
    if (!requireAuth()) {
      window.location.href = '/admin/login';
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-8xl p-6">
        <div className="flex gap-6">
          <nav className="w-72 bg-white/80 backdrop-blur border border-gray-200 rounded-xl p-4 shadow-lg h-[calc(100vh-120px)] sticky top-20">
            <div className="flex items-center gap-3 mb-4">
              <i className="fa fa-chart text-black-700" />
              <span className="text-lg font-semibold text-gray-700">Enquiries</span>
            </div>

            <ul className="space-y-2">
              {[
                { to: '/admin/enquiries', label: 'Enquiries' },
                { to: '/admin/field-mapping', label: 'Field Mapping' },
                { to: '/admin/manage-columns', label: 'Manage Columns' },
                { to: '/admin/analytics', label: 'Analytics' },
              ].map((item) => {
                const active = window.location.pathname === item.to;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                        active ? 'bg-gradient-to-r from-[#92C122] to-[#0A78B9] text-white shadow' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: active ? 'white' : 'transparent' }} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 border-t pt-4 text-sm text-gray-500">
              <div className="mb-2">Signed in as <strong className="text-gray-700">admin</strong></div>
              <button onClick={() => { localStorage.removeItem('adminAuth'); window.location.href = '/admin/login'; }} className="w-full px-3 py-2 rounded bg-white border text-gray-700 hover:bg-gray-50">Sign out</button>
            </div>
          </nav>

          <div className="flex-1">
            {title && <div className="flex items-center justify-between mb-4"><h1 className="text-2xl font-semibold text-gray-800">{title}</h1></div>}
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
