<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call(RoleSeeder::class);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'position' => 'admin',
            'password' => bcrypt('password'),
            'role_id' => 1,
        ]);

        User::factory()->create([
            'name' => 'Approver',
            'email' => 'approver@gmail.com',
            'position' => 'approver',
            'password' => bcrypt('password'),
            'role_id' => 2,
        ]);
    }
}
