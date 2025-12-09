# Subscription Backend (In-Memory Test API)

This is a small Node.js + Express subscription system built for a test task.  
The goal is to demonstrate clean code structure, separation of concerns, and a simple in-memory service layer.

## 🚀 Features
- Create a subscription with a default video balance (e.g., 5 videos)
- Retrieve a user’s current video balance
- Consume a video (balance - 1)
- Prevent consumption when balance is zero
- Fully in-memory (no database)
- Logic isolated in a dedicated **Service Layer**

## 📦 Endpoints
### **1. Create Subscription**
`POST /subscriptions`  
Body:
```json
{ "userId": "user-123" }
```

### **2. Get Balance**
`GET /subscriptions/:userId/balance`

### **3. Consume Video**
`POST /subscriptions/:userId/consume`

## 🧩 Project Structure
```
src/
  server.js
  subscriptionRoutes.js
  subscriptionService.js
```

## ▶️ Running the Project
```bash
npm install
npm run dev
```

## 📌 Notes
- All data is stored in memory and resets when the server restarts.
- Focus is on code organization rather than full production implementation.
