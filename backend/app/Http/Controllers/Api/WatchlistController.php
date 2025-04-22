<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Watchlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WatchlistController extends Controller
{
    // Get all stocks in a user's watchlist
    public function index()
    {
        $watchlist = Watchlist::where('user_id', Auth::id())->get();
        return response()->json($watchlist);
    }

    // Add a stock to the watchlist
    public function store(Request $request)
    {
        $request->validate([
            'stock_symbol' => 'required|string|max:10',
        ]);

        $watchlist = Watchlist::create([
            'user_id' => Auth::id(),
            'stock_symbol' => $request->stock_symbol,
        ]);

        return response()->json($watchlist, 201);
    }

    // Remove a stock from the watchlist
    public function destroy($symbol)
    {
        $watchlist = Watchlist::where('user_id', Auth::id())->where('stock_symbol', $symbol)->first();

        if (!$watchlist) {
            return response()->json(['message' => 'Stock not found in watchlist'], 404);
        }

        $watchlist->delete();

        return response()->json(['message' => 'Stock removed from watchlist']);
    }
}
