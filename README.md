### FinSmart- Investment Advisor

### 🧩 Project Overview

Managing money and planning investments can often be confusing — especially for students, beginners, or anyone new to the financial world. There are too many options such as gold, stocks, real estate, crypto, and savings accounts, and it becomes difficult to decide where and how to invest.

**Smart Financial Aid & Investment Advisor** is a web-based platform that helps users make better and safer investment decisions.
It provides **personalized guidance** based on the user’s **budget**, **risk level**, and **investment duration**. The system then suggests how the user can divide their money into different investment options for balanced and effective financial growth.

Our goal is to make investment planning **simple, understandable, and accessible for everyone.**


### Objectives
* To guide users in making smart investment decisions.
* To simplify the comparison between multiple investment categories.
* To promote financial literacy and responsible saving habits.
* To support sustainable economic growth by encouraging digital financial management.

---

### ⚙️ Technology Stack

#### **Frontend**
* **Next.js (React Framework)** – for project structure, routing, and rendering.
* **TypeScript** – to add type safety and reduce runtime errors.
* **Tailwind CSS** – for modern, responsive, and reusable UI components.

#### **Backend & Database**
* **Firebase Authentication** – for secure login, signup, and session handling.
* **Firebase Firestore (NoSQL Database)** – to store user data, investment inputs, and portfolio recommendations.

---

### 🧭 How It Works
1. **User Input:**
   The user enters their **budget**, selects a **risk level** (low, medium, or high), and defines their **investment duration** (short-term, mid-term, long-term).
2. **System Processing:**
   Based on these inputs, the system calculates suitable investment allocations among various options such as **gold, stocks, crypto, real estate,** and **savings**.
3. **Result & Insights:**
   The output section displays a **portfolio summary** showing how much percentage of the total budget should go to each investment option.
   Users can view their **allocation chart** and insights for better understanding.

---

### 📊 Investment Strategies
1. **Risk-Based Allocation Strategy**
   * Users choose their risk level (Low, Medium, High).
   * The system adjusts allocation percentages automatically based on the selected risk level.
   * Example:

     * Low Risk → More in savings and gold.
     * Medium Risk → Balanced among stocks and real estate.
     * High Risk → Higher share in crypto and stocks.

2. **Time-Based Strategy**
   * Investments are also planned according to how long the user wants to invest.
   * Example: Short-term → safer options like gold/savings; Long-term → growth assets like stocks/real estate.

3. **Goal-Oriented Strategy (Optional Extension)**
   * In the future, users will be able to enter a financial goal (e.g., buying a car, saving for education), and the system will recommend how much they should invest each month to reach that goal.


### 🌍 How Our Project Supports SDGs

**SDG 1 – No Poverty**
* Encourages financial awareness and stability by helping users manage their savings and investments responsibly.

**SDG 8 – Decent Work and Economic Growth**
* Promotes financial literacy and responsible investing habits, which support individual and community-level economic growth.

**SDG 9 – Industry, Innovation, and Infrastructure**
* Uses modern web technologies to build a digital financial platform that simplifies personal investment planning.

### 🚀 Features

* User Registration & Login (Firebase Authentication)
* Budget Input Form with Validation
* Personalized Investment Recommendations
* Portfolio Allocation Chart
* Real-time Data Storage in Firestore
* Responsive UI built with Tailwind CSS
* Easy to use and beginner-friendly interface

---

### 🧑‍💻 Installation & Setup

**Step 1:** Clone the repository
```bash
git clone https://github.com/Zobiya-Jumani21/Financial_Advisor_Hackathon_Project.git
```

**Step 2:** Navigate to the project directory
```bash
cd Financial_Advisor_Hackathon_Project
```

**Step 3:** Install dependencies
```bash
npm install
```

**Step 4:** Create a Firebase project and configure the credentials
* Add your Firebase config in a `.env.local` file.
* Enable Authentication and Firestore Database.

**Step 5:** Run the development server
```bash
npm run dev
```

**Step 6:** Open your browser and visit
```
http://localhost:3000

### 🧩 Project Structure

```
📂 Financial_Advisor_Hackathon_Project
 ┣ 📂 app               # Main Next.js app routes and pages
 ┣ 📂 components        # Reusable UI components (forms, navbar, charts)
 ┣ 📂 hooks             # Custom React hooks for data handling
 ┣ 📂 lib               # Utility and logic functions (calculations, helpers)
 ┣ 📂 public            # Static assets (images, icons, logos)
 ┣ 📂 styles            # Tailwind and global CSS files
 ┣ 📜 next.config.mjs   # Next.js configuration
 ┣ 📜 tsconfig.json     # TypeScript configuration
 ┗ 📜 README.md         # Project documentation

###Current Progress
* ✅ Frontend UI (Next.js + Tailwind CSS)
* ✅ Firebase Authentication & Firestore setup
* ✅ Investment allocation logic implemented


Future Enhancements

* Add goal-based investment planning.
* Include portfolio tracking and performance charts.
* Provide real-time market updates and recommendations.
* Create a mobile-friendly version of the app also.

Team Members
* **Mubeen (21SW040)**
* **Zobiya (21SW140)**
* **Rameesa (21SW149)**
* **Irfan (21SW065)**

Acknowledgment
This project was developed as part of a **Hackathon Challenge** to promote financial literacy and encourage smart investment habits among individuals using digital solutions.

