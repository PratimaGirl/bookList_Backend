# Backend API

This is the backend service for the application, responsible for handling data processing, authentication, and API endpoints.

---

## **Setup Instructions**

### **1. Prerequisites**
Ensure the following are installed on your system:
- [Node.js](https://nodejs.org/) (version above 18 to 22)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### **2. Clone the Repository** 
```bash
git clone <repository-url>
cd <backend-folder>
```

### **3. Install Dependencies**
npm install

## **4. Set Environment Variables**
Create a .env file in the root directory:
```
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWTSECRET=<your-secret-key>
```

### **5. Run the Application**
```
node index.js
or
nodemon index.js
```

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

### **7. Vercel Deployment **
Both frontend and backend are deployed on Vercel from the different repository. When deploying on Vercel, for frontend vercel-link: [https://book-list-frontend-theta.vercel.app/]

### ***8. Github Repository **
Frontend Repository: [https://github.com/PratimaGirl/bookList_Frontend]
