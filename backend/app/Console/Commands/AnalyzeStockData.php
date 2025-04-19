<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Stock;
use App\Models\Alert;
use App\Models\Preference;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\AlertMail;

class AnalyzeStockData extends Command
{
    protected $signature = 'stocks:analyze';
    protected $description = 'Analyze stock data and send alerts';

    public function handle()
    {
        $stocks = Stock::all();
        foreach ($stocks as $stock) {
            $priceData = [100, 102, 98, 105, 99, 100, 103]; // Simulated data
            $rsi = 100 - (100 / (1 + (array_sum(array_slice($priceData, -3)) / array_sum(array_slice($priceData, 0, 3)))));

            $preferences = Preference::where('stock_id', $stock->id)->get();
            foreach ($preferences as $pref) {
                if ($rsi > $pref->rsi_threshold) {
                    Alert::create([
                        'user_id' => $pref->user_id,
                        'stock_id' => $stock->id,
                        'type' => 'RSI',
                        'value' => $rsi,
                        'triggered_at' => now(),
                    ]);

                    $user = User::find($pref->user_id);
                    Mail::to($user->email)->send(new AlertMail($stock, 'RSI', $rsi));
                }
            }
        }
    }
}
