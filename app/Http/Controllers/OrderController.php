<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // "stock_barang_id","jumlah","harga_satuan","total","status"
    public function index()
    {
        $order = Order::paginate(50);
        return Order::collection([$order, "messages" => "Get All Data"]);
    }

    public function store(OrderRequest $request)
    {
        try {
            $order = Order::create($request->all());
            return response()->json(['data' => $order, 'message' => 'Order Has Created', 'status' => true], 200,);
        } catch (\Throwable $th) {
            return response()->json($th, 402);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $orderId = Order::findOrFail($id);
            $orderId->update($request->all());
            return response()->json(['data' => $orderId, 'message' => 'Order Has Updated', 'status' => true], 200,);
        } catch (\Throwable $th) {
            return response()->json($th, 402);
        }
    }
    public function destroy($id)
    {
        try {
            $orderId = Order::findOrFail($id);
            $orderId->delete();
            return response()->json(['data' => $orderId, 'message' => 'Order Has Deleted Permanant', 'status' => true], 200,);
        } catch (\Throwable $th) {
            return response()->json($th, 402);
        }
    }
}
