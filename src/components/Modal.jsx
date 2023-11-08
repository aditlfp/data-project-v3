
export default function Modal({ handleClose, show, children }) {
  const showHideClassName = show
    ? "absolute z-[99999999] inset-x-0"
    : "hidden";
  return (
    <>
    <div className="w-full">
      <div className={showHideClassName}>
        <div className="bg-indigo-900 flex  p-5">
          {children}
          <section className="flex justify-end items-end mx-10">
            <div>
              <button
                type="button"
                onClick={handleClose}
                className="btn btn-error"
              >
                X
              </button>
            </div>
          </section>
        </div>
      </div>
      </div>
    </>
  );
}
