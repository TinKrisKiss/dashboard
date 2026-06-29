// CampaignCard.jsx
function CampaignCard({ name, budget, clicks, status, ctr }) {

  // Объект где ключ — это статус, значение — классы Tailwind для цвета
  // Аналогия: это словарь. Спрашиваешь "Активна" — получаешь зелёный цвет
  const statusColors = {
    'Активна':   'bg-green-100 text-green-700',
    'На паузе':  'bg-yellow-100 text-yellow-700',
    'Завершена': 'bg-gray-100 text-gray-600',
  }

  // Берём из словаря нужный цвет по текущему статусу
  // Если статус не найден — используем серый цвет по умолчанию
  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-600'

  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2">

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

    </div>
  )
}

export default CampaignCard