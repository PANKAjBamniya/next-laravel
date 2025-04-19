<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Preference extends Model
{
    protected $fillable = ['user_id', 'stock_id', 'sma_periods', 'rsi_threshold', 'price_limit', 'volume_limit'];
}
