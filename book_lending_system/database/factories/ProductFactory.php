<?php

// database/factories/ProductFactory.php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        return [
            'barcode' => $this->faker->unique()->numerify('##########'), // Unique barcode
            'description' => $this->faker->sentence(6), // Random description
            'price' => $this->faker->randomFloat(2, 1, 100), // Random price between 1 and 100
            'quantity' => $this->faker->numberBetween(1, 100), // Random quantity
            'category' => $this->faker->word, // Random category name
        ];
    }
}
