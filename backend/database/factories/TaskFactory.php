<?php

namespace Database\Factories;

use App\Models\Task;

use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

    //@var string

    protected $model = Task::class;

    //@return array

    public function definition()
    {
        return [
            'title' => $this->faker->word,
            'description' => $this->faker->text,
        ];
    }
}
