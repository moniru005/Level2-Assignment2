# Level2 Assignment2

This is an E-commerce application API built with TypeScript, Express, and Mongoose, and deployed on Vercel.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)
- MongoDB (local or remote instance)

### Installation

1. **Clone the repository:**

```sh
git clone https://github.com/moniru005/level2-assignment2.git
cd level2-assignment2
```

### Installation dependencies:

```sh
npm install
"cors": "^2.8.5",
"dotenv": "^16.4.5",
"express": "^4.19.2",
"mongoose": "^8.4.1",
"zod": "^3.23.8"
```

### Environment Variables:

```sh
NODE_ENV= development
PORT = 5000
DATABASE_URL = MONGODB_URI=mongodb://localhost:27017/yourdbname
PORT=5000
```

Replace mongodb://localhost:27017/yourdbname with your actual MongoDB connection string.

## API Endpoints

### Create a product

- Endpoint: /api/products
- Method: POST

### Search for products

- Endpoint: /api/products?searchTerm=iphone
- Method: GET

### Get all orders

- Endpoint: /api/orders
- Method: GET

### Retrieve orders by user email

- Endpoint: /api/orders?email=level2@programming-hero.com
- Method: GET

## Error Handling

#### Insufficient Quantity Error

```sh
{
  "success": false,
  "message": "Insufficient quantity available in inventory"
}
```

#### Order Not Found Error

```sh
{
  "success": false,
  "message": "Order not found"
}
```

#### Route Not Found Error

```sh
{
  "success": false,
  "message": "Route not found"
}
```

## Deployment

### Deploying on Vercel:

Ensure you have the Vercel CLI installed and configured. Run the following commands to deploy:

```sh
vercel
```

Follow the prompts to deploy the application. The Vercel configuration will handle routing and deployment.

## Acknowledgments

- Express
- Mongoose
- TypeScript
- Zod

### Summary

This `README.md` file provides detailed instructions on how to set up and run the project locally, along with descriptions of the API endpoints, error handling, and deployment steps. Customize the URLs, repository links, and other specifics to match your actual project details.
