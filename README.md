# concreteAI-be-assignment

## Overview

ConcreteAI BE Assignment is a backend service built with Node.js, Fastify, and Prisma ORM. This service manages user accounts, payment accounts, and transactions. It includes features for user registration, login, creating payment accounts, and performing transactions such as sending and withdrawing funds.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Docker](#docker)
- [License](#license)

## Features

- **User Management**
  - Register a new user
  - Login with username and password
- **Payment Account Management**
  - Create a payment account (debit, credit, etc.)
- **Transaction Management**
  - Send funds
  - Withdraw funds

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/renggamaulana/concreteai-be-assignment.git
   cd concreteai-be-assignment
   ```
2. **Install dependencies** 
    ```npm install```

3. **Set up environment variables:**    
    ```
    DATABASE_URL="mysql://root@localhost:3306/concretedb"  # or PostgreSQL URL for production
    JWT_SECRET="your_jwt_secret"
    ```

4. **Run migrations:**
    ``` npx prisma migrate dev --name migration_name```

5. **Start the application:**
    ``` npm run dev ```

## Docker
To build and run the application using Docker, follow these steps:

```
- docker-compose up --build
- docker-compose up -d

```

### Endpoint list

**Account Manager** 

[POST] localhost:3000/register : user register <br>
[POST] localhost:3000/login : user login

**Payment Manager**

[POST] localhost:3000/payment/send : Send <br>
[POST] localhost:3000/payment/withdraw : Withdraw <br>
[GET] localhost:3000/payment/transaction/{accountID} : View data by accountID