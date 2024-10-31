<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Task;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create default categories
        $categories = [
            ['name' => 'To-do'],
            ['name' => 'Shopping list'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        // Create some example tasks
        $tasks = [
            [
                'title' => 'Buy groceries',
                'description' => 'Get fresh vegetables and fruits',
                'category_id' => 2,
                'completed' => false
            ],
            [
                'title' => 'Complete project documentation',
                'description' => 'Write technical documentation for the new feature',
                'category_id' => 1,
                'completed' => false
            ]
        ];

        foreach ($tasks as $task) {
            Task::create($task);
        }
    }
}