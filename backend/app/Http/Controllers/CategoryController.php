<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\CategoryRequest;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = Category::withCount('tasks')->get();
        return response()->json($categories);
    }

    public function store(CategoryRequest $request): JsonResponse
    {
        $category = Category::create($request->validated());
        return response()->json($category, 201);
    }

    public function destroy(Category $category): JsonResponse
    {
        $category->delete();
        return response()->json(null, 204);
    }
}