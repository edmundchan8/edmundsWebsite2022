<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\IDM;
use database\factories\IDMFactory;

class IDMTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // generate 5 records
        IDM::factory()->times(5)->create();
    }
}
