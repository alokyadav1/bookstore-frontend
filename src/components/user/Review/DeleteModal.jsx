/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
function DeleteModal({onDelete}){
    return(
        <div className="modalContainer z-50">
          <div className="modal md:w-1/4">
            <p className="title">Delete comment</p>
            <p className="content">
              Are you sure you want to delete this comment? This will remove the
              comment and cant be undone.
            </p>
            <div className="footer">
              <button className="cancel" onClick={onDelete}>
                NO, CANCEL
              </button>
              <button className="delete" onClick={onDelete}>
                YES, DELETE
              </button>
            </div>
          </div>
        </div>
    )
}
export default DeleteModal;