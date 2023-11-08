<?php

namespace App\Http\Controllers;

use App\Http\Requests\MitraRequest;
use App\Http\Resources\MitraResource;
use App\Models\Mitra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MitraController extends Controller
{
    public function index()
    {
        $client = Mitra::paginate(20);
        return MitraResource::collection($client);
    }

    public function store(MitraRequest $request)
    {
        $client = new Mitra();

        $client = [
            'name' => $request->name,
            'address' => $request->address,
            'province' => $request->province,
            'kabupaten' => $request->kabupaten,
            'zipcode' => $request->zipcode,
            'email' => $request->email,
            'phone' => $request->phone,
            'fax' => $request->fax,
            'logo' => $request->logo,
        ];

        if ($request->hasFile('logo')) {
            $client['logo'] = UploadImage($request, 'logo');
        }else{
            return response()->json(['message' => 'Logo Must Added'], 401);
        }
        try {
            Mitra::create($client);
        } catch(\Illuminate\Database\QueryException $e){
           return response()->json($e, 401);
        }
        return response()->json(['data' => $client ,'message'=> 'Data Has Created'],200);
    }

    public function edit($id)
    {
        try {
            $client = Mitra::findOrFail($id);
            return response()->json(['data' => $client, 'messge' => 'Get Data Mitra'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json($e, 401);
        }
    }

    public function update(Request $request, $id)
    {
        $client = [
            'name' => $request->name,
            'address' => $request->address,
            'province' => $request->province,
            'kabupaten' => $request->kabupaten,
            'zipcode' => $request->zipcode,
            'email' => $request->email,
            'phone' => $request->phone,
            'fax' => $request->fax,
            'logo' => $request->logo,

        ];

        if($request->hasFile('logo'))
        {
            if($request->oldimage)
            {
                Storage::disk('public')->delete('images/' . $request->oldimage);
            }

            $client['logo'] = UploadImage($request, 'logo');
        }else{
            $client['logo'] = $request->oldimage;
        }
         try {
            Mitra::findOrFail($id)->update($client);
        } catch(\Illuminate\Database\QueryException $e){
            return response()->json($e, 401);
        }
        return response()->json(['data'=> $client, 'message' => 'Data Has Updated'], 200);
    }

    public function destroy($id)
    {
        $client = Mitra::findOrFail($id);
            if ($client->logo) {
                Storage::disk('public')->delete('images/'.$client->logo);
            }
        $client->delete();
        return response()->json(['data'=> $client, 'message' => 'Data Has Deleted'], 200);

    }
}
