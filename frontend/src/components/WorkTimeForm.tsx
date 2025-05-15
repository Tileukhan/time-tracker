import { useForm } from "react-hook-form";
import { submitWorkTime } from "../api/employeeApi";

interface WorkTimeFormData {
  startTime: string;
  endTime: string;
}

const WorkTimeForm = ({ iin }: { iin: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkTimeFormData>();

  const onSubmit = async (data: WorkTimeFormData) => {
    const today = new Date().toISOString().split("T")[0];

    try {
      await submitWorkTime({
        employeeIIN: iin,
        date: today,
        startTime: data.startTime,
        endTime: data.endTime,
      });
      reset();
      alert("Рабочее время отправлено");
    } catch (err) {
      console.error("Ошибка при отправке:", err);
      alert("Ошибка при отправке");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm max-w-xl mx-auto"
    >
      {/* Время начала */}
      <div>
        <label className="block text-sm mb-1 text-gray-600">
          Начало работы:
        </label>
        <input
          type="time"
          {...register("startTime", { required: "Укажите начало" })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        {errors.startTime && (
          <p className="text-sm text-red-500 mt-1">
            {errors.startTime.message}
          </p>
        )}
      </div>

      {/* Время окончания */}
      <div>
        <label className="block text-sm mb-1 text-gray-600">
          Окончание работы:
        </label>
        <input
          type="time"
          {...register("endTime", { required: "Укажите окончание" })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        {errors.endTime && (
          <p className="text-sm text-red-500 mt-1">{errors.endTime.message}</p>
        )}
      </div>

      {/* Кнопка */}
      <div className="pt-4">
        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg transition"
        >
          Отправить
        </button>
      </div>
    </form>
  );
};

export default WorkTimeForm;
