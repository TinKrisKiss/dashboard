// CampaignCard.jsx
function CampaignCard({ name, budget, clicks, status, ctr, onDelete, onEdit }) {

  // Объект где ключ — это статус, значение — классы Tailwind для цвета
  // Аналогия: это словарь. Спрашиваешь "Активна" — получаешь зелёный цвет
  const statusColors = {
    'Активна':   'bg-green-100 text-green-700',
    'На паузе':  'bg-yellow-100 text-yellow-700',
    'Завершена': 'bg-gray-100 text-gray-600',
  }

  // Отдельный словарь — цвет полоски слева, без фона текста
  const borderColors = {
    'Активна':   'border-l-green-500',
    'На паузе':  'border-l-yellow-500',
    'Завершена': 'border-l-gray-400',
  }

  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-600'
  const borderColorClass = borderColors[status] || 'border-l-gray-400'

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 flex flex-col gap-2 border border-gray-100 border-l-4 ${borderColorClass}`}>
      {/* Название кампании */}
      <h2 className="text-lg font-semibold text-gray-800">{name}</h2>

      {/* Статус с цветным бейджем */}
      {/* colorClass подставляется в className через фигурные скобки */}
      <span className={`text-sm font-medium px-2 py-1 rounded-full w-fit ${colorClass}`}>
        {status}
      </span>

      {/* Бюджет */}
      <p className="text-sm text-gray-600">
        Бюджет: <span className="font-medium text-gray-900">{budget} ₽</span>
      </p>

      {/* Клики */}
      <p className="text-sm text-gray-600">
        Клики: <span className="font-medium text-gray-900">{clicks}</span>
      </p>

      {/* Кликабельность */}
      <p className="text-sm text-gray-600">
        Кликабельность: <span className="font-medium text-gray-900">{ctr}%</span>
      </p>

      {/* Кнопки действий */}
      <div className="flex gap-3 mt-2">
        <button
          onClick={onEdit}
          className="text-sm text-blue-500 hover:text-blue-700 hover:underline"
        >
          Редактировать
        </button>
        <button
          onClick={onDelete}
          className="text-sm text-red-500 hover:text-red-700 hover:underline"
        >
          Удалить
        </button>
      </div>

    </div>
  )
}

export default CampaignCard