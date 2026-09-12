DhobiGo — Full-Stack Platform Architecture
1. Project Goal
DhobiGo is a full-stack laundry marketplace platform connecting:
Customers
Laundry Partners
Delivery Partners
DhobiGo Admins
The platform must support ordering, laundry workflow, delivery assignment, payments, commissions, settlements, notifications, and live GPS tracking.
Core architecture
```text
                    ┌──────────────────────┐
                    │      Customer         │
                    │      React App        │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │                      │
                    │   DhobiGo Backend    │
                    │ Node.js + Express     │
                    │ REST API + Socket.IO  │
                    │                      │
                    └───────┬───────┬──────┘
                            │       │
              ┌─────────────┘       └──────────────┐
              │                                     │
     ┌────────▼────────┐                   ┌────────▼────────┐
     │    MongoDB      │                   │ External APIs   │
     │   Database      │                   │ Maps / Payment  │
     └─────────────────┘                   │ SMS / Storage   │
                                           └─────────────────┘

     ┌──────────────────┐       ┌────────────────────┐
     │ Laundry Partner  │       │ Delivery Partner   │
     │ React Interface  │       │ React Interface    │
     └────────┬─────────┘       └─────────┬──────────┘
              │                           │
              └──────────┬────────────────┘
                         │
                  Same Backend/API

                    ┌────────────────────┐
                    │    Admin Panel     │
                    │ React Interface    │
                    └─────────┬──────────┘
                              │
                         Same Backend
```
---
2. Technology Stack
Frontend
Use:
React
Vite
TypeScript
React Router
TanStack Query
Axios
Zustand for lightweight global state
Tailwind CSS
shadcn/ui where useful
React Hook Form
Zod
Socket.IO Client
Leaflet/React Leaflet or another map provider abstraction
The frontend must be responsive and mobile-first.
Backend
Use:
Node.js
Express.js
TypeScript
MongoDB
Mongoose
Socket.IO
JWT authentication
bcrypt/argon2 for password hashing where passwords are used
Zod for request validation
Helmet
CORS
Rate limiting
Pino/Winston-style structured logging
Development
npm
ESLint
Prettier
Vitest for frontend/unit tests
Supertest for API tests
Docker Compose for local MongoDB if useful
`.env` configuration
Git
---
3. Recommended Monorepo Structure
Use a single repository so frontend and backend can share types and validation contracts.
```text
dhobigo/
│
├── apps/
│   ├── web/
│   │   └── React + Vite + TypeScript
│   │
│   └── api/
│       └── Node + Express + TypeScript
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
├── README.md
└── tsconfig.base.json
```
If Antigravity is instructed to build a single Vite application initially, keep all role-based interfaces inside `apps/web` and separate them through routes and role guards.
---
4. Frontend Architecture
The React application should be organized by feature, not by an overly flat list of components.
```text
apps/web/src/
│
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   ├── providers.tsx
│   └── guards/
│
├── assets/
│
├── components/
│   ├── ui/
│   ├── common/
│   ├── forms/
│   ├── maps/
│   └── feedback/
│
├── features/
│   ├── auth/
│   ├── customer/
│   ├── laundry/
│   ├── delivery/
│   ├── admin/
│   ├── orders/
│   ├── payments/
│   ├── notifications/
│   └── tracking/
│
├── layouts/
│   ├── CustomerLayout.tsx
│   ├── PartnerLayout.tsx
│   ├── DeliveryLayout.tsx
│   └── AdminLayout.tsx
│
├── lib/
│   ├── api.ts
│   ├── socket.ts
│   └── queryClient.ts
│
├── hooks/
├── stores/
├── types/
├── utils/
├── constants/
└── main.tsx
```
---
5. Role-Based Application
DhobiGo has four roles:
```text
CUSTOMER
LAUNDRY_PARTNER
DELIVERY_PARTNER
ADMIN
```
The same frontend can expose different experiences based on authenticated role.
Example routes:
```text
/customer/*
/laundry/*
/delivery/*
/admin/*
```
A logged-in customer must never be able to access partner/admin pages.
Implement:
Authentication guard
Role guard
Route-level authorization
Backend authorization
Frontend guards are only for UX. Security must always be enforced by the backend.
---
6. Customer Architecture
Customer flow:
```text
Location
   ↓
Home
   ↓
Laundry Listing
   ↓
Laundry Details
   ↓
Services
   ↓
Cart
   ↓
Pickup Schedule
   ↓
Address
   ↓
Payment
   ↓
Order Confirmation
   ↓
Order Tracking
   ↓
Live Delivery Tracking
   ↓
Delivery
   ↓
Rating/Review
```
Customer modules:
Authentication
Location
Laundry discovery
Search/filter
Laundry details
Services
Cart
Checkout
Address management
Orders
Payments
Tracking
Notifications
Coupons
Reviews
Support
Profile
---
7. Laundry Partner Architecture
Laundry partner flow:
```text
Login
 ↓
Dashboard
 ↓
New Order
 ↓
Accept Order
 ↓
Pickup Requested
 ↓
Clothes Received
 ↓
Processing
 ↓
Quality Check
 ↓
Ready for Delivery
 ↓
Delivery Assigned
 ↓
Completed
```
Modules:
Partner onboarding
Shop profile
Services
Pricing
Orders
Order status
Customers
Earnings
Settlements
Reviews
Notifications
Support
---
8. Delivery Partner Architecture
Delivery flow:
```text
Login
 ↓
Go Online
 ↓
Receive Assignment
 ↓
Accept
 ↓
Navigate to Pickup
 ↓
Pickup Verification
 ↓
Pickup Complete
 ↓
Navigate to Customer
 ↓
Customer OTP
 ↓
Delivery Complete
 ↓
Go Offline
```
Modules:
Delivery onboarding
Online/offline
Assignment
Navigation
GPS
Active delivery
Pickup verification
Delivery verification
Earnings
Payouts
History
Notifications
---
9. Admin Architecture
Admin dashboard modules:
Dashboard
Customers
Laundry Partners
Delivery Partners
Orders
Live Deliveries
Payments
Commissions
Settlements
COD reconciliation
Coupons
Reviews
Complaints
Notifications
Reports
Settings
Audit logs
Admin must have granular permissions.
Possible admin permissions:
```text
SUPER_ADMIN
OPERATIONS_ADMIN
FINANCE_ADMIN
SUPPORT_ADMIN
```
---
10. Backend Architecture
Use a modular Express architecture.
```text
apps/api/src/
│
├── app.ts
├── server.ts
│
├── config/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── laundry/
│   ├── services/
│   ├── orders/
│   ├── delivery/
│   ├── tracking/
│   ├── payments/
│   ├── commissions/
│   ├── settlements/
│   ├── coupons/
│   ├── reviews/
│   ├── notifications/
│   ├── support/
│   └── admin/
│
├── middleware/
├── database/
├── integrations/
│   ├── maps/
│   ├── payments/
│   ├── sms/
│   └── storage/
│
├── sockets/
├── jobs/
├── utils/
└── types/
```
Each module should generally contain:
```text
controller
service
repository
model
routes
schema
types
```
Keep business logic out of route files.
---
11. API Architecture
Use REST APIs with versioning.
Base URL:
```text
/api/v1
```
Example:
```text
POST   /api/v1/auth/login
POST   /api/v1/auth/verify-otp

GET    /api/v1/laundries
GET    /api/v1/laundries/:id
GET    /api/v1/laundries/:id/services

POST   /api/v1/orders
GET    /api/v1/orders
GET    /api/v1/orders/:id

POST   /api/v1/orders/:id/cancel

POST   /api/v1/delivery/assignments/:id/accept
POST   /api/v1/delivery/assignments/:id/pickup
POST   /api/v1/delivery/assignments/:id/complete

POST   /api/v1/payments/create
POST   /api/v1/payments/webhook

GET    /api/v1/admin/dashboard
GET    /api/v1/admin/orders
GET    /api/v1/admin/settlements
```
All protected APIs must require authentication and role authorization.
---
12. MongoDB Architecture
Primary collections:
```text
users
laundryShops
services
orders
orderItems
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
```
Use MongoDB ObjectId references where appropriate.
Avoid duplicating large mutable objects unnecessarily.
For historical order records, snapshot important information such as:
Service name
Price
Laundry name
Customer delivery address
Commission rate
This prevents old invoices from changing when a shop later edits its service.
---
13. User Model
Common user fields:
```text
_id
role
name
phone
email
avatar
status
isVerified
createdAt
updatedAt
```
Roles:
```text
CUSTOMER
LAUNDRY_PARTNER
DELIVERY_PARTNER
ADMIN
```
Keep role-specific profile data in separate documents when it becomes large.
---
14. Laundry Shop Model
Fields:
```text
ownerId
name
description
logo
coverImage
phone
address
location
openingHours
rating
reviewCount
status
verificationStatus
commissionRate
createdAt
updatedAt
```
Location should use GeoJSON:
```text
{
  type: "Point",
  coordinates: [longitude, latitude]
}
```
Create a `2dsphere` index for nearby-shop queries.
---
15. Service Model
Fields:
```text
laundryShopId
categoryId
name
description
price
unit
isActive
estimatedProcessingTime
createdAt
updatedAt
```
Examples:
```text
Shirt Wash
Jeans Wash
Dry Cleaning
Ironing
Shoe Cleaning
Blanket Cleaning
```
---
16. Order Model
Important fields:
```text
orderNumber
customerId
laundryShopId
deliveryPartnerId
items
pickupAddress
deliveryAddress
pickupSlot
subtotal
deliveryFee
platformFee
discount
tax
total
paymentMethod
paymentStatus
orderStatus
commission
deliveryEarning
timestamps
```
Use an explicit order state machine.
Example statuses:
```text
PLACED
ACCEPTED
PICKUP_ASSIGNED
PICKED_UP
PROCESSING
READY_FOR_DELIVERY
OUT_FOR_DELIVERY
DELIVERED
CANCELLED
REFUNDED
```
Do not allow arbitrary status changes. Define valid transitions.
---
17. Payment Architecture
Never trust payment success based only on frontend response.
Flow:
```text
Customer
 ↓
Frontend
 ↓
Backend creates payment order
 ↓
Payment Provider
 ↓
Customer completes payment
 ↓
Provider Webhook
 ↓
Backend verifies webhook
 ↓
Payment marked successful
 ↓
Order confirmed
```
Store:
```text
paymentProvider
providerOrderId
providerPaymentId
amount
currency
status
method
metadata
createdAt
updatedAt
```
Use idempotency for payment callbacks.
---
18. Commission Architecture
Commission must be calculated on the backend.
Example:
```text
Laundry service subtotal = ₹400
Commission rate = 15%

DhobiGo commission = ₹60
Laundry payable = ₹340
```
Do not calculate final financial values only in React.
Store a financial snapshot on the order.
---
19. Delivery Earnings
Delivery earning should be configurable.
Example:
```text
0–2 km   = ₹20
2–5 km   = ₹30
5–8 km   = ₹40
8–12 km  = ₹50
```
The backend determines the applicable earning based on the configured pricing rule.
Store the final earning on the delivery assignment/order for accounting history.
---
20. Live GPS Architecture
Use Socket.IO for real-time active-delivery updates.
Flow:
```text
Delivery Partner App
        ↓
GPS
        ↓
Socket.IO
        ↓
DhobiGo Backend
        ↓
 ┌──────┴─────────┐
 ↓                ↓
Customer        Admin
 Map             Map
```
Requirements:
Authenticate socket connections.
Authorize room membership.
Only allow a delivery partner to publish their own location.
Only allow authorized customer/admin users to receive the location.
Use delivery-specific rooms.
Stop customer-facing tracking after completion.
Avoid storing every GPS point permanently.
Optionally store sampled location history for operational/audit purposes with retention limits.
Example socket room:
```text
delivery:{deliveryId}
```
Events:
```text
delivery:location:update
delivery:status:update
delivery:partner:online
delivery:partner:offline
```
---
21. Geospatial Queries
Use MongoDB geospatial indexes.
Example use cases:
Nearby laundry shops
Nearby delivery partners
Distance calculations
Delivery assignment
Do not expose raw internal location data unnecessarily.
---
22. Notification Architecture
Use an abstraction layer so providers can be changed later.
```text
Backend
 ↓
Notification Service
 ├── Push Notification
 ├── SMS/OTP
 └── Email
```
Store notification records:
```text
userId
type
title
message
data
readAt
createdAt
```
---
23. Background Jobs
Use a job queue when required for:
Notifications
Settlement processing
Payment reconciliation
Expired orders
Scheduled reminders
Cleanup/retention
Reports
Do not block API requests with long-running tasks.
---
24. Security Architecture
Implement:
HTTPS in production
Secure HTTP-only cookies or carefully managed access/refresh tokens
Password hashing where passwords exist
OTP expiration
Rate limiting
Helmet
CORS allowlist
Request validation
MongoDB query sanitization
File upload validation
Role-based authorization
Audit logging
Secure secrets in environment variables
Payment webhook signature verification
Never expose:
```text
JWT secrets
MongoDB URI
Payment secrets
SMS credentials
API private keys
```
to the frontend.
---
25. Environment Variables
Create:
```text
.env.example
```
Example categories:
```text
NODE_ENV
PORT
MONGODB_URI
JWT_SECRET
JWT_REFRESH_SECRET
CLIENT_URL

PAYMENT_PROVIDER_KEY
PAYMENT_PROVIDER_SECRET
PAYMENT_WEBHOOK_SECRET

MAPS_API_KEY

SMS_PROVIDER_KEY
SMS_PROVIDER_SECRET

STORAGE_PROVIDER_KEY
STORAGE_PROVIDER_SECRET
```
Never commit `.env`.
---
26. API Response Standard
Use a consistent response structure.
Success:
```json
{
  "success": true,
  "data": {},
  "message": "Success"
}
```
Error:
```json
{
  "success": false,
  "error": {
    "code": "ORDER_NOT_FOUND",
    "message": "Order not found"
  }
}
```
Use meaningful HTTP status codes.
---
27. Error Handling
Create a centralized backend error handler.
Handle:
Validation errors
Authentication errors
Authorization errors
Not found
Conflict
Payment errors
Database errors
External API errors
Do not expose internal stack traces in production.
---
28. Frontend Data Management
Use TanStack Query for:
API requests
Caching
Loading states
Error states
Mutations
Refetching
Use Zustand only for client-side state such as:
UI state
Auth/session state where appropriate
Cart state if desired
Do not duplicate server state unnecessarily in Zustand.
---
29. UI Requirements
Create reusable components:
```text
Button
Input
Select
Modal
Drawer
Card
Badge
Table
Tabs
Dropdown
Toast
Dialog
Loader
EmptyState
ErrorState
Map
OrderTimeline
StatusBadge
```
All screens must have:
Loading state
Empty state
Error state
Success feedback
---
30. Responsive Design
The web application must work on:
Mobile
Tablet
Desktop
Customer and delivery interfaces should prioritize mobile usability.
Admin should prioritize desktop/tablet dashboard usability.
---
31. Testing Architecture
Write tests for:
Unit
Commission calculation
Delivery earning calculation
Order status transitions
Coupon validation
API
Authentication
Orders
Payments
Delivery assignment
Authorization
Integration
Customer → Order → Laundry → Delivery
Critical payment tests
Success
Failure
Duplicate webhook
Refund
---
32. Deployment Architecture
Recommended production structure:
```text
                 Internet
                    │
              HTTPS / Domain
                    │
             ┌──────▼──────┐
             │ Web Frontend│
             │ React/Vite  │
             └──────┬──────┘
                    │
             HTTPS REST API
             + WebSocket
                    │
             ┌──────▼──────┐
             │ Node/Express│
             │   Backend   │
             └──────┬──────┘
                    │
             ┌──────▼──────┐
             │   MongoDB   │
             └─────────────┘
```
External services:
```text
Payment Provider
Maps Provider
Push Notification Provider
SMS/OTP Provider
File/Object Storage
```
Use managed production services where practical.
---
33. Scalability Rules
Design the backend so it can later support:
Multiple cities
Multiple laundry shops
Thousands of customers
Multiple delivery partners
City-specific pricing
Partner-specific commissions
Multiple payment methods
Do not hard-code:
City
Commission rate
Delivery rate
Service price
Admin email
API keys
All configurable values should be stored in configuration/database where appropriate.
---
34. Audit & Financial Integrity
Financial actions must be traceable.
Record:
Who changed commission
Who changed settlement
Who refunded an order
Who changed order status manually
COD adjustments
Payment reconciliation
Partner payout changes
Use immutable financial transaction records where practical.
---
35. MVP Development Priority
Build in this order:
Phase 1
Project setup
MongoDB connection
Authentication
Roles
User profiles
Basic layouts
Phase 2
Laundry shops
Services
Customer browsing
Cart
Addresses
Phase 3
Orders
Laundry workflow
Delivery assignment
Phase 4
Delivery partner app
GPS
Maps
Live tracking
Phase 5
Payments
COD
Commission
Settlements
Phase 6
Admin dashboard
Reports
Support
Notifications
Phase 7
Testing
Security
Deployment
Monitoring
---
36. Important Antigravity Instructions
When generating the project:
First create the complete folder structure.
Configure React + Vite + TypeScript.
Configure the Node/Express TypeScript API.
Configure MongoDB/Mongoose.
Create shared TypeScript types and Zod schemas.
Implement authentication and role-based authorization first.
Build modules incrementally.
Keep frontend and backend contracts synchronized.
Never place secrets in frontend code.
Never trust client-supplied prices, commissions, payment status, GPS ownership, or roles.
Calculate all financial values on the backend.
Validate all API inputs.
Use proper order-state transitions.
Add loading/error/empty states to UI.
Write tests for critical business logic.
Keep the application runnable after every major phase.
Do not generate fake integrations pretending to be production payment/GPS systems.
Use provider adapters/interfaces so real providers can be connected through environment variables.
Document every setup command and environment variable.
Keep code modular and production-oriented.
---
37. Definition of Done
The architecture is considered implemented only when:
Customer can register/login.
Laundry partner can register/login.
Delivery partner can register/login.
Admin can login.
Customer can discover laundry shops.
Customer can select services.
Customer can create an order.
Laundry can accept and process the order.
Delivery can be assigned.
Delivery partner can accept delivery.
GPS can be shared during an active authorized delivery.
Customer can see active delivery tracking.
Delivery can be completed with OTP.
Online payment integration has verified backend/webhook flow.
COD reconciliation works.
Commission is calculated server-side.
Laundry settlement is recorded.
Delivery earning is recorded.
Admin can manage the complete operation.
All role permissions are enforced server-side.
Critical flows have automated tests.
Production environment variables are documented.
The final result should be a clean, maintainable, secure, scalable DhobiGo full-stack marketplace platform built with React + Vite + TypeScript + Node.js + Express + MongoDB, with role-based customer, laundry, delivery, and admin experiences.