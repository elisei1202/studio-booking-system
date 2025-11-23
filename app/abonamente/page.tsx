import Link from 'next/link'

export default function AbonamentePage() {
  const plans = [
    {
      name: 'BASIC',
      price: 600,
      credits: 8,
      features: [
        '8 credite (800 unități)',
        'Rezervări Luni-Joi',
        'Fără rezervări weekend',
        'Fără rezervări noapte',
        'Rezervări cu 7 zile în avans',
        'Valabilitate 30 zile',
      ],
    },
    {
      name: 'STANDARD',
      price: 750,
      credits: 10,
      features: [
        '10 credite (1000 unități)',
        'Rezervări toată săptămâna',
        'Max 2 rezervări weekend/lună',
        'Rezervări noapte permise',
        'Rezervări cu 7 zile în avans',
        'Valabilitate 30 zile',
      ],
      popular: true,
    },
    {
      name: 'PREMIUM',
      price: 900,
      credits: 12,
      features: [
        '12 credite (1200 unități)',
        'Rezervări toată săptămâna',
        'Weekend nelimitat',
        'Rezervări noapte permise',
        'Rezervări cu prioritate (14 zile)',
        'Valabilitate 30 zile',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Studio Booking
            </Link>
            <div className="space-x-4">
              <Link href="/regulament" className="text-gray-600 hover:text-primary-600">
                Regulament
              </Link>
              <Link href="/dashboard" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                Dashboard
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Plans Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4">Alege Abonamentul Potrivit</h2>
        <p className="text-center text-gray-600 mb-12">
          Toate abonamentele sunt valabile 30 zile. Creditele nu se reportează.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-4 ring-primary-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-primary-600 text-white text-center py-2 font-semibold">
                  CEL MAI POPULAR
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price} lei</span>
                  <span className="text-gray-600">/lună</span>
                </div>
                <p className="text-lg text-primary-600 font-semibold mb-6">
                  {plan.credits} credite
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`block text-center py-3 px-6 rounded-lg font-semibold ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Selectează {plan.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-16 max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Metode de Plată</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-3">Stripe</h4>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Card bancar</li>
                <li>✓ Apple Pay</li>
                <li>✓ Google Pay</li>
                <li>✓ Procesare instantanee</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3">USDT TRC20</h4>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Complet anonim</li>
                <li>✓ Fără KYC</li>
                <li>✓ Confirmare manuală (admin)</li>
                <li>✓ Taxe minime blockchain</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
