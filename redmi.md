🧺 DhobiGo

Clean Clothes. Delivered.

DhobiGo is a full-stack laundry marketplace platform that connects Customers, Laundry Partners, Delivery Partners, and Admins through one centralized system.

The platform supports:

- Laundry & dry-cleaning discovery
- Service selection
- Pickup scheduling
- Online payment
- Cash on Delivery
- Laundry order management
- Delivery assignment
- Live GPS tracking
- OTP-based pickup/delivery
- Commission management
- Partner settlements
- Notifications
- Admin dashboard
- Reports and support

---

📌 Project Status

Project Type: Full-Stack Marketplace
Frontend: React + Vite + TypeScript
Backend: Node.js + Express + TypeScript
Database: MongoDB + Mongoose
Real-time: Socket.IO
State Management: TanStack Query + Zustand
Validation: Zod
Authentication: JWT/secure session architecture
Maps: Map provider abstraction
Payments: Payment-provider abstraction
Deployment: Production-ready architecture

---

🏗️ System Architecture

DhobiGo consists of four role-based experiences:

                    ┌─────────────────────┐
                    │      CUSTOMER       │
                    │    React / Vite     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │                     │
                    │   DHOBIGO BACKEND   │
                    │ Node + Express + TS  │
                    │ REST API + Socket.IO │
                    │                     │
                    └──────┬───────┬──────┘
                           │       │
              ┌────────────┘       └────────────┐
              ▼                                 ▼
       ┌─────────────┐                   ┌──────────────┐
       │   MongoDB   │                   │ External APIs│
       │             │                   │ Maps/Payment │
       └─────────────┘                   │ SMS/Storage  │
                                         └──────────────┘

       ┌─────────────────┐        ┌──────────────────┐
       │ LAUNDRY PARTNER │        │ DELIVERY PARTNER │
       │ React Interface │        │ React Interface  │
       └────────┬────────┘        └────────┬─────────┘
                │                          │
                └──────────┬───────────────┘
                           │
                     Same Backend

                     ┌───────────────┐
                     │ ADMIN PANEL   │
                     │ React Web UI  │
                     └───────────────┘

For detailed architecture, see:

Architecture.md

---

👥 User Roles

DhobiGo has four main roles.

1. Customer

Customers can:

- Register/login
- Find nearby laundry shops
- Search services
- Compare prices
- Add services to cart
- Schedule pickup
- Select address
- Pay online
- Choose Cash on Delivery
- Track orders
- Track active delivery using live GPS
- Rate laundry and delivery
- Apply coupons
- Contact support

Route:

