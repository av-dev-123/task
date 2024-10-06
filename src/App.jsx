import { useEffect, useState } from "react";
import AddModal from "./components/addTaskModal";
import Header from "./components/Header";
import Tab from "./components/tab";
import EditIcon from "./assets/icons/editIcon";
import CheckIcon from "./assets/icons/checkIcon";
import DeleteIcon from "./assets/icons/deleteIcon";
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState("all");
  const [tasks, setTasks] = useState({ data: [] });
  const [state, setState] = useState({
    index: 0,
    is_edit: false,
    title: "",
    description: "",
    is_completed: false,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]:
        value.trim() === ""
          ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
          : "",
    }));
  };

  const [errors, setErrors] = useState({ title: "", description: "" });

  const validate = () => {
    const newErrors = {};
    if (!state.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!state.description.trim()) {
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newTask = {
        title: state.title,
        description: state.description,
        is_completed: state.is_completed,
      };
      const updatedTasks = [...tasks.data, newTask];
      setTasks({ data: updatedTasks });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setState({ title: "", description: "", is_completed: false });
      setIsModalOpen(false);
    }
  };

  // form submit after edit
  const updateValue = (res, i) => {
    toggleModal();
    setState({
      is_edit: true,
      index: i,
      title: res.title,
      description: res.description,
      is_completed: res.is_completed,
    });
  };
  const handleEdit = () => {
    const data = tasks.data;
    data[state?.index].title = state.title;
    data[state?.index].description = state?.description;
    setTasks({
      ...tasks,
      data,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks.data));
    setIsModalOpen(false);
  };

  // tab change
  const handleTabChange = (tab) => {
    setActive(tab);
  };
  const filteredTasks = tasks.data.filter((task) => {
    if (active === "all") return true;
    if (active === "pending") return !task.is_completed;
    if (active === "completed") return task.is_completed;
    return true;
  });

  // complete task
  const handleComplete = (i) => {
    const updatedTasks = [...tasks.data];
    updatedTasks[i].is_completed = true;
    setTasks({ data: updatedTasks });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // delete task
  const deleteTask = (index) => {
    const updatedTask = tasks.data.filter((res, i) => i !== index);
    setTasks({ data: updatedTask });
    localStorage.setItem("tasks", JSON.stringify(updatedTask));
  };
  useEffect(() => {
    const storedData = localStorage.getItem("tasks");
    if (storedData) {
      setTasks({ data: JSON.parse(storedData) });
    }
  }, []);
  return (
    <>
      <Header />
      <main className="mt-5">
        <div className="container mx-auto px-3 sm:px-0 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          {/* heading */}
          <div className="flex justify-between align-center">
            <h3 className="text-2xl font-semibold">Task List</h3>
            <button
              onClick={toggleModal}
              className="bg-purple-700 text-white p-2 px-5 rounded"
            >
              Add Task
            </button>
          </div>

          {/* tabs */}
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <Tab
                label="All"
                isActive={active === "all"}
                onClick={() => handleTabChange("all")}
              />
              <Tab
                label="Pending"
                isActive={active === "pending"}
                onClick={() => handleTabChange("pending")}
              />
              <Tab
                label="Completed"
                isActive={active === "completed"}
                onClick={() => handleTabChange("completed")}
              />
            </ul>
          </div>

          {/* table */}
          <div className="overflow-x-auto mt-5">
            <table className="min-w-full bg-white border rounded-lg overflow-hidden border-gray-300">
              <thead>
                <tr className="bg-gray-200 border-b">
                  <th className="py-2 px-4 text-left text-gray-600 whitespace-nowrap">
                    Sr no.
                  </th>
                  <th className="py-2 px-4 text-left text-gray-600 whitespace-nowrap">
                    Title
                  </th>
                  <th className="py-2 px-4 text-left text-gray-600 w-1/4 whitespace-nowrap">
                    Description
                  </th>
                  <th className="py-2 px-4 text-left text-gray-600 whitespace-nowrap">
                    Status
                  </th>
                  <th className="py-2 px-4 text-left text-gray-600 whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredTasks) &&
                  filteredTasks.map((res, i) => (
                    <tr key={i} className="border-b hover:bg-gray-100">
                      <td className="py-2 px-4">{i + 1}</td>
                      <td className="py-2 px-4">{res.title}</td>
                      <td className="py-2 px-4">{res.description}</td>
                      <td className="py-2 px-4">
                        {!res.is_completed ? "Pending" : "Completed"}
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex gap-x-2">
                          {!res.is_completed && (
                            <button
                              onClick={() => handleComplete(i)}
                              className="bg-purple-700 rounded-full p-2 flex items-center justify-center"
                            >
                              <CheckIcon />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              updateValue(res, i);
                            }}
                            className="bg-purple-700 rounded-full p-2 flex items-center justify-center"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => deleteTask(i)}
                            className="bg-red-700 rounded-full p-2 flex items-center justify-center"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* modal */}
        {isModalOpen && (
          <AddModal
            setState={setState}
            state={state}
            onClose={() => setIsModalOpen(false)}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleEdit={handleEdit}
            errors={errors}
          />
        )}
      </main>
    </>
  );
}

export default App;
