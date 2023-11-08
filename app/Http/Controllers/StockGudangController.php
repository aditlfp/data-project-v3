<?php

namespace App\Http\Controllers;

use App\Http\Resources\StockgudangResource;
use App\Models\Barang;
use App\Models\StockGudang;
use Illuminate\Http\Request;

class StockGudangController extends Controller
{
    public function index(Request $request)
    {
        $gudang = StockGudang::whereHas('Barang', function ($query) use ($request) {
            $query->where('nama_barang', 'LIKE', '%' . $request->search . '%');
        })->paginate(50);
        
        return StockgudangResource::collection($gudang);
        // return response()->json($gudang, 200);
    }

    public function storeAdv(Request $request, $id)
    {
        $barang = Barang::findOrFail($id);
        $stockGudang = new StockGudang();
        $stockGudang = [
            "barang_id" => $barang->id,
        ];

        StockGudang::create($stockGudang);
        return response()->json(["data" => $stockGudang, "message" => "success"], 200);
    }

    public function update(Request $request, $id)
    {
        $stockGudang = [
            'qty' => $request->qty,
        ];
        
        $gudangId = StockGudang::findOrFail($id);
        $gudangId->update($stockGudang);
        return response()->json(["data" => $stockGudang, "message" => "success"], 200);
    }

    public function destroy($id){
        $stockGudang = StockGudang::findOrFail($id);
        $stockGudang->delete();
        return new StockGudangResource($stockGudang);
    }
}
