<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ToolResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_alat' => $this->nama_alat,
            'keterangan' => $this->keterangan,
            'image' => $this->image,
            'tanggal_masuk' => $this->tanggal_masuk,
            'harga_satuan' => $this->harga_satuan,
        ];
    }
}
