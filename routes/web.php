<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleBookingController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [HomeController::class, 'index'])->middleware(['auth'])->name('home');

Route::get('/booking', [VehicleBookingController::class, 'index'])->middleware(['auth'])->name('index-booking');

Route::get('/booking/{idVehicle}', [VehicleBookingController::class, 'create'])->middleware(['auth', 'role:admin'])->name('create-booking');

Route::post('/booking/{idVehicle}', [VehicleBookingController::class, 'store'])->middleware(['auth', 'role:admin'])->name('store-booking');

Route::patch('/booking/approval/{idBooking}', [VehicleBookingController::class, 'approvalBooking'])->middleware(['auth', 'role:approver'])->name('approval-booking');


Route::get('/booking/return/{idBooking}', [VehicleBookingController::class, 'edit'])->middleware(['auth', 'role:admin'])->name('return-booking');

Route::patch('/booking/return/{idBooking}', [VehicleBookingController::class, 'update'])->middleware(['auth', 'role:admin'])->name('update-booking');

Route::get('/users', [HomeController::class, 'users'])->middleware(['auth', 'role:admin'])->name('users');

Route::patch('/users/role/update/{userId}', [HomeController::class, 'updateRole'])->middleware(['auth', 'role:admin'])->name('update-user-role');

Route::resource('vehicle', VehicleController::class)->middleware(['auth', 'role:admin']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
