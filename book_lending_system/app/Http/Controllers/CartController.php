<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    public function index() {
        // Fetch cart items from the database
        $cartItems = Cart::all();
        return response()->json($cartItems);
    }
    
    public function addToCart(Request $request)
    {
        $cart = Session::get('cart', []);

        $productId = $request->input('id');
        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] += $request->input('quantity', 1);
        } else {
            $cart[$productId] = [
                'id' => $productId,
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'quantity' => $request->input('quantity', 1),
            ];
        }

        Session::put('cart', $cart);
        return response()->json(['message' => 'Product added to cart successfully', 'cart' => $cart]);
    }

    public function getCartCount()
    {
        $cart = Session::get('cart', []);
        $count = array_sum(array_column($cart, 'quantity'));
        return response()->json(['count' => $count]);
    }

    public function updateCart(Request $request, $id)
    {
        $cart = Session::get('cart', []);
        if (isset($cart[$id])) {
            $cart[$id]['quantity'] = $request->input('quantity', 1);
            Session::put('cart', $cart);
            return response()->json(['message' => 'Cart updated successfully', 'cart' => $cart]);
        }
        return response()->json(['message' => 'Product not found in cart'], 404);
    }

    public function removeFromCart($id)
    {
        $cart = Session::get('cart', []);
        if (isset($cart[$id])) {
            unset($cart[$id]);
            Session::put('cart', $cart);
            return response()->json(['message' => 'Product removed from cart successfully']);
        }
        return response()->json(['message' => 'Product not found in cart'], 404);
    }
}
