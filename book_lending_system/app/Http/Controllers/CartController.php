<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    // Fetch cart items from session
    public function index()
    {
        $cartItems = Session::get('cart', []);  // Fetch cart items from session
        return response()->json($cartItems);
    }

    // Add item to the cart
    public function addToCart(Request $request)
    {
        $cart = Session::get('cart', []);
        
        $productId = $request->input('id');
        if (isset($cart[$productId])) {
            // If the product is already in the cart, increase its quantity
            $cart[$productId]['quantity'] += $request->input('quantity', 1);
        } else {
            // If the product is not in the cart, add it
            $cart[$productId] = [
                'id' => $productId,
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'quantity' => $request->input('quantity', 1),
            ];
        }

        // Save updated cart back to session
        Session::put('cart', $cart);
        return response()->json(['message' => 'Product added to cart successfully', 'cart' => $cart]);
    }

    // Get the total number of items in the cart
    public function getCartCount()
    {
        $cart = Session::get('cart', []);
        $count = array_sum(array_column($cart, 'quantity'));  // Calculate total quantity of items
        return response()->json(['count' => $count]);
    }

    // Update the quantity of a specific item in the cart
    public function updateCart(Request $request, $id)
    {
        $cart = Session::get('cart', []);
        if (isset($cart[$id])) {
            // Update the quantity of the item
            $cart[$id]['quantity'] = $request->input('quantity', 1);
            Session::put('cart', $cart);
            return response()->json(['message' => 'Cart updated successfully', 'cart' => $cart]);
        }
        return response()->json(['message' => 'Product not found in cart'], 404);
    }

    // Remove an item from the cart
    public function removeFromCart($id)
    {
        $cart = Session::get('cart', []);
        if (isset($cart[$id])) {
            unset($cart[$id]);  // Remove the item from the cart
            Session::put('cart', $cart);
            return response()->json(['message' => 'Product removed from cart successfully']);
        }
        return response()->json(['message' => 'Product not found in cart'], 404);
    }
}
