<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"    => $this->id,
            "name"  => $this->name,
            "email" => $this->email,
            "role_id" => $this->role_id,
            "mitra_id" => $this->mitra_id,
            "role" => $this->role,
            "mitra" => $this->mitra,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
