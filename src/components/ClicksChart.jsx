// ClicksChart.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Генерируем случайные данные за 7 дней
// В реальном проекте эти данные пришли бы с сервера
const generateData = () => {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  return days.map((day) => ({
    day,
    clicks: Math.floor(Math.random() * 500) + 100, // случайное число от 100 до 600
  }))
}

// Вызываем один раз — данные фиксируются, не меняются при каждом рендере
const data = generateData()

function ClicksChart() {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Динамика кликов за 7 дней</h2>

      {/* ResponsiveContainer растягивает график на всю ширину контейнера */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          {/* Сетка на фоне */}
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

          {/* Ось X — дни недели */}
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6b7280' }} />

          {/* Ось Y — количество кликов */}
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />

          {/* Подсказка при наведении */}
          <Tooltip />

          {/* Сама линия графика */}
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ fill: '#2563eb', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ClicksChart