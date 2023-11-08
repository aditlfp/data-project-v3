<?php

namespace App\Http\Controllers;

use App\Http\Requests\BarangRequest;
use App\Http\Resources\BarangResource;
use App\Models\Barang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BarangController extends Controller
{
    public function index(Request $request)
    {
        $barang = DB::table('barangs')->when($request->search, function ($query, $search){
            $query->where('nama_barang', 'LIKE', '%' . $search . '%');
        })->paginate(50);
        return BarangResource::collection($barang);
    }

    public function store(BarangRequest $request)
    {  
        $barang = new Barang();
        $barang = $request->all();

        if($request->hasFile('image'))
        {
            $barang['image'] = UploadImage($request, 'image');
        }
            Barang::create($barang);
            return response()->json(['data' => $barang, 'message' => 'Barang Has Created', 'status' => true], 200,);
    } 

    public function show($id)
    {
        try {
            $barang = Barang::findOrFail($id);
            return new BarangResource($barang);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function edit($id)
    {
       try {
        $barang = Barang::findOrFail($id);
        return new BarangResource($barang);
       } catch (\Throwable $th) {
        throw $th;
       }
    }

    public function update(Request $request, $id)
    {

        $barang = [
            'nama_barang' => $request->nama_barang,
            'keterangan' => $request->keterangan,
            'image' => $request->image,
            'tanggal_masuk' => $request->tanggal_masuk,
            'harga_satuan' => $request->harga_satuan,
        ];

        if($request->hasFile('image'))
        {
            if($request->oldimage)
            {
                Storage::disk('public')->delete('images/' . $request->oldimage);
            }
            $barang['image'] = UploadImage($request, 'image');
        }else{
            $barang['image'] = $request->oldimage;
        }
            $barangId = Barang::findOrFail($id);
            $barangId->update($barang);
            return response()->json($barang,200);

    }

    public function updateV2(Request $request, $id){
        $barang = [
            'nama_barang' => $request->nama_barang,
            'keterangan' => $request->keterangan,
            'image' => $request->image,
            'tanggal_masuk' => $request->tanggal_masuk,
            'harga_satuan' => $request->harga_satuan,
        ];

        if($request->hasFile('image'))
        {
            if($request->oldimage)
            {
                Storage::disk('public')->delete('images/' . $request->oldimage);
            }
            $barang['image'] = UploadImage($request, 'image');
        }

        try {
            $barangId = Barang::findOrFail($id)->update($barang);
            return response()->json(['data' => $barangId, 'message' => 'Order Has Updated', 'status' => true], 200,);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json($e, 400);
        }

    }

    public function destroy($id)
    {
        try {
            $barang = Barang::findOrFail($id);
            if ($barang->image) {
                Storage::disk('public')->delete('images/'.$barang->image);
            }
            $barang->delete();
            return response()->json(['data' => $barang, 'message' => 'Barang Was Deleted'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
