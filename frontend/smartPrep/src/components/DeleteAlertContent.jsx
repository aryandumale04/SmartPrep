import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-5">
      <p className="text-[14px] text-gray-700">
        {content}
      </p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onDelete}
          className="
            px-5 py-2 rounded-lg text-sm font-semibold
            bg-rose-600 text-white
            hover:bg-rose-700
            transition-colors
            cursor-pointer
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
