<?php

use App\Models\Status;
use App\Models\StockGudang;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(StockGudang::class);
            $table->string('jumlah')->nullable()->default(0);
            $table->string('harga_satuan')->nullable()->default(0);
            $table->string('total')->nullable()->default(0);
            $table->foreignIdFor(Status::class)->nullable()->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
