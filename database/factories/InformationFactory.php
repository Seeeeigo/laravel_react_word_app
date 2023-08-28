<?php

namespace Database\Factories;

use App\Models\Information;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class InformationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Information::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->numberBetween(0,2),
            'title' => $this->faker->title(),
            'body' => $this->faker->text(),
            'create_name' => $this->faker->name(),
            'update_name' => $this->faker->name(),
        ];
    }
}
