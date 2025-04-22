<?php

namespace App\Services;

use App\Models\Watchlist;

class WatchlistService
{
    public function addToWatchlist($userId, $stockSymbol)
    {
        if (Watchlist::where('user_id', $userId)->where('stock_symbol', $stockSymbol)->exists()) {
            return false; // Stock already in watchlist
        }

        Watchlist::create([
            'user_id' => $userId,
            'stock_symbol' => $stockSymbol,
        ]);

        return true;
    }
}
