import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { CategoryService, TaskService } from "@/services/api";

export default function Lists() {
  const [newTaskName, setNewTaskName] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery(
    "categories",
    CategoryService.getCategories
  );
  const { data: tasks = [] } = useQuery("tasks", TaskService.getTasks);

  const createTaskMutation = useMutation(TaskService.createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      setNewTaskName("");
    },
  });

  const deleteCategoryMutation = useMutation(CategoryService.deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["categories", "tasks"]);
    },
  });

  const deleteTaskMutation = useMutation(TaskService.deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const handleAddQuickTask = (e) => {
    e.preventDefault();
    if (newTaskName.trim()) {
      navigate("/new-task", { state: { taskName: newTaskName } });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 font-mono">
      <h1 className="text-2xl font-bold mb-6 text-text-black">Lists</h1>

      {/* Quick add task form */}
      <div className="mb-8 flex items-center gap-3">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="New task"
          className="flex-1 py-2 px-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
        />
        <button
          onClick={handleAddQuickTask}
          className="text-3xl text-primary font-light"
        >
          +
        </button>
      </div>

      {/* Categories and tasks */}
      <div className="space-y-8">
        {categories.map((category) => {
          const categoryTasks = tasks.filter(
            (task) => task.category_id === category.id
          );

          return (
            <div key={category.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text-black">
                  {category.name}
                </h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      navigate("/new-task", {
                        state: { categoryId: category.id },
                      })
                    }
                    className="text-primary text-sm"
                  >
                    New task add
                  </button>
                  {categoryTasks.length === 0 && (
                    <button
                      onClick={() => deleteCategoryMutation.mutate(category.id)}
                      className="text-text-gray text-sm"
                    >
                      empty category
                    </button>
                  )}
                  <button
                    onClick={() => deleteCategoryMutation.mutate(category.id)}
                    className="text-text-gray text-sm"
                  >
                    delete category
                  </button>
                </div>
              </div>

              {/* Tasks in category */}
              <div className="space-y-2">
                {categoryTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={() => deleteTaskMutation.mutate(task.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TaskItem({ task, onDelete }) {
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation(
    (updatedTask) => TaskService.updateTask(task.id, updatedTask),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    }
  );

  return (
    <div className="flex items-center gap-3 group">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() =>
          updateTaskMutation.mutate({ ...task, completed: !task.completed })
        }
        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <span
        className={`flex-1 ${
          task.completed ? "line-through text-text-gray" : "text-text-black"
        }`}
      >
        {task.title}
      </span>
      <button
        onClick={onDelete}
        className="text-text-gray text-sm opacity-0 group-hover:opacity-100"
      >
        delete task
      </button>
    </div>
  );
}
