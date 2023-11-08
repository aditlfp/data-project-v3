<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockGudang extends Model
{
    use HasFactory;

    protected $fillable = [
        'barang_id',
        'qty',
        'deskripsi'
    ];

    public function Barang(){
        return $this->belongsTo(Barang::class);
    }
}
