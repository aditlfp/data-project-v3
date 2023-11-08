<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
           "id" => $this->id,
           "stock_gudang_id	" => $this->stock_gudang_id	,
           "jumlah" => $this->jumlah,
           "harga_satuan" => $this->harga_satuan,
           "total" => $this->total,
           "status" => $this->status,
           "stockGudang" => $this->stockGudang,
        ];
    }
}
