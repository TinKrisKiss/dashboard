// App.jsx
import { useState, useEffect } from 'react'
// useEffect — добавили к импорту
import CampaignCard from './components/CampaignCard'

// Данные вынесли отдельно — они будут "приходить с сервера"
const fakeServerData = [
  { id: 1, name: 'Летняя распродажа', budget: 15000, clicks: 342, status: 'Активна', ctr: 3.2 },
  { id: 2, name: 'Новый год', budget: 30000, clicks: 1204, status: 'На паузе', ctr: 4.1 },
  { id: 3, name: 'Ретаргетинг', budget: 8000, clicks: 89, status: 'Завершена', ctr: 2.5 },
]

const filters = ['Все', 'Активна', 'На паузе', 'Завершена']

function App() {
  const [activeFilter, setActiveFilter] = useState('Все')
  const [searchQuery, setSearchQuery] = useState('')

  // Новый state для данных кампаний — сначала пустой массив
  const [campaigns, setCampaigns] = useState([])

  // Новый state для состояния загрузки — сначала true (грузим)
  const [isLoading, setIsLoading] = useState(true)

  // useEffect запустится один раз после загрузки страницы
  useEffect(() => {
    // setTimeout имитирует задержку сервера — 1 секунда
    setTimeout(() => {
      // После секунды кладём данные в state
      setCampaigns(fakeServerData)
      // Говорим что загрузка закончилась
      setIsLoading(false)
    }, 1000)
  }, []) // пустой массив — запустить только один раз

  const visibleCampaigns = campaigns
    .filter((campaign) => activeFilter === 'Все' || campaign.status === activeFilter)
    .filter((campaign) => campaign.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const totalBudget = visibleCampaigns.reduce((sum, campaign) => sum + campaign.budget, 0)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Дашборд кампаний</h1>

      {/* Если грузим — показываем текст загрузки вместо всего остального */}
      {isLoading ? (
        <p className="text-sm text-gray-400">Загрузка...</p>
      ) : (
        <>
          {/* Поле поиска */}
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-800"
          />

          {/* Кнопки фильтра */}
          <div className="flex gap-2 mb-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Счётчик и бюджет */}
          <p className="text-sm text-gray-500 mb-2">
            Показано: {visibleCampaigns.length} кампании
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Общий бюджет: <span className="font-medium text-gray-900">{totalBudget.toLocaleString()} ₽</span>
          </p>

          {/* Карточки или сообщение */}
          {visibleCampaigns.length === 0 ? (
            <p className="text-sm text-gray-400">Ничего не найдено</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  name={campaign.name}
                  budget={campaign.budget}
                  clicks={campaign.clicks}
                  status={campaign.status}
                  ctr={campaign.ctr}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default App