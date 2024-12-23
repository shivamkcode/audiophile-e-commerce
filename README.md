# Audiophile Ecommerce Website

Welcome to the audiophile Ecommerce Website! 

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Deployed Site](#deployed-site)

## Project Overview

This is a full-stack ecommerce website built using Next.js, TypeScript, Tailwind CSS and uses Sequelize with PostgreSQL as database. The website allows users to browse and purchase headphones, speakers, and TWS earphones. Users can create an account, add products to their cart, fill out a checkout form, and receive a confirmation on the thank you page.

## Features

- **User authentication**: Users can create an account and log in and make purchases.
- **Product catalog**: Users can browse a catalog of headphones, speakers, and TWS earphones.
- **Cart management**: Users can add products to their cart, update quantities, and remove items.
- **Checkout process**: Users can fill out a form with their shipping and payment information to complete their purchase.
- **Order confirmation**: After completing the checkout process, users receive a thank you page confirming their order. 

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and static websites.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for quickly building custom user interfaces.
- **Sequelize**: It is a modern TypeScript and Node.js ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, and more.

## Installation

To run the website locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/shivamkcode/audiophile-e-commerce
   cd audiophile-e-commerce
   ```

2. Install Dependencies:

   ``` bash
   npm Install
   ```

3. Run the development server:

   ``` bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`



## Folder Structure

- `/app`: Contains the Next.js pages and api for the website.
- `/app/api`: Contains serverless functions or API endpoints.
- `/components`: Contains reusable components used across the website.
- `/config`: Contains the connection and authorization using sequelize to connect to db.
- `/models`: Contains models for User and the Cart and exports them.
- `/public`: Contains all the assets(logo and images) placed according to each page used in the website.

## Screenshots

### Homepage

![Homepage](https://res.cloudinary.com/ddmxmmot6/image/upload/v1734921275/audiophile-e-commerce-three.vercel.app__dkoi5x.png)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Shivam kumar - [shivambaniya12@gmail.com](mailto:ShivamBaniya12@gmail.com)

Project Link: [https://github.com/shivamkcode/audiophile-e-commerce](https://github.com/shivamkcode/audiophile-e-commerce )

## Deployed Site

The Audiophile Ecommerce website is live! You can explore the features and services provided by visiting the deployed site at:

[https://audiophile-e-commerce-three.vercel.app/](https://audiophile-e-commerce-three.vercel.app/)