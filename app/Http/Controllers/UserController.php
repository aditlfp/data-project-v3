<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $user = Auth::user()->id;
        $users = User::with('role')->where('id', $user)->get();
        $useData = UserResource::collection($users);
        return response()->json(['data' => $useData, 'message' => 'Auth'], 200);
    }

    public function store(UserRequest $request)
    {
        $user = new User();
        $user = [
            'name'      => $request->name,
            'email'     => $request->email,
            'role_id'   => $request->role_id,
            'mitra_id'  => $request->mitra_id,
            'password'  => Hash::make($request->password),
        ];

        try {
            User::create($user);
        } catch(\Illuminate\Database\QueryException $e){
            return response()->json($e, 401);
        }
            return response()->json(['data' => $user, 'message' => 'User Has Created'], 200);
    }

    public function update(Request $request, string $id)
    {
        $user = [
            'name'      => $request->name,
            'email'     => $request->email,
            'role_id'   => $request->role_id,
            'mitra_id'  => $request->mitra_id,
            'password'  => Hash::make($request->password),
        ];

        try {
            User::findOrFail($id)->update($user);
        } catch(\Illuminate\Database\QueryException $e){
            return response()->json($e, 401);
        }
        return response()->json(['data'=> $user, 'message'=> 'User Has Updated'], 200);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['data'=> $user, 'message'=> 'Data User Deleted'],200);
        
    }
}
