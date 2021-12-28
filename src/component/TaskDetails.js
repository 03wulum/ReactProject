import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

function TaskDetails() {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});
  const [error, setError] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`http://localhost:5000/task/${params.id}`);
      const data = await res.json();

      setTask(data);
      setLoading(false);
    };
    fetchTask();
  });

  if (error) {
    return <navigate to="/" />;
  }

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
      <h3>{task.text}</h3>
      <p>{task.day}</p>
    </div>
  );
}

export default TaskDetails;
