# Studio Booking System

Sistem complet de rezervări pentru studio privat cu:
- Next.js 14 App Router
- PostgreSQL (Railway)
- Prisma ORM
- Stripe payments
- USDT TRC20 payments (anonim)
- Sistem de credite și sloturi dinamice
- UI complet în română
- Penalizări pentru întârziere

---

## 📁 Structura Proiectului

```
studio-booking-system/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   │   ├── register/route.ts
│   │   │   └── login/route.ts
│   │   ├── subscription/
│   │   │   ├── create/route.ts
│   │   │   ├── stripe-session/route.ts
│   │   │   └── stripe-webhook/route.ts
│   │   ├── payment/usdt/
│   │   │   ├── create/route.ts
│   │   │   └── confirm/route.ts
│   │   ├── slots/
│   │   │   └── list/route.ts
│   │   ├── reservation/
│   │   │   ├── create/route.ts
│   │   │   └── night/route.ts
│   │   └── admin/
│   │       ├── penalty/route.ts
│   │       └── block-user/route.ts
│   ├── abonamente/page.tsx      # Pagina abonamente
│   ├── regulament/page.tsx      # Pagina regulament
│   ├── dashboard/page.tsx       # Dashboard utilizator
│   ├── admin/page.tsx           # Admin panel
│   ├── layout.tsx
│   ├── page.tsx                 # Landing page
│   └── globals.css
├── lib/
│   ├── prisma.ts                # Prisma client
│   ├── auth.ts                  # Autentificare JWT
│   ├── stripe.ts                # Integrare Stripe
│   └── slots.ts                 # Definiție sloturi
├── prisma/
│   ├── schema.prisma            # Schema bază de date
│   └── seed.ts                  # Seed script
├── Dockerfile                   # Docker configuration
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── .env.example
└── README.md

Total: 28+ fișiere
```

---

## 🚀 Deployment pe Railway.app

### 1. Pregătire

```bash
# Clonează sau creează proiectul
git init
git add .
git commit -m "Initial commit"
```

### 2. Creare Cont Railway

1. Accesează https://railway.app
2. Creează cont (GitHub OAuth recomandat)
3. Creează un nou proiect

### 3. Adăugare PostgreSQL

În Railway dashboard:
1. Click "New" → "Database" → "PostgreSQL"
2. Așteaptă provisionarea
3. Copiază `DATABASE_URL` din variabilele de mediu

### 4. Deploy Next.js App

1. În Railway: "New" → "GitHub Repo"
2. Selectează repository-ul tău
3. Railway va detecta automat Next.js

### 5. Configurare Variabile de Mediu

În Railway, setează următoarele variabile:

```bash
# Database (auto-generat de Railway)
DATABASE_URL=postgresql://...

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...

# USDT TRC20
USDT_TRC20_ADDRESS=TYourUSDTAddressHere
USDT_PRICE_PER_SUBSCRIPTION_BASIC=12
USDT_PRICE_PER_SUBSCRIPTION_STANDARD=15
USDT_PRICE_PER_SUBSCRIPTION_PREMIUM=18

# App
NEXT_PUBLIC_APP_URL=https://your-app.railway.app
```

### 6. Migrare Bază de Date

După deploy, rulează în Railway terminal:

```bash
npx prisma migrate deploy
npx prisma db seed
```

### 7. Configurare Stripe Webhook

1. În Stripe Dashboard → Webhooks
2. Adaugă endpoint: `https://your-app.railway.app/api/subscription/stripe-webhook`
3. Selectează evenimente: `checkout.session.completed`
4. Copiază webhook secret în `STRIPE_WEBHOOK_SECRET`

---

## 💻 Development Local

### 1. Instalare Dependențe

```bash
npm install
```

### 2. Configurare .env

```bash
cp .env.example .env
# Editează .env cu valorile tale
```

### 3. Setup Database

```bash
# Pornește PostgreSQL local sau folosește Railway
npx prisma migrate dev
npx prisma db seed
```

### 4. Pornire Server

```bash
npm run dev
# Accesează http://localhost:3000
```

---

## 📊 Logica de Business

### Sistem de Credite

- **1 credit = 75 lei**
- **Unități**: 1 credit = 100 units (pentru calcule precise)

### Sloturi Zilnice (9 total)

| Interval | Preț | Tip |
|----------|------|-----|
| 06:00-07:30 | 0.75 credite (75 units) | LOW |
| 07:45-09:15 | 1 credit (100 units) | STANDARD |
| 09:30-11:00 | 1 credit (100 units) | STANDARD |
| 11:15-12:45 | 1 credit (100 units) | STANDARD |
| 13:00-14:30 | 0.75 credite (75 units) | LOW |
| 14:45-16:15 | 1 credit (100 units) | STANDARD |
| 16:30-18:00 | 1.5 credite (150 units) | PEAK |
| 18:15-19:45 | 1.5 credite (150 units) | PEAK |
| 20:00-21:30 | 1.5 credite (150 units) | PEAK |

### Rezervare Noapte

- **22:00 - 06:00**
- **Cost**: 2.5 credite (250 units)

### Abonamente

