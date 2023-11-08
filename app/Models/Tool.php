<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tool extends Model
{
    use HasFactory;

    protected $fillable = ['nama_alat', 'keterangan', 'image', 'tanggal_masuk', 'harga_satuan'];
}
