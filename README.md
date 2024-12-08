
# Wheels On Demand

**Wheels On Demand** is a vehicle rental application developed using **Spring Boot** for the backend microservices, **Angular** for the client-side frontend, and **React** for the admin dashboard. The project provides a comprehensive platform for managing vehicle rentals, with various features including user management, vehicle management, feedback management, coupon management, and vendor management.

## Features

- **User Management**: Allows the system admin to manage users, track rentals, and update user profiles.
- **Vehicle Management**: Admins can add, update, and remove vehicles. Users can view available vehicles and book them.
- **Feedback Management**: Collect and manage user feedback for continuous improvement of services.
- **Coupon Management**: Create, manage, and apply discount coupons for users.
- **Vendor Management**: Manage vendors who provide the vehicles for rent.

## Architecture

This project is structured as a **microservices architecture** using **Spring Boot**. Each feature is implemented as a separate service to ensure scalability and flexibility.

- **Backend**: 
  - Spring Boot Microservices for the core functionality, including vehicle and user management.
  - RESTful APIs are exposed to interact with the client-side and admin dashboards.

- **Frontend**: 
  - **Client-side** is built with **Angular**, offering a responsive user interface for vehicle rentals.
  - **Admin Dashboard** is built using **React**, providing admins with easy-to-use tools for managing vehicles, users, and other features.

## Tech Stack

- **Backend**: 
  - Spring Boot
  - Spring Cloud (for microservices architecture)
  - JPA / Hibernate (Database management)
  - MySQL (Database)

- **Frontend**:
  - Angular (Client-side UI)
  - React (Admin Dashboard)

- **Other Tools**:
  - JWT for Authentication
  - Docker for containerization

## Installation

### Prerequisites

- Java 17 or higher
- Node.js (for Angular and React)
- MySQL Database
- Maven (for Spring Boot)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/dsvasudev19/vehicle-rental-system-microservices.git
   ```
   
2. Navigate to the backend directory:
   ```bash
   cd vehicle-rentals-microservices
   ```

3. Install the dependencies:
   ```bash
   mvn clean install
   ```

4. Configure the database connection in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/wheels_on_demand
   spring.datasource.username=root
   spring.datasource.password=password
   ```

5. Start the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup

1. Navigate to the Angular frontend directory:
   ```bash
   cd onthego
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the Angular application:
   ```bash
   ng serve
   ```

4. Navigate to the React admin dashboard directory:
   ```bash
   cd react-admin-dashboard
   ```

5. Install the dependencies:
   ```bash
   npm install
   ```

6. Start the React application:
   ```bash
   npm start
   ```

### Access the Application

- The Angular frontend (user side) will be available at `http://localhost:4200`.
- The React admin dashboard will be available at `http://localhost:5173`.

## Screenshots

Below are some screenshots of the application:


### Vendor Management
![Vendor Management](https://res.cloudinary.com/dxqrg09mq/image/upload/v1733640981/screencapture-localhost-5173-dashboard-vendors-2024-10-29-16_10_13_lyftzr.png)

#### Coupon Management
![Coupon Management](https://res.cloudinary.com/dxqrg09mq/image/upload/v1733584370/screencapture-localhost-5173-dashboard-coupons-2024-10-29-16_11_53_e4nugk.png)


---

### Client-Side Features

#### Vehicle Listing
![Vehicle Listing](https://res.cloudinary.com/dxqrg09mq/image/upload/v1733584848/screencapture-localhost-4202-vehicle-listing-2024-10-29-15_56_04_vtvn0r.png)

#### Vehicle Booking
![Vehicle Booking](https://res.cloudinary.com/dxqrg09mq/image/upload/v1733584442/vehicle-rental_xfqjqm.png)

#### Vehicle Details Page
![Vehicle Details](https://res.cloudinary.com/dxqrg09mq/image/upload/v1733584850/screencapture-localhost-4202-vehicle-details-53-2024-10-29-15_56_19_wsaccu.png)


## Contributing

We welcome contributions to improve the **Wheels On Demand** project. To contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes and push the branch.
4. Submit a pull request with a description of your changes.

## Contact

If you have any questions or suggestions, feel free to reach out at [vasudevds1729@gmail.com].

---
