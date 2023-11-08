<?php

namespace App\Http\Controllers;

use App\Http\Requests\ToolRequest;
use App\Http\Resources\ToolResource;
use App\Models\Tool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ToolController extends Controller
{
    public function index(Request $request)
    {
        $barang = Tool::when($request->search, function ($query, $search){
            $query->where('nama_tool', 'LIKE', '%' . $search . '%');
        })->paginate(50);
        return ToolResource::collection($barang);
    }

    public function store(ToolRequest $request)
    {  
        $barang = new Tool();

        $barang = [
            'nama_tool' => $request->nama_tool,
            'keterangan' => $request->keterangan,
            'image' => $request->image,
            'tanggal_masuk' => $request->tanggal_masuk,
            'harga_satuan' => $request->harga_satuan,
        ];

        if($request->hasFile('image'))
        {
            $barang['image'] = UploadImage($request, 'image');
        }
        try {
            Tool::create($barang);
            return response()->json(['data' => $barang, 'message' => 'Tools Has Created', 'status' => true], 200,);
        } catch (\Throwable $th) {
            return response()->json($th, 402);
        } 
    }

    public function show($id)
    {
        try {
            $barang = Tool::findOrFail($id);
            return new ToolResource($barang);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function edit($id)
    {
       try {
        $barang = Tool::findOrFail($id);
        return new ToolResource($barang);
       } catch (\Throwable $th) {
        throw $th;
       }
    }

    public function update(Request $request, $id)
    {

        $barang = [
            'nama_alat' => $request->nama_alat,
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
            $barangId = Tool::findOrFail($id);
            $barangId->update($barang);
            return response()->json(['data' => $barang, 'message' => 'Data Has Updated'],200);

    }

    public function updateV2(Request $request, $id){
        $barang = [
            'nama_alat' => $request->nama_alat,
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
            $barangId = Tool::findOrFail($id)->update($barang);
            return response()->json(['data' => $barangId, 'message' => 'Order Has Updated', 'status' => true], 200,);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json($e, 400);
        }

    }

    public function destroy($id)
    {
        try {
            $barang = Tool::findOrFail($id);
            if ($barang->image) {
                Storage::disk('public')->delete('images/'.$barang->image);
            }
            $barang->delete();
            return response()->json(['data' => $barang, 'message' => 'Data Was Deleted'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
