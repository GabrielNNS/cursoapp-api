function Professor(props) {
  return (
    <div className="min-w-[250px] max-w-[250px] m-2 py-8 px-8 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <div className="text-left space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">{props.name}</p>
          <p className="text-slate-500 font-medium">{props.specialty}</p>
        </div>

        {props.editProfessor}
      </div>
    </div>
  );
}

export default Professor;