/customer/*

---

2. Laundry Partner

Laundry partners can:

- Register their laundry shop
- Manage profile
- Add services
- Change prices
- Accept/reject orders
- Manage pickup
- Update laundry status
- Mark order ready
- View earnings
- View settlements
- View reviews
- Contact support

Route:

/laundry/*

---

3. Delivery Partner

Delivery partners can:

- Register
- Complete verification
- Go online/offline
- Receive delivery assignments
- Accept/reject assignments
- Navigate to pickup
- Verify pickup
- Pick up clothes
- Navigate to customer
- Share active delivery GPS
- Verify delivery using OTP
- Complete delivery
- View earnings
- View payout history

Route:

/delivery/*

---

4. Admin

Admin controls the complete DhobiGo platform.

Admin can manage:

- Customers
- Laundry partners
- Delivery partners
- Orders
- Payments
- Commissions
- Settlements
- COD reconciliation
- Coupons
- Reviews
- Complaints
- Live deliveries
- Reports
- Notifications
- Settings
- Audit logs

Route:

/admin/*

---

🛠️ Technology Stack

Frontend

React
Vite
TypeScript
React Router
TanStack Query
Zustand
Axios
Tailwind CSS
shadcn/ui
React Hook Form
Zod
Socket.IO Client
React Leaflet / Map abstraction

Backend

Node.js
Express.js
TypeScript
MongoDB
Mongoose
Socket.IO
JWT / secure authentication
Zod
Helmet
CORS
Rate Limiting
Structured Logging

Testing

Vitest
Supertest
React Testing Library

---

📁 Project Structure

Recommended structure:

dhobigo/
│
├── apps/
│   │
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── assets/
│   │   │   ├── components/
│   │   │   ├── features/
│   │   │   │   ├── auth/
│   │   │   │   ├── customer/
│   │   │   │   ├── laundry/
│   │   │   │   ├── delivery/
│   │   │   │   ├── admin/
│   │   │   │   ├── orders/
│   │   │   │   ├── payments/
│   │   │   │   ├── tracking/
│   │   │   │   └── notifications/
│   │   │   ├── hooks/
│   │   │   ├── layouts/
│   │   │   ├── lib/
│   │   │   ├── stores/
│   │   │   ├── types/
│   │   │   └── main.tsx
│   │   │
│   │   └── package.json
│   │
│   └── api/
│       ├── src/
│       │   ├── config/
│       │   ├── database/
│       │   ├── middleware/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── users/
│       │   │   ├── laundry/
│       │   │   ├── services/
│       │   │   ├── orders/
│       │   │   ├── delivery/
│       │   │   ├── tracking/
│       │   │   ├── payments/
│       │   │   ├── commissions/
│       │   │   ├── settlements/
│       │   │   ├── coupons/
│       │   │   ├── reviews/
│       │   │   ├── notifications/
│       │   │   ├── support/
│       │   │   └── admin/
│       │   ├── integrations/
│       │   ├── sockets/
│       │   ├── jobs/
│       │   ├── utils/
│       │   ├── app.ts
│       │   └── server.ts
│       │
│       └── package.json
│
├── packages/
│   ├── shared/
│   │   ├── types/
│   │   ├── schemas/
│   │   ├── constants/
│   │   └── utils/
│   │
│   └── config/
│
├── docs/
│   ├── Architecture.md
│   ├── API.md
│   ├── Database.md
│   └── Deployment.md
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── tsconfig.base.json
└── README.md

---

🚀 Getting Started

Requirements

Install the following:

- Node.js 20+
- npm 10+
- MongoDB
- Git

Optional:

- Docker
- Docker Compose

Check versions:

node -v
npm -v
git --version

---

📥 Installation

Clone the project:

git clone <YOUR_REPOSITORY_URL>
cd dhobigo

Install dependencies:

npm install

If using workspaces:

npm install --workspaces

---

🔐 Environment Variables

Create:

.env

from:

.env.example

Example:

NODE_ENV=development

PORT=5000

MONGODB_URI=mongodb://localhost:27017/dhobigo

JWT_SECRET=replace_with_secure_secret
JWT_REFRESH_SECRET=replace_with_secure_refresh_secret

CLIENT_URL=http://localhost:5173

PAYMENT_PROVIDER_KEY=
PAYMENT_PROVIDER_SECRET=
PAYMENT_WEBHOOK_SECRET=

MAPS_API_KEY=

SMS_PROVIDER_KEY=
SMS_PROVIDER_SECRET=

STORAGE_PROVIDER_KEY=
STORAGE_PROVIDER_SECRET=

Never commit ".env" to Git.

---

🗄️ MongoDB Setup

Local MongoDB

Start MongoDB locally and use:

MONGODB_URI=mongodb://localhost:27017/dhobigo

Docker

If Docker Compose is configured:

docker compose up -d

Check containers:

docker compose ps

---

▶️ Run Development Environment

Run frontend:

npm run dev:web

Run backend:

npm run dev:api

If the project uses a single development command:

npm run dev

Frontend should normally run on:

http://localhost:5173

Backend should normally run on:

http://localhost:5000

API base:

http://localhost:5000/api/v1

---

🔑 Authentication

DhobiGo uses role-based authentication.

Supported roles:

CUSTOMER
LAUNDRY_PARTNER
DELIVERY_PARTNER
ADMIN

Example login flow:

User
 ↓
Mobile Number
 ↓
OTP
 ↓
OTP Verification
 ↓
Backend Authentication
 ↓
Role Detection
 ↓
Role-specific Dashboard

Backend must always verify the user's role.

Never rely only on frontend route protection.

---

🧺 Customer Order Flow

Complete customer flow:

Login
 ↓
Location
 ↓
Browse Laundry
 ↓
Select Laundry
 ↓
Select Services
 ↓
Cart
 ↓
Pickup Address
 ↓
Pickup Time
 ↓
Checkout
 ↓
Payment
 ↓
Order Created
 ↓
Laundry Accepts
 ↓
Pickup Assigned
 ↓
Pickup
 ↓
Laundry Processing
 ↓
Ready
 ↓
Delivery Assigned
 ↓
Live GPS
 ↓
Delivery
 ↓
OTP Verification
 ↓
Completed
 ↓
Review

---

🧺 Laundry Order Flow

New Order
 ↓
Accept
 ↓
Pickup Assigned
 ↓
Clothes Received
 ↓
Sorting
 ↓
Washing
 ↓
Drying
 ↓
Ironing
 ↓
Quality Check
 ↓
Ready for Delivery
 ↓
Delivery Assigned

---

🚴 Delivery Flow

Go Online
 ↓
Delivery Assignment
 ↓
Accept
 ↓
Navigate to Pickup
 ↓
Pickup OTP
 ↓
Collect Clothes
 ↓
Navigate to Customer
 ↓
Live GPS
 ↓
Customer OTP
 ↓
Delivered
 ↓
Earnings Updated

---

📍 Live GPS

Live GPS is only active for authorized active delivery operations.

Architecture:

Delivery App
     │
     │ GPS
     ▼
Socket.IO
     │
     ▼
DhobiGo Backend
     │
     ├──────────► Customer
     │             │
     │             ▼
     │          Live Map
     │
     └──────────► Admin
                   │
                   ▼
                Live Map

Socket events:

delivery:location:update
delivery:status:update
delivery:partner:online
delivery:partner:offline

When the delivery is completed:

GPS Tracking → STOP

---

💳 Payment Architecture

Online payment must use a proper payment provider.

Never trust frontend payment status.

Correct flow:

Customer
 ↓
DhobiGo Backend
 ↓
Payment Provider
 ↓
Customer Payment
 ↓
Payment Provider Webhook
 ↓
DhobiGo Backend
 ↓
Verify Webhook
 ↓
Mark Payment Successful
 ↓
Confirm Order

The backend must verify payment status.

---

💵 Cash on Delivery

For COD:

Customer
 ↓
Delivery Partner
 ↓
Cash Collected
 ↓
Delivery App
 ↓
COD Reconciliation
 ↓
Admin

Example:

Expected Cash: ₹500
Collected Cash: ₹500
Difference: ₹0
Status: Reconciled

---

💰 Commission

Commission is calculated on the backend.

Example:

Laundry Service = ₹400

Commission = 15%

DhobiGo Commission = ₹60

Laundry Payable = ₹340

Never allow the customer or frontend to directly control commission values.

---

🚴 Delivery Earnings

Example:

0–2 km   → ₹20
2–5 km   → ₹30
5–8 km   → ₹40
8–12 km  → ₹50

These values must be configurable.

---

🧾 Settlement

The platform maintains separate financial ledgers.

Laundry

Gross Order
- DhobiGo Commission
- Refunds
+/- Adjustments
= Laundry Payable

Delivery

Delivery Earnings
+ Bonuses
- Adjustments
= Delivery Payable

DhobiGo

Platform Commission
+ Delivery Margin
- Gateway Charges
- Refunds
- Taxes
- Operating Costs
= Net Revenue

---

🔔 Notifications

Notifications should be generated for:

Customer

- Order confirmed
- Laundry accepted
- Pickup assigned
- Pickup completed
- Processing started
- Ready
- Delivery assigned
- Out for delivery
- Delivered
- Payment confirmation
- Offers

Laundry

- New order
- Pickup scheduled
- Delivery assigned
- Cancellation

Delivery

- New delivery
- Pickup reminder
- Delivery assignment
- Customer cancellation
- Earnings update

---

🧪 Testing

Run tests:

npm test

Frontend tests:

npm run test:web

Backend tests:

npm run test:api

Build:

npm run build

---

🔍 Code Quality

Before committing:

npm run lint
npm run format
npm run typecheck

The project should not have:

- TypeScript errors
- ESLint errors
- Unused imports
- Exposed secrets
- Hard-coded production credentials

---

🔒 Security Rules

Never expose:

MONGODB_URI
JWT_SECRET
PAYMENT_PROVIDER_SECRET
PAYMENT_WEBHOOK_SECRET
SMS_PROVIDER_SECRET
STORAGE_PROVIDER_SECRET

Security requirements:

- Validate all API input
- Authenticate protected APIs
- Authorize every role
- Rate-limit sensitive endpoints
- Verify payment webhooks
- Validate file uploads
- Sanitize database queries
- Use HTTPS in production
- Use secure cookies/tokens
- Maintain audit logs

---

📊 Database Collections

Main MongoDB collections:

users
laundryShops
services
orders
addresses
deliveryAssignments
deliveryLocations
payments
refunds
commissions
settlements
coupons
reviews
notifications
supportTickets
adminAuditLogs

---

🌍 API Structure

All APIs should use:

/api/v1

Examples:

POST /api/v1/auth/login
POST /api/v1/auth/verify-otp

GET /api/v1/laundries
GET /api/v1/laundries/:id

POST /api/v1/orders
GET /api/v1/orders
GET /api/v1/orders/:id

POST /api/v1/payments/create
POST /api/v1/payments/webhook

POST /api/v1/delivery/assignments/:id/accept
POST /api/v1/delivery/assignments/:id/pickup
POST /api/v1/delivery/assignments/:id/complete

GET /api/v1/admin/dashboard
GET /api/v1/admin/orders
GET /api/v1/admin/settlements

---

🧩 Development Phases

Phase 1 — Foundation

- React + Vite + TypeScript
- Express + TypeScript
- MongoDB
- Project structure
- ESLint
- Prettier
- Environment configuration

Phase 2 — Authentication

- Login
- OTP
- User roles
- Protected routes
- Backend authorization

Phase 3 — Customer

- Home
- Laundry discovery
- Search
- Services
- Cart
- Address
- Checkout
- Orders

Phase 4 — Laundry

- Partner onboarding
- Dashboard
- Services
- Orders
- Processing workflow

Phase 5 — Delivery

- Delivery onboarding
- Online/offline
- Assignments
- Pickup
- Delivery
- Earnings

Phase 6 — GPS

- Maps
- GPS permissions
- Socket.IO
- Live location
- Customer tracking
- Admin tracking

Phase 7 — Payments

- Online payment
- Webhooks
- COD
- Reconciliation

Phase 8 — Finance

- Commission
- Delivery earnings
- Laundry settlement
- Delivery settlement
- Reports

Phase 9 — Admin

- Dashboard
- Users
- Partners
- Orders
- Finance
- Support
- Reports

Phase 10 — Production

- Testing
- Security
- Performance
- Deployment
- Monitoring
- Backups

---

🤖 Antigravity Development Instructions

When using this repository with Antigravity, follow this order:

Step 1

Read:

Architecture.md
README.md

before modifying the project.

Step 2

Inspect the existing project structure.

Do not overwrite working code unnecessarily.

Step 3

Create the project foundation first:

React
Vite
TypeScript
Node
Express
MongoDB
Mongoose

Step 4

Implement authentication and roles before business modules.

Step 5

Implement modules one by one.

Recommended order:

Auth
 ↓
Users
 ↓
Laundry
 ↓
Services
 ↓
Orders
 ↓
Delivery
 ↓
Tracking
 ↓
Payments
 ↓
Commission
 ↓
Settlements
 ↓
Notifications
 ↓
Admin

Step 6

After every major module:

Run TypeScript check
Run lint
Run tests
Build project

Fix errors before continuing.

Step 7

Never create fake production functionality.

For external services, create provider interfaces/adapters and use environment variables.

Example:

PaymentProvider
MapProvider
NotificationProvider
StorageProvider

This allows providers to be replaced later.

Step 8

Never hard-code:

Commission
Delivery Rates
Payment Credentials
Map Credentials
Admin Credentials
City
Service Prices

Configuration should come from database or environment configuration where appropriate.

---

🧠 Business Rules

Order

Only valid order state transitions are allowed.

Example:

PLACED
 ↓
ACCEPTED
 ↓
PICKUP_ASSIGNED
 ↓
PICKED_UP
 ↓
PROCESSING
 ↓
READY_FOR_DELIVERY
 ↓
OUT_FOR_DELIVERY
 ↓
DELIVERED

Cancellation

Cancellation rules must depend on order status.

Example:

Before Pickup → Customer cancellation allowed
After Pickup → Restricted cancellation
After Processing → Refund rules apply
After Delivered → Cancellation unavailable

Actual policies should be configurable.

---

📱 Responsive Requirements

Customer:

Mobile-first

Laundry:

Mobile/tablet-first

Delivery:

Mobile-first

Admin:

Desktop/tablet-first

All interfaces must remain usable on smaller screens.

---

🚀 Production Checklist

Before launch:

- [ ] MongoDB production database configured
- [ ] Production environment variables configured
- [ ] HTTPS enabled
- [ ] Payment provider configured
- [ ] Payment webhook verified
- [ ] Maps configured
- [ ] Push notifications configured
- [ ] SMS/OTP configured
- [ ] Database indexes created
- [ ] Authentication tested
- [ ] Role authorization tested
- [ ] GPS permissions tested
- [ ] COD reconciliation tested
- [ ] Commission tested
- [ ] Settlement tested
- [ ] Refund flow tested
- [ ] Admin permissions tested
- [ ] Error logging enabled
- [ ] Database backup strategy configured
- [ ] Frontend production build tested
- [ ] Backend production build tested
- [ ] Security audit completed

---

📚 Documentation

Additional documentation should live in:

docs/
├── Architecture.md
├── API.md
├── Database.md
└── Deployment.md

"Architecture.md" is the source of truth for the overall system architecture.

---

📄 License

Choose an appropriate license before public release.

For a private commercial project, do not add an open-source license unless you intentionally want to grant those rights.

---

🧺 DhobiGo

Clean Clothes. Delivered.

Build the platform incrementally, keep the architecture modular, protect financial and user data, and make every critical business operation verifiable from the backend.