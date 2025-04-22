<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWatchlistsTable extends Migration
{
    public function up()
    {
        Schema::create('watchlists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(); // Assuming you have a User model
            $table->string('stock_symbol');
            $table->timestamps();

            $table->unique(['user_id', 'stock_symbol']); // Ensure each user can only have a stock symbol once
        });
    }

    public function down()
    {
        Schema::dropIfExists('watchlists');
    }
}
