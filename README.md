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

[POST] localhost:3000/transactions/send : Send <br>
[POST] localhost:3000/transactions/withdraw : Withdraw <br>
[GET] localhost:3000/transactions/{accountID} : View data by accountID

## Endpoint Details

### [POST]/register
#### RequestBody
```
{
  "username": "noah",
  "password": "password123",
  "balance": 3000
}
```

### Response
`application/json`

```
{
  "user": {
    "id": 2,
    "username": "noah",
    "password": "$argon2id$v=19$m=65536,t=3,p=4$G5jCPGunu02NcKQK5b10Cg$88XD2quNNcl2UKDcu7panKsfrnM4woefVaMMe3HJxTg",
    "createdAt": "2024-08-20T09:38:14.870Z"
  },
  "paymentAccount": {
    "id": 2,
    "userId": 2,
    "type": "Debit",
    "balance": 3000,
    "createdAt": "2024-08-20T09:38:14.873Z"
  }
}
```

### [POST]/login
#### RequestBody
```
{
  "username": "noah",
  "password": "password123"
}
```

### Response
`application/json`

```
{
  "message": "Succesfully logged in!",
  "account": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJub2FoIiwiaWF0IjoxNzI0MTQ4MjY1LCJleHAiOjE3MjQxNTE4NjV9.jAJVnRotipXeRzN1lMu6DogW1f35blgkd0rfM7VcAjc"
  }
}
```

### [POST]/account
#### RequestBody
```
{
  "type": "Credit",
  "balance": 1000
}

```

### Response
`application/json`

```
{
  "message": "Account created successfully",
  "account": {
    "id": 3,
    "userId": 1,
    "type": "Credit",
    "balance": 1000,
    "createdAt": "2024-08-20T09:39:02.941Z"
  }
}

```

### [POST]/transactions/send
#### RequestBody
```
{
  "amount": 120,
  "toAccountId": 2
}

```

### Response
`application/json`

```
{
  "message": "Transaction successful",
  "payment": {
    "id": 1,
    "amount": 120,
    "paymentAccountId": 1,
    "type": "Send",
    "status": "Pending",
    "toAccountId": 2,
    "createdAt": "2024-08-20T09:44:28.964Z"
  }
}

```

### [POST]/transactions/withdraw

### Response
`application/json`

```
{
  "amount": 200
}
```

```
{
"message": "Withdrawal successful",
"widthdrawal": {
  "id": 3,
  "amount": 200,
  "paymentAccountId": 3,
  "timestamp": "2024-08-20T09:23:08.512Z",
  "type": "Withdraw",
  "toAccountId": 3,
  "status": "Pending",
  "createdAt": "2024-08-20T09:23:08.512Z"
}

```

### [GET]/transactions/:accountId

### Response
`application/json`

```
  {
    "id": 1,
    "amount": 120,
    "paymentAccountId": 1,
    "type": "Send",
    "status": "Pending",
    "toAccountId": 2,
    "createdAt": "2024-08-20T09:44:28.964Z"
  }

```

### [GET]/transactions

### Response
`application/json`

```
 [
  {
    "id": 2,
    "amount": 120,
    "paymentAccountId": 1,
    "timestamp": "2024-08-20T09:21:16.543Z",
    "type": "Send",
    "toAccountId": 2,
    "status": "Pending",
    "createdAt": "2024-08-20T09:21:16.543Z"
  },
  {
    "id": 3,
    "amount": 200,
    "paymentAccountId": 3,
    "timestamp": "2024-08-20T09:23:08.512Z",
    "type": "Withdraw",
    "toAccountId": 3,
    "status": "Pending",
    "createdAt": "2024-08-20T09:23:08.512Z"
  }
]

```