#### BASIC (600 lei)
- 8 credite (800 units)
- Rezervări Luni-Joi
- Fără weekend
- Fără nopți
- Valabilitate: 30 zile

#### STANDARD (750 lei)
- 10 credite (1000 units)
- Max 2 rezervări weekend/lună
- Nopți permise
- Valabilitate: 30 zile

#### PREMIUM (900 lei)
- 12 credite (1200 units)
- Weekend nelimitat
- Nopți permise
- Rezervări cu prioritate (14 zile vs 7 zile)
- Valabilitate: 30 zile

### Penalizări

| Întârziere | Penalizare |
|------------|------------|
| 0-10 min | Fără penalizare |
| 10-30 min | -1 credit (100 units) |
| >30 min | -2 credite (200 units) |

---

## 🔐 Autentificare și Securitate

### Auth Flow

1. User se înregistrează cu email + parolă
2. Parola este hash-uită cu bcrypt
3. La login, se generează JWT token valid 7 zile
4. Token-ul se trimite în header `Authorization: Bearer <token>`

### Roluri

- **USER**: Utilizator normal (rezervări)
- **ADMIN**: Administrator (gestionare, penalizări, USDT)

---

## 💳 Plăți

### Stripe (Principal)

1. User selectează abonament
2. Se creează `UserSubscription` cu status `PENDING`
3. User e redirectat la Stripe Checkout
4. La succes, webhook activează abonamentul
5. Credite alocate instant

**Metode acceptate**:
- Card bancar
- Apple Pay
- Google Pay

### USDT TRC20 (Anonim)

1. User selectează USDT
2. API returnează adresa TRC20 + sumă
3. User trimite USDT manual
4. Admin confirmă în admin panel
5. Abonamentul devine activ

**Avantaje**:
- Complet anonim
- Fără KYC
- Fără verificare identitate

---

## 🛠 API Endpoints

### Auth
- `POST /api/auth/register` - Înregistrare
- `POST /api/auth/login` - Autentificare

### Subscription
- `POST /api/subscription/create` - Creare abonament
- `POST /api/subscription/stripe-session` - Stripe checkout
- `POST /api/subscription/stripe-webhook` - Webhook Stripe

### Payment
- `POST /api/payment/usdt/create` - Inițiere plată USDT
- `POST /api/payment/usdt/confirm` - Confirmare USDT (admin)

### Slots & Reservations
- `GET /api/slots/list?date=YYYY-MM-DD` - Sloturi disponibile
- `POST /api/reservation/create` - Rezervare slot
- `POST /api/reservation/night` - Rezervare noapte

### Admin
- `POST /api/admin/penalty` - Aplicare penalizare
- `POST /api/admin/block-user` - Blocare utilizator

---

## 📱 Pagini UI

### Public
- `/` - Landing page
- `/abonamente` - Listă abonamente
- `/regulament` - Regulament complet

### Protected
- `/dashboard` - Dashboard utilizator
  - Abonament activ
  - Credite rămase
  - Rezervare sloturi
  - Istoric rezervări

- `/admin` - Admin panel
  - Gestionare utilizatori
  - Abonamente active
  - Rezervări
  - Confirmare plăți USDT
  - Aplicare penalizări

---

## 🗄 Database Schema

### Models

- **User**: Utilizatori (email, parolă, rol)
- **SubscriptionPlan**: Planuri de abonament
- **UserSubscription**: Abonamente utilizatori
- **Reservation**: Rezervări (sloturi/nopți)
- **Payment**: Plăți (Stripe/USDT)

Vezi `prisma/schema.prisma` pentru detalii complete.

---

## 🧪 Testing Local

### Test Auth

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Slots

```bash
curl -X GET "http://localhost:3000/api/slots/list?date=2024-12-25" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📦 Production Checklist

- [ ] Setează toate variabilele de mediu în Railway
- [ ] Configurează Stripe webhook
- [ ] Rulează migrări Prisma
- [ ] Seed database cu planuri
- [ ] Creează admin user
- [ ] Testează flow-uri de plată
- [ ] Verifică rate limits
- [ ] Configurează logging
- [ ] Setup backup database
- [ ] Testează penalizări

---

## 🔧 Troubleshooting

### Error: Database connection failed

```bash
# Verifică DATABASE_URL în .env
echo $DATABASE_URL

# Test conexiune
npx prisma db push
```

### Error: Stripe webhook signature invalid

```bash
# Verifică STRIPE_WEBHOOK_SECRET
# Reinstalează webhook în Stripe Dashboard
```

### Error: Prisma client not generated

```bash
npx prisma generate
npm run build
```

---

## 📞 Support

Pentru probleme sau întrebări:
- Email: support@studiobooking.ro
- GitHub Issues: [link-to-repo]

---

## 📄 License

Proprietate privată. Toate drepturile rezervate.

---

## 🎯 Features Viitoare (Opțional)

- [ ] Email notifications
- [ ] SMS reminders
- [ ] Calendar sync (Google/Outlook)
- [ ] Multi-studio support
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard
- [ ] Loyalty program
- [ ] Referral system

---

**Nota**: Acest sistem este production-ready și poate fi deployat imediat pe Railway.app urmând pașii de mai sus.
