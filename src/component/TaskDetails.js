import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";
function TaskDetails() {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});

  const params = useParams();
  const navigate = useNavigate();
  // destructure by getting pathname out of useLocation
  //   const { pathname } = useLocation();

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`http://localhost:5000/tasks/${params.id}`);
      const data = await res.json();

      setTask(data);
      setLoading(false);
      if (res.status === 404) {
        navigate("/NotFound");
      }
    };

    fetchTask();
  }, []);
  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
      <h3>{task.text}</h3>
      <p>{task.day}</p>
      <Button
        onClick={() => {
          navigate(-1);
        }}
        text="Go Back"
      ></Button>
    </div>
  );
}

export default TaskDetails;
