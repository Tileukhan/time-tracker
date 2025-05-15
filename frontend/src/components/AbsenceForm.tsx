import { useForm } from "react-hook-form";
import { submitAbsence } from "../api/employeeApi";
import { useState } from "react";

interface AbsenceFormData {
  absenceStart: string;
  absenceEnd: string;
  reason: string;
  document: FileList;
}

const AbsenceForm = ({ iin }: { iin: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AbsenceFormData>();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onSubmit = async (data: AbsenceFormData) => {
    if (!data.document || data.document.length === 0) return;

    const today = new Date().toISOString().split("T")[0];

    const formData = new FormData();
    formData.append("employeeIIN", iin);
    formData.append("date", today);
    formData.append("absenceStart", data.absenceStart);
    formData.append("absenceEnd", data.absenceEnd);
    formData.append("reason", data.reason);
    formData.append("document", data.document[0]);

    try {
      await submitAbsence(formData);
      reset();
      setPreviewUrl(null);
      alert("Заявка на отсутствие отправлена");
    } catch (err) {
      console.error("Ошибка при отправке:", err);
      alert("Ошибка при отправке формы");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
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
          Начало отсутствия:
        </label>
        <input
          type="time"
          {...register("absenceStart", { required: "Укажите начало" })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        {errors.absenceStart && (
          <p className="text-sm text-red-500 mt-1">
            {errors.absenceStart.message}
          </p>
        )}
      </div>

      {/* Время окончания */}
      <div>
        <label className="block text-sm mb-1 text-gray-600">
          Окончание отсутствия:
        </label>
        <input
          type="time"
          {...register("absenceEnd", { required: "Укажите окончание" })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        {errors.absenceEnd && (
          <p className="text-sm text-red-500 mt-1">
            {errors.absenceEnd.message}
          </p>
        )}
      </div>

      {/* Причина */}
      <div>
        <label className="block text-sm mb-1 text-gray-600">Причина:</label>
        <select
          {...register("reason", { required: "Выберите причину" })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">Выберите причину</option>
          <option value="Болезнь">Болезнь</option>
          <option value="Отпуск">Отпуск</option>
          <option value="Командировка">Командировка</option>
          <option value="Семейные обстоятельства">
            Семейные обстоятельства
          </option>
        </select>
        {errors.reason && (
          <p className="text-sm text-red-500 mt-1">{errors.reason.message}</p>
        )}
      </div>

      {/* Документ */}
      <div>
        <label className="block text-sm mb-1 text-gray-600">Документ:</label>
        <input
          type="file"
          accept="application/pdf,image/jpeg"
          {...register("document", {
            required: "Документ обязателен",
            validate: (files) => files.length > 0 || "Файл обязателен",
          })}
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-white"
        />
        {errors.document && (
          <p className="text-sm text-red-500 mt-1">{errors.document.message}</p>
        )}

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Предпросмотр"
            className="mt-3 rounded max-h-48 border border-gray-200"
          />
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

export default AbsenceForm;
