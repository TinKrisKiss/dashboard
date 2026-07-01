// Instructions.jsx
function Instructions() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Как пользоваться дашбордом</h2>

      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-5">

        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Что вы видите</h3>
          <p className="text-sm text-gray-600">
            Каждая карточка — это одна рекламная кампания. На ней показаны название,
            статус, бюджет, количество кликов и кликабельность (CTR).
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Поиск</h3>
          <p className="text-sm text-gray-600">
            Введите часть названия кампании в поле поиска вверху — список карточек
            обновится автоматически.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Фильтр по статусу</h3>
          <p className="text-sm text-gray-600">
            Нажмите на кнопку статуса (Активна, На паузе, Завершена), чтобы увидеть
            только кампании с этим статусом. Кнопка "Все" сбрасывает фильтр.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Цветные полоски</h3>
          <p className="text-sm text-gray-600">
            Цвет полоски слева от карточки соответствует статусу: зелёный — активна,
            жёлтый — на паузе, серый — завершена.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Сводка вверху</h3>
          <p className="text-sm text-gray-600">
            Строки "Показано" и "Общий бюджет" всегда считаются по тем кампаниям,
            которые видны прямо сейчас — то есть с учётом фильтра и поиска.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Instructions