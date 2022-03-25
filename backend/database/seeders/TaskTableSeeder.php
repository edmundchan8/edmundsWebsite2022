<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use database\factories\TaskFactory;

class TaskTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // generate 50 records
        Task::factory()->times(5)->create();
    }
}
