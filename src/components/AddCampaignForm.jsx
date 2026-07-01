// AddCampaignForm.jsx
function AddCampaignForm({ newCampaign, setNewCampaign, onSave, onCancel }) {
  // Универсальный обработчик для всех полей формы
  // e.target.name — имя поля (например "name" или "budget")
  // e.target.value — то что пользователь напечатал
  const handleChange = (e) => {
    setNewCampaign({
      ...newCampaign, // оставляем все остальные поля как были
      [e.target.name]: e.target.value, // меняем только то поле, в которое печатали
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Новая кампания</h3>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Название кампании"
            value={newCampaign.name}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
          />

          <input
            type="number"
            name="budget"
            placeholder="Бюджет, ₽"
            value={newCampaign.budget}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
          />

          <input
            type="number"
            name="clicks"
            placeholder="Клики"
            value={newCampaign.clicks}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
          />

          <input
            type="number"
            name="ctr"
            placeholder="CTR, %"
            value={newCampaign.ctr}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
          />

          <select
            name="status"
            value={newCampaign.status}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
          >
            <option value="Активна">Активна</option>
            <option value="На паузе">На паузе</option>
            <option value="Завершена">Завершена</option>
          </select>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Отмена
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddCampaignForm