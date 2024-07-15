import style from "./style.module.scss";

interface UserMessage {
  msg: string;
}

export default function Toast({ msg }: UserMessage) {
  return (
    <>
      <div
        className={`toast align-items-center ${style.divToast}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{msg}</div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </>
  );
}
