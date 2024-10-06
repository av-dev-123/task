import { useState } from "react";

const AddModal = ({
  onClose,
  handleSubmit,
  handleChange,
  state,
  handleEdit,
  errors
}) => {

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-75">
        <div className="relative p-4 w-full max-w-lg max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between py-3 px-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Task
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                &times;
              </button>
            </div>
            {/* Modal body */}
            <div className="p-5 px-5">
              <form
                className=""
                onSubmit={state?.is_edit ? handleEdit : handleSubmit}
              >
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Task Name
                  </label>
                  <input
                    className="appearance-none bg-white border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-purple-700"
                    id="task-name"
                    type="text"
                    placeholder="Enter task name"
                    
                    value={state.title}
                    name="title"
                    onChange={handleChange}
                  />
                  {errors?.title && (
                    <p className="text-red-500 text-sm mt-2">{errors.title}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Task Description
                  </label>
                  <textarea
                    className="appearance-none bg-white border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-purple-700"
                    id="task-desc"
                    rows="3"
                    placeholder="Enter task description"
                    // required
                    name="description"
                    value={state.description}
                    onChange={handleChange}
                  ></textarea>
                  {errors?.description && (
                    <p className="text-red-500 text-sm  mt-2">{errors.description}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="bg-purple-700 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded w-full"
                    type="submit"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddModal;
