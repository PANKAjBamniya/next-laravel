<?php

namespace App\Services;

use App\Models\Stock;
use Illuminate\Support\Facades\Http;

class StockService
{
    public function fetchAndStore()
    {
        $url = "https://api.marketstack.com/v1/eod";
        $access_key = "c25a73e642e47450620f63f9b47e59ab";
        $symbols = "AAPL,MSFT,TSLA";

        $response = Http::get($url, [
            'access_key' => $access_key,
            'symbols' => $symbols
        ]);

        if ($response->successful()) {
            $data = $response->json()['data'];

            foreach ($data as $item) {
                Stock::updateOrCreate(
                    [
                        'symbol' => $item['symbol'],
                        'date' => $item['date'],
                    ],
                    [
                        'close' => $item['close'],
                        'name' => $item['symbol'],
                    ]
                );
            }

            return true;
        }

        return false;
    }
}
