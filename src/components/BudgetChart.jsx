// BudgetChart.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function BudgetChart({ campaigns }) {
  // Берём реальные данные из пропса, не мок
  // Каждая кампания — один столбец
  const data = campaigns.map((campaign) => ({
    name: campaign.name.length > 12
      ? campaign.name.slice(0, 12) + '...' // обрезаем длинные названия
      : campaign.name,
    budget: campaign.budget,
  }))

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Бюджет по кампаниям</h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
          <Tooltip formatter={(value) => `${value.toLocaleString()} ₽`} />
          <Bar dataKey="budget" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BudgetChart