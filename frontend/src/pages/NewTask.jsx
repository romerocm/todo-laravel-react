import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { CategoryService, TaskService } from "@/services/api";

export default function NewTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: location.state?.taskName || "",
    description: "",
    category_id: location.state?.categoryId || "",
    completed: false,
  });

  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const { data: categories = [] } = useQuery(
    "categories",
    CategoryService.getCategories
  );

  const createTaskMutation = useMutation(TaskService.createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      navigate("/");
    },
  });

  const createCategoryMutation = useMutation(CategoryService.createCategory, {
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries("categories");
      setFormData((prev) => ({ ...prev, category_id: newCategory.id }));
      setShowNewCategory(false);
      setNewCategoryName("");
    },
  });

  return (
    <div className="max-w-xl mx-auto px-6 font-mono">
      <h1 className="text-2xl font-bold mb-8 text-text-black">New task</h1>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-text-black">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Buy fresh and cheap lemons from Mrs. Nidia Diaz"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary resize-none h-24"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-text-black">Select category</label>
          <div className="relative">
            <select
              value={formData.category_id}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category_id: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary appearance-none bg-white"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {showNewCategory ? (
          <div className="space-y-2">
            <label className="block text-text-black">New category</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              />
              <button
                onClick={() => {
                  if (newCategoryName.trim()) {
                    createCategoryMutation.mutate({ name: newCategoryName });
                  }
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Add category
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowNewCategory(true)}
            className="text-primary"
          >
            + New category
          </button>
        )}

        <div className="pt-4">
          <button
            onClick={() => {
              if (formData.description && formData.category_id) {
                createTaskMutation.mutate(formData);
              }
            }}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Add task
          </button>
        </div>
      </div>
    </div>
  );
}
