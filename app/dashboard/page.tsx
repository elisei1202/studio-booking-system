'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [subscription, setSubscription] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [slots, setSlots] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user and subscription data
    // This is a placeholder - implement actual auth logic
    setLoading(false)
  }, [])

  const loadSlots = async (date: string) => {
    // Fetch available slots for selected date
    // Placeholder implementation
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Se încarcă...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Studio Booking
            </Link>
            <div className="space-x-4">
              <Link href="/abonamente" className="text-gray-600 hover:text-primary-600">
                Abonamente
              </Link>
              <Link href="/regulament" className="text-gray-600 hover:text-primary-600">
                Regulament
              </Link>
              <button className="text-gray-600 hover:text-primary-600">
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Subscription Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Abonamentul Meu</h2>
          {subscription ? (
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-600">Plan</p>
                <p className="text-xl font-semibold">{subscription.plan.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Credite Rămase</p>
                <p className="text-xl font-semibold text-primary-600">
                  {(subscription.remainingCreditUnits / 100).toFixed(2)} credite
                </p>
              </div>
              <div>
                <p className="text-gray-600">Valabil până la</p>
                <p className="text-xl font-semibold">
                  {new Date(subscription.endDate).toLocaleDateString('ro-RO')}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Nu ai un abonament activ</p>
              <Link
                href="/abonamente"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 inline-block"
              >
                Cumpără Abonament
              </Link>
            </div>
          )}
        </div>

        {/* Booking Section */}
        {subscription && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Rezervă Slot</h2>
            
            {/* Date Picker */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selectează Data
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value)
                  loadSlots(e.target.value)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Slots Grid */}
            {selectedDate && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sloturi Disponibile</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {slots.map((slot) => (
                    <button
                      key={slot.id}
                      disabled={!slot.available}
                      className={`p-4 rounded-lg border-2 text-left ${
                        slot.available
                          ? 'border-primary-300 hover:border-primary-500 hover:bg-primary-50'
                          : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                      }`}
                    >
                      <div className="font-semibold">{slot.label}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {slot.available ? 'Disponibil' : 'Rezervat'}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Night Booking */}
                <div className="mt-6">
                  <button className="w-full p-6 rounded-lg border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50 text-left">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-lg">Rezervare Noapte</div>
                        <div className="text-sm text-gray-600 mt-1">22:00 - 06:00</div>
                      </div>
                      <div className="text-purple-600 font-bold">2.5 credite</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reservations History */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Rezervările Mele</h2>
          <div className="text-gray-600">
            Nu ai rezervări încă.
          </div>
        </div>
      </div>
    </div>
  )
}
