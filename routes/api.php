<?php

use App\Http\Controllers\BarangController;
use App\Http\Controllers\MasterController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\StockGudangController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('sanctum/csrf', [CsrfCookieController::class, 'show']);

Route::middleware('auth')->group(function() {
    Route::get('/user', [UserController::class, 'index'])->name('user.index');

});


Route::middleware(['auth', 'admin'])->group(function(){
    Route::patch('/approve/{id}', [MasterController::class, 'approve'])->name('approve');
    Route::patch('/cancelled/{id}', [MasterController::class, 'cancelled'])->name('cancelled');
    Route::resource('/status', StatusController::class);
    Route::resource('/barang', BarangController::class);
    Route::resource('/gudang', StockGudangController::class);
    Route::post('/gudang-v2/{id}', [StockGudangController::class, 'storeAdv'])->name('gudang-v2');

});

require __DIR__.'/auth.php';

