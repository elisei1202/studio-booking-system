import Link from 'next/link'

export default function RegulamentPage() {
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
              <Link href="/abonamente" className="text-gray-600 hover:text-primary-600">
                Abonamente
              </Link>
              <Link href="/dashboard" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                Dashboard
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-12">
          <h1 className="text-4xl font-bold mb-8">Regulament</h1>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Sistem de Credite</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>1 credit = 75 lei</li>
              <li>Creditele sunt calculate în unități (1 credit = 100 unități)</li>
              <li>Creditele sunt valabile 30 zile de la activarea abonamentului</li>
              <li>Creditele neutilizate NU se reportează</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Sloturi și Program</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Un slot = 1 oră 30 minute</li>
              <li>Tampon de 15 minute între sloturi</li>
              <li>Program zilnic: 06:00 – 22:00</li>
              <li>Total 9 sloturi pe zi</li>
              <li>Rezervări noapte: 22:00 – 06:00</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Prețuri Sloturi:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>LOW</strong> (0.75 credite): 06:00-07:30, 13:00-14:30</li>
              <li><strong>STANDARD</strong> (1 credit): 07:45-16:15</li>
              <li><strong>PEAK</strong> (1.5 credite): 16:30-21:30</li>
              <li><strong>NOAPTE</strong> (2.5 credite): 22:00-06:00</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Abonamente</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">BASIC (600 lei)</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>8 credite</li>
              <li>Rezervări doar Luni-Joi</li>
              <li>Fără weekend</li>
              <li>Fără nopți</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">STANDARD (750 lei)</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>10 credite</li>
              <li>Maximum 2 rezervări weekend/lună</li>
              <li>Nopți permise</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">PREMIUM (900 lei)</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>12 credite</li>
              <li>Weekend nelimitat</li>
              <li>Nopți permise</li>
              <li>Rezervări cu prioritate (14 zile în avans)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Penalizări pentru Întârziere</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>0-10 minute</strong>: fără penalizare</li>
              <li><strong>10-30 minute</strong>: -1 credit (100 unități)</li>
              <li><strong>peste 30 minute</strong>: -2 credite (200 unități)</li>
            </ul>
            <p className="mt-4 text-gray-700">
              Penalizările sunt aplicate manual de către administrator și se scad automat din creditele rămase.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Metode de Plată</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Stripe</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Card bancar, Apple Pay, Google Pay</li>
              <li>Activare instantanee</li>
              <li>Procesare securizată</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">USDT TRC20</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Plată anonimă cu USDT pe rețeaua TRC20</li>
              <li>Fără KYC sau verificare identitate</li>
              <li>Confirmare manuală de către administrator</li>
              <li>Activare în maxim 24 ore după confirmarea tranzacției</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Anulări și Rambursări</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Rezervările pot fi anulate cu cel puțin 24 ore înainte</li>
              <li>Anularea returnează creditele în cont</li>
              <li>Abonamentele plătite nu sunt rambursabile</li>
              <li>În caz de probleme tehnice, contactați suportul</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact</h2>
            <p className="text-gray-700">
              Pentru suport și întrebări, vă rugăm să ne contactați la:
              <br />
              Email: <a href="mailto:support@studiobooking.ro" className="text-primary-600">support@studiobooking.ro</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
