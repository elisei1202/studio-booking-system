import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary-600">Studio Booking</h1>
            <div className="space-x-4">
              <Link href="/abonamente" className="text-gray-600 hover:text-primary-600">
                Abonamente
              </Link>
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

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Sistemul tău de rezervări pentru studio privat
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Rezervă sloturi de timp cu sistem de credite flexibil. Plăți prin Stripe sau USDT. Fără KYC, complet anonim.
        </p>
        <Link
          href="/abonamente"
          className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 inline-block"
        >
          Vezi Abonamente
        </Link>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Cum Funcționează</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Alege Abonamentul</h4>
              <p className="text-gray-600">
                Selectează un abonament BASIC, STANDARD sau PREMIUM în funcție de nevoile tale
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Plătește Securizat</h4>
              <p className="text-gray-600">
                Plătește prin Stripe (card, Apple Pay, Google Pay) sau USDT TRC20 pentru anonimitate
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Rezervă Sloturi</h4>
              <p className="text-gray-600">
                Folosește creditele pentru a rezerva sloturi de 1h30 sau nopți complete (22:00-06:00)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slot Pricing */}
      <section className="container mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Prețuri Dinamice Sloturi</h3>
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-4 border-b">
              <span className="font-semibold text-lg">LOW (06:00-07:30, 13:00-14:30)</span>
              <span className="text-primary-600 font-bold">0.75 credite</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b">
              <span className="font-semibold text-lg">STANDARD (07:45-16:15)</span>
              <span className="text-primary-600 font-bold">1 credit</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b">
              <span className="font-semibold text-lg">PEAK (16:30-21:30)</span>
              <span className="text-primary-600 font-bold">1.5 credite</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="font-semibold text-lg">NOAPTE (22:00-06:00)</span>
              <span className="text-primary-600 font-bold">2.5 credite</span>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-6">
            1 credit = 75 lei
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Studio Booking. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  )
}
