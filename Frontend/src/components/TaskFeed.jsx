import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  backgroundColor: "#1f2937",
  border: "1px solid #374151",
  borderRadius: "6px",
  color: "white",
  marginBottom: "10px",
};

const btnStyle = {
  padding: "6px 12px",
  border: "none",
  borderRadius: "4px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "0.85rem",
};

const TaskFeed = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 1. READ ALL TASKS QUERY
  const {
    data: feedData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["publicFeed"],
    queryFn: async () => {
      const response = await await axios.get(`${API_URL}/tasks/feed`, {
        withCredentials: true,
      });

      return response.data;
    },
  });

  // 2. CREATE TASK MUTATION
  const createTaskMutation = useMutation({
    mutationFn: async (newTask) => {
      return await axios.post(
        "http://localhost:4000/api/v1/tasks/create",
        newTask,
        { withCredentials: true },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["publicFeed"]);
      setTitle("");
      setDescription("");
    },
  });

  // 3. UPDATE TASK STATUS MUTATION
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, currentStatus }) => {
      const nextStatus = currentStatus === "pending" ? "completed" : "pending";
      return await axios.put(
        `http://localhost:4000/api/v1/tasks/${id}`,
        { status: nextStatus },
        { withCredentials: true },
      );
    },
    onSuccess: () => queryClient.invalidateQueries(["publicFeed"]),
  });

  // 4. DELETE TASK MUTATION
  const deleteTaskMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`http://localhost:4000/api/v1/tasks/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => queryClient.invalidateQueries(["publicFeed"]),
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return alert("All fields are required");
    createTaskMutation.mutate({ title, description });
  };

  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#9ca3af" }}>
        ⏳ Loading public feed...
      </div>
    );

  if (isError)
    return (
      <div style={{ color: "#f87171", padding: "20px", textAlign: "center" }}>
        ⚠️ Error: {error.message}
      </div>
    );

  return (
    <div>
      {/* CREATION BOX CONTAINER */}
      <div
        style={{
          backgroundColor: "#111827",
          border: "1px solid #1e293b",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ marginBottom: "15px", fontSize: "1.1rem" }}>
          Create an Accountability Task
        </h3>
        <form onSubmit={handleCreateSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...inputStyle, height: "80px", resize: "none" }}
          />
          <button
            type="submit"
            disabled={createTaskMutation.isPending}
            style={{
              ...btnStyle,
              backgroundColor: "#2563eb",
              color: "white",
              width: "100%",
              padding: "10px",
            }}
          >
            {createTaskMutation.isPending ? "Creating..." : "Post Task to Feed"}
          </button>
        </form>
      </div>

      {/* RENDER DYNAMIC LISTS CARDS */}
      <h2
        style={{ fontSize: "1.4rem", marginBottom: "20px", color: "#e5e7eb" }}
      >
        Global Accountability Stream
      </h2>
      {feedData?.Feed?.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "#6b7280",
            padding: "40px",
            border: "2px dashed #1e293b",
            borderRadius: "8px",
          }}
        >
          No tasks available.
        </div>
      ) : (
        feedData?.Feed?.map((task) => (
          <div
            key={task._id}
            style={{
              backgroundColor: "#111827",
              border: "1px solid #1e293b",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                fontSize: "1.15rem",
                color: "#f3f4f6",
                marginBottom: "8px",
              }}
            >
              📌 {task.title}
            </h3>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "0.95rem",
                marginBottom: "12px",
              }}
            >
              {task.description}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "15px",
                borderTop: "1px solid #1e293b",
                paddingTop: "12px",
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() =>
                    updateTaskMutation.mutate({
                      id: task._id,
                      currentStatus: task.status,
                    })
                  }
                  style={{
                    ...btnStyle,
                    backgroundColor:
                      task.status === "completed" ? "#065f46" : "#b45309",
                    color: "white",
                  }}
                >
                  Status: {task.status}
                </button>

                {/* SECURE BLOCK: Conditional button assignment layer */}
                {task.author?._id === user?.id && (
                  <button
                    onClick={() => {
                      if (confirm("Delete task?"))
                        deleteTaskMutation.mutate(task._id);
                    }}
                    style={{
                      ...btnStyle,
                      backgroundColor: "#374151",
                      color: "#f87171",
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
              <small style={{ color: "#60a5fa" }}>
                By: @{task.author?.username}
              </small>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskFeed;
