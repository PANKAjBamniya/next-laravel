<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Stock;
use App\Services\StockService;
use Illuminate\Http\Request;

class StockController extends Controller
{
    // GET /api/stocks
    public function index()
    {
        return response()->json(Stock::latest()->get());
    }

    // GET /api/stocks/{symbol}
    public function show($symbol)
    {
        $stock = Stock::where('symbol', $symbol)->orderBy('date', 'desc')->get();

        if ($stock->isEmpty()) {
            return response()->json(['message' => 'Stock not found'], 404);
        }

        return response()->json($stock);
    }

    // POST /api/stocks/import
    public function import(StockService $stockService)
    {
        $success = $stockService->fetchAndStore();
        return response()->json(['success' => $success]);
    }
}
