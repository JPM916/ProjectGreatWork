<?php

use App\Http\Controllers\ReservationController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->middleware('guest')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard Route
    Route::get('dashboard', function () {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        switch ($user->role) {
            case 'admin':
                return Inertia::render('Admin/dashboard');
            case 'user':
                return Inertia::render('Customer/dashboard');
            default:
                abort(403, 'Unauthorized role');
        }
    })->name('dashboard');

    // Reservations Routes
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
    Route::resource('reservations', ReservationController::class)->except('index');

    // Ticket Routes
    Route::get('/ticket', [TicketController::class, 'index'])->name('ticket.index');
    Route::resource('ticket', TicketController::class)->except('index');

    // ✅ Fixed route for updating ticket status
    Route::patch('/admin/tickets/{ticket}/status', [TicketController::class, 'updateStatus']);

    // Calendar Routes
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar.index');
    Route::resource('calendar', CalendarController::class)->except('index');

    // Logs Routes
    Route::get('/logs', [LogController::class, 'index'])->name('log.index');
    Route::resource('logs', LogController::class)->except('index');

    // Payment Routes
    Route::get('/payment', [PaymentController::class, 'index'])->name('payment.index');
    Route::resource('payment', PaymentController::class)->except('index');

    // User Management
    Route::get('/user', fn () => Inertia::render('Admin/User/Index'))->name('user.index');
});

// Settings Pages
Route::prefix('settings')->group(function () {
    Route::get('profile', fn () => Inertia::render('Settings/Profile'));
    Route::get('password', fn () => Inertia::render('Settings/Password'));
    Route::get('appearance', fn () => Inertia::render('Settings/Appearance'));
});

// External route files
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
