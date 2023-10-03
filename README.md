<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

## Technology In Projects

-   **[Laravel 10.10](https://laravel.com/docs/10.x)** | **[Sanctum 3.2](https://laravel.com/docs/10.x/sanctum)** | **[Ziggy 1.0](https://github.com/tighten/ziggy)** | **[Breeze 1.24](https://laravel.com/docs/10.x/starter-kits#breeze)**
-   **[PHP 8.1.10](https://www.php.net/releases/8.1/en.php)** | **[Composer 2.4.4](https://getcomposer.org/)** | **[MySQL 8.0.30](https://www.mysql.com/)**
-   **[Windows 11](https://www.microsoft.com/software-download/windows11)**

-   **[NPM 9.5.0](https://www.npmjs.com/)** | **[Node v18.15.0](https://nodejs.org/en/)** | **[InertiaJS 1.0.0](https://inertiajs.com/)**

-   **[React 18.2.0](https://reactjs.org/)** | **[Axios 1.1.2](https://github.com/axios/axios)** | **[Vite 4.0.0](https://vitejs.dev/)**
-   **[TailwindCSS 3.2.1](https://tailwindcss.com/)** | **[Material UI 5.14.11](https://mui.com/)**

## Installation

### Clone Repository

```bash
git clone https://github.com/Bima1301/OrderWheels.git
```

### Install Dependencies

```bash
composer install
npm install
```

### Create .env file

```bash
cp .env.example .env
```

### Generate Application Key

```bash
php artisan key:generate
```

### Create Database

Create database with name `order-wheel` and then run this command to migrate database

```bash
php artisan migrate
```

### Seeding Database

```bash
php artisan db:seed
```

### Create Storage Link

```bash
php artisan storage:link
```

### Run Project

```bash
php artisan serve
npm run dev
```

### User Access

Just have one admin and one approver, you can create new user and assign role to them in admin page

#### Admin

```bash
Email : admin@gmail.com
Password : password
```

#### Approver

```bash
Email : approver@gmail.com
Password : password
```

### ER Diagram

![alt text](/Documentation/ER%20Diagram.png)

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
