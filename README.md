<div align="center">

# 🎉 Let's Celebrate

**A full-stack marketplace for booking celebration services — venues, photography, catering, cakes, and more.**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.5-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React Native](https://img.shields.io/badge/React%20Native-Expo-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat-square&logo=openjdk&logoColor=white)](https://openjdk.org/projects/jdk/17)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Project Structure](#-project-structure) · [Roadmap](#-roadmap)

</div>

---

## What is Let's Celebrate?

Let's Celebrate connects people planning events with trusted local vendors. Users browse service categories, compare packages, check availability, and book everything from a wedding venue to a custom cake — all in one place. Vendors get a dedicated portal to manage listings, packages, and incoming bookings.

---

## ✨ Features

- **Service Discovery** — browse and search by category (Venue, Photography, Catering, Flowers, Cake) and city
- **Vendor Profiles** — ratings, business details, and full service catalogues
- **Package Selection** — vendors offer tiered packages per listing; users pick what fits their event
- **Booking Flow** — select event date/time, confirm booking, track status (Pending → Confirmed → Cancelled)
- **Split Payments** — advance + due amount tracking per booking with gateway reference storage
- **Availability Calendar** — vendors block out dates; users only see open slots
- **Reviews** — post-event reviews attached to completed bookings
- **Dual Role Auth** — separate Customer and Vendor roles with role-aware UI
- **Dark Mode** — full light/dark theme support in the mobile app
- **Cart & Checkout** — add multiple services to cart, review total, proceed to payment

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Java 17 · Spring Boot 4.0.5 · Spring Data JPA · Hibernate |
| **Database** | H2 in-memory (dev) — drop-in replaceable with PostgreSQL / MySQL |
| **Mobile** | React Native · Expo SDK · Expo Router (file-based navigation) |
| **State Management** | Redux Toolkit |
| **Language (frontend)** | TypeScript |
| **Build (backend)** | Gradle (wrapper included — no install needed) |

---

## 🚀 Getting Started

### Prerequisites

- **Java 17+** — [download](https://adoptium.net/)
- **Node.js 18+** — [download](https://nodejs.org/)
- **Expo Go** on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) · [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)) for live preview

### 1 · Clone the repo

```bash
git clone https://github.com/ashking0110/lets-celebrate.git
cd lets-celebrate
```

### 2 · Run the backend

```bash
# From the project root
./gradlew bootRun
```

The API starts on **`http://localhost:8080`**.

> The H2 console is available at **`http://localhost:8080/h2-console`**  
> JDBC URL: `jdbc:h2:mem:letscelebratedb` · User: `sa` · Password: `password`

### 3 · Run the mobile app

```bash
cd frontend
npm install
npx expo start
```

Scan the QR code with **Expo Go** (Android) or the **Camera app** (iOS) to launch on your device.

> **No backend? No problem.** The app ships with local mock data and falls back to it automatically when the backend is unreachable — great for UI-only development.

---

## 📡 API Reference

All endpoints return JSON. No authentication is required in the current build.

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users` | Register a new user |
| `GET` | `/users/{userId}` | Get user by ID |

### Vendors

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/vendors` | Register a vendor |
| `GET` | `/vendors/{vendorId}` | Get vendor profile |

### Service Listings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/services` | Create a service listing |
| `GET` | `/services/{serviceId}` | Get a listing |
| `GET` | `/services?city=X&category=Y` | Search by city and category |

### Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/bookings` | Create a booking |
| `GET` | `/bookings/{bookingId}` | Get booking details |
| `POST` | `/bookings/{bookingId}/confirm` | Confirm a booking |
| `POST` | `/bookings/{bookingId}/cancel` | Cancel a booking |

### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/payments` | Record a payment (advance or full) |

### Availability

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/availability` | Add an availability slot |
| `GET` | `/availability?vendorId=X` | Get slots for a vendor |

#### Example — create a booking

```bash
curl -X POST http://localhost:8080/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "user": { "userId": 1 },
    "serviceListing": { "serviceId": 1 },
    "servicePackage": { "packageId": 1 },
    "eventDate": "2025-12-15",
    "eventStart": "2025-12-15T14:00:00",
    "eventEnd": "2025-12-15T22:00:00",
    "totalAmount": 5000,
    "advanceAmount": 1500,
    "dueAmount": 3500
  }'
```

---

## 🗂 Project Structure

```
lets-celebrate/
├── src/                                       # Spring Boot backend
│   └── main/java/com/example/lets_celebrate/
│       ├── controller/                        # REST controllers
│       │   ├── BookingController.java
│       │   ├── ListingController.java
│       │   ├── PaymentController.java
│       │   ├── UserController.java
│       │   ├── VendorController.java
│       │   └── AvailabilityController.java
│       ├── entity/                            # JPA entities
│       │   ├── User.java
│       │   ├── Vendor.java
│       │   ├── ServiceListing.java
│       │   ├── ServiceCategory.java
│       │   ├── ServicePackage.java
│       │   ├── Booking.java                  # PENDING | CONFIRMED | CANCELLED
│       │   ├── Payment.java                  # ADVANCE | FULL
│       │   ├── Review.java
│       │   └── AvailabilitySlot.java
│       ├── repository/                        # Spring Data JPA repositories
│       ├── service/                           # Business logic layer
│       └── LetsCelebrateApplication.java
│
└── frontend/                                  # React Native (Expo) app
    ├── app/
    │   ├── (tabs)/
    │   │   ├── index.tsx                      # Home — category grid + top services
    │   │   ├── search.tsx                     # Search by category
    │   │   ├── explore.tsx                    # Discover vendors
    │   │   └── profile.tsx                    # User profile + logout
    │   ├── service/[id].tsx                   # Service detail page
    │   ├── vendor/[id].tsx                    # Vendor detail page
    │   ├── checkout.tsx                       # Cart + payment flow
    │   └── login.tsx                          # Auth screen
    ├── components/ui/                         # Button, Card, Input primitives
    ├── store/
    │   ├── authSlice.ts                       # Auth state (token, userId, role)
    │   ├── cartSlice.ts                       # Cart state
    │   └── index.ts
    ├── constants/
    │   ├── Colors.ts                          # Light/dark theme tokens
    │   └── theme.ts
    ├── hooks/
    │   └── use-color-scheme.ts
    └── api.ts                                 # Axios instance → backend
```

---

## 🗃 Data Model

```
app_user ──< bookings >── service_listing ──> vendor
                │               │
                │               └──> service_category
                │               └──< service_package
                │
                ├──< payment
                └──< review  (planned)

availability_slot >── vendor
```

| Entity | Key States / Types |
|---|---|
| `Booking` | `PENDING` → `CONFIRMED` or `CANCELLED` |
| `Payment` | type: `ADVANCE` or `FULL` · status: `SUCCESS` or `FAILED` |
| `Vendor` | verification: `PENDING` → `VERIFIED` |
| `ServiceListing` | pricing: `FIXED` or `QUOTE` |

---

## 🗺 Roadmap

- [x] Spring Boot REST API — users, vendors, listings, bookings, payments, availability
- [x] React Native mobile app — home, search, service/vendor detail, checkout
- [x] Redux state management — auth + cart
- [x] Light / dark mode
- [ ] JWT authentication & protected routes
- [ ] PostgreSQL support (production DB)
- [ ] Review and rating submission
- [ ] Push notifications — booking confirmations and reminders
- [ ] Vendor dashboard — booking calendar, earnings analytics
- [ ] Image upload for service listings
- [ ] Filter & sort on search results

---

## 🤝 Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change, then submit a pull request against `main`.

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push and open a PR

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
