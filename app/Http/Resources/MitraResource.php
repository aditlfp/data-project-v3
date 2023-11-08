<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MitraResource extends JsonResource
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
            'name' => $this->name,
            'address' => $this->address,
            'province' => $this->province,
            'kabupaten' => $this->kabupaten,
            'zipcode' => $this->zipcode,
            'email' => $this->email,
            'phone' => $this->phone,
            'fax' => $this->fax,
            'logo' => $this->logo,
        ];
    }
}
