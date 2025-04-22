<?php

use App\Http\Controllers\Api\StockController;
use App\Http\Controllers\Api\WatchlistController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::middleware(['jwt.auth'])->get('/me', [AuthController::class, 'me']);




Route::prefix('stocks')->group(function () {
    Route::get('/', [StockController::class, 'index']); // List stocks
    Route::get('{symbol}', [StockController::class, 'show']); // Stock details
    Route::post('import', [StockController::class, 'import']); // Import from API
});



Route::middleware('auth:api')->group(function () {
    Route::get('/watchlist', [WatchlistController::class, 'index']);
    Route::post('/watchlist', [WatchlistController::class, 'store']);
    Route::delete('/watchlist/{symbol}', [WatchlistController::class, 'destroy']);
});
