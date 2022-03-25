<?php

namespace Database\Factories;

use App\Models\IDM;

use Illuminate\Database\Eloquent\Factories\Factory;

class IDMFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

    //@var string

    protected $model = IDM::class;

    //@return array

    public function definition()
    {
        return [
            'title' => $this->faker->word,
            'description' => $this->faker->text,
        ];
    }
}
