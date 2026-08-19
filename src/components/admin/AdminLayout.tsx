/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { getAccessToken, clearAccessToken, 
  getCurrentUserRole } from '@/lib/api';

function requireAuth() {
  if (typeof window === 'undefined') return false;
  return Boolean(getAccessToken() || window.localStorage.getItem('visionaize_access_token'));
}

export const AdminLayout: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!requireAuth()) {
      window.location.href = '/admin/login';
      return;
    }
    // const role = getCurrentUserRole();
    // if (role === 'partner') {
    //   window.location.href = '/partner-portal';
    //   return;
    // }
    setAuthorized(true);
  }, []);

  const role = getCurrentUserRole();
  const isAdmin = role === 'admin';
  const canEdit = role === 'admin' || role === 'editor';

  if (!authorized) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-8xl p-6">
        <div className="flex gap-6">
          <nav className="w-72 bg-white/80 backdrop-blur border border-gray-200 rounded-xl p-4 shadow-lg h-[calc(100vh-120px)] sticky top-20">
            <div className="flex items-center gap-3 mb-4">
              <i className="fa fa-chart text-black-700" />
              <span className="text-lg font-semibold text-gray-700">Admin</span>
            </div>

            <ul className="space-y-2">
              {[
                { to: '/admin/enquiries', label: 'Enquiries', visible: true },
                { to: '/admin/analytics', label: 'Analytics', visible: true },
                // { to: '/admin/partner-documents', label: 'Partner Docs', visible: isAdmin },
                // { to: '/admin/field-mapping', label: 'Field Mapping', visible: canEdit },
                // { to: '/admin/manage-columns', label: 'Manage Columns', visible: canEdit },
                { to: '/admin/users', label: 'Users', visible: isAdmin },
              ].filter((item) => item.visible).map((item) => {
                const active = typeof window !== 'undefined' && window.location.pathname === item.to;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm cursor-pointer ${
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
              <div className="mb-2">Signed in as <strong className="text-gray-700">{role || 'guest'}</strong></div>
              <button onClick={() => { clearAccessToken(); window.location.href = '/admin/login'; }} className="w-full px-3 py-2 rounded bg-white border text-gray-700 hover:bg-gray-50 cursor-pointer">Sign out</button>
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