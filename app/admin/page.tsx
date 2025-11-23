'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('users')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Studio Booking - Admin
            </Link>
            <div className="space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-primary-600">
                Dashboard User
              </Link>
              <button className="text-gray-600 hover:text-primary-600">
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'users'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Utilizatori
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'subscriptions'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Abonamente
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'reservations'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Rezervări
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'payments'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Plăți USDT
            </button>
          </div>

          <div className="p-6">
            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Gestionare Utilizatori</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Rol</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Acțiuni</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                          Nu există utilizatori
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Subscriptions Tab */}
            {activeTab === 'subscriptions' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Abonamente Active</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Utilizator</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Plan</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Credite</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Valabil până</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                          Nu există abonamente
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Reservations Tab */}
            {activeTab === 'reservations' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Rezervări</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Utilizator</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Data</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Slot</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Penalizare</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Acțiuni</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                          Nu există rezervări
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Aplicare Penalizări</h3>
                  <p className="text-sm text-blue-700 mb-4">
                    Selectează o rezervare din listă și aplică penalizarea corespunzătoare.
                  </p>
                  <div className="flex gap-4">
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">
                      Penalizare -1 credit (10-30 min)
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                      Penalizare -2 credite (&gt;30 min)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Plăți USDT în Așteptare</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Utilizator</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Plan</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Sumă USDT</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Data</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Acțiuni</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                          Nu există plăți în așteptare
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
