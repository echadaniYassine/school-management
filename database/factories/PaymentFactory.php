php artisan make:factory PaymentFactory --model=Payment```

File Content (`database/factories/PaymentFactory.php`):
```php
<?php

namespace Database\Factories;

use App\Models\Invoice;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'invoice_id' => Invoice::factory(),
            'amount_paid' => fake()->randomFloat(2, 800, 2500),
            'payment_date' => fake()->dateTimeThisMonth(),
            'payment_method' => fake()->randomElement(['Credit Card', 'Cash', 'Bank Transfer']),
            'transaction_reference' => 'txn_' . fake()->bothify('?#?#?#?#?#??'),
        ];
    }
}