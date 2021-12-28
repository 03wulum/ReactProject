import { useState, useEffect } from "react";
import {
  useParams,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Button from "./Button";
function TaskDetails() {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});
  const [error, setError] = useState(null);

  const params = useParams();
  const navigate = useNavigate();
  // destructure by getting pathname out of useLocation
  const { pathname } = useLocation();

  console.log("check params", params);

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`http://localhost:5000/task/${params.id}`);
      const data = await res.json();

      if (res.status === 404) {
        //   setError('task Not found')
        navigate("/");
      }

      setTask(data);
      setLoading(false);
    };

    fetchTask();
  });

  //   if (error)
  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
      <p>{pathname}</p>
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
