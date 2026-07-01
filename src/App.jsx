// App.jsx
import { useState, useEffect } from 'react'
// useEffect — добавили к импорту
import CampaignCard from './components/CampaignCard'
import Instructions from './components/Instructions'
import AddCampaignForm from './components/AddCampaignForm'
import ClicksChart from './components/ClicksChart'
import BudgetChart from './components/BudgetChart'
import ImportCSV from './components/ImportCSV'

// Данные вынесли отдельно — они будут "приходить с сервера"
const fakeServerData = [
  { id: 1, name: 'Летняя распродажа', budget: 15000, clicks: 342, status: 'Активна', ctr: 3.2 },
  { id: 2, name: 'Новый год', budget: 30000, clicks: 1204, status: 'На паузе', ctr: 4.1 },
  { id: 3, name: 'Ретаргетинг', budget: 8000, clicks: 89, status: 'Завершена', ctr: 2.5 },
  { id: 4, name: 'Чёрная пятница', budget: 45000, clicks: 2310, status: 'Активна', ctr: 5.8 },
  { id: 5, name: 'Запуск нового продукта', budget: 22000, clicks: 567, status: 'Активна', ctr: 2.9 },
  { id: 6, name: 'Брендовый трафик', budget: 6000, clicks: 198, status: 'На паузе', ctr: 1.7 },
]

const filters = ['Все', 'Активна', 'На паузе', 'Завершена']

function App() {
    
  const [activeFilter, setActiveFilter] = useState('Все')
  const [searchQuery, setSearchQuery] = useState('')

  // Новый state для данных кампаний — сначала пустой массив
  const [campaigns, setCampaigns] = useState([])

  // Новый state для состояния загрузки — сначала true (грузим)
  const [isLoading, setIsLoading] = useState(true)

  // Хранит какой экран показывать: 'dashboard' или 'instructions'
  const [currentPage, setCurrentPage] = useState('dashboard')

  // Хранит id кампании которую собираемся удалить, или null если окно закрыто
  const [campaignToDelete, setCampaignToDelete] = useState(null)

  // Показывать ли окно добавления новой кампании
  const [showAddForm, setShowAddForm] = useState(false)

  // Хранит id кампании которую редактируем, или null если редактирования нет
  const [campaignToEdit, setCampaignToEdit] = useState(null)

  // Хранит текущую сортировку: поле и направление
  const [sortConfig, setSortConfig] = useState({ field: null, direction: 'asc' })

  // Показывать ли графики
  const [showCharts, setShowCharts] = useState(false)

  // Хранит данные которые пользователь вводит в форму — все поля сразу в одном объекте
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    budget: '',
    status: 'Активна',
    clicks: '',
    ctr: '',
  })

  useEffect(() => {
    setTimeout(() => {
      const saved = localStorage.getItem('campaigns')
      
      if (saved) {
        setCampaigns(JSON.parse(saved))
      } else {
        setCampaigns(fakeServerData)
      }

      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('campaigns', JSON.stringify(campaigns))
    }
  }, [campaigns, isLoading])

    const visibleCampaigns = campaigns
      .filter((campaign) => activeFilter === 'Все' || campaign.status === activeFilter)
      .filter((campaign) => campaign.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (!sortConfig.field) return 0 // без сортировки — оставляем как есть
        const modifier = sortConfig.direction === 'asc' ? 1 : -1
        return (a[sortConfig.field] - b[sortConfig.field]) * modifier
      })

  const totalBudget = visibleCampaigns.reduce((sum, campaign) => sum + campaign.budget, 0)

  // Функция удаления кампании по её id
  // Открывает модальное окно, запоминая какую кампанию хотим удалить
  const handleDeleteClick = (id) => {
    setCampaignToDelete(id)
  }

  // Вызывается когда пользователь подтвердил удаление в модальном окне
  const confirmDelete = () => {
    const newCampaigns = campaigns.filter((campaign) => campaign.id !== campaignToDelete)
    setCampaigns(newCampaigns)
    setCampaignToDelete(null) // закрываем окно
  }

  // Вызывается когда пользователь нажал "Отмена"
  const cancelDelete = () => {
    setCampaignToDelete(null) // закрываем окно, ничего не удаляя
  }

  // Сохраняет новую кампанию в массив campaigns
  const handleAddCampaign = () => {
    const newId = campaigns.length > 0 ? Math.max(...campaigns.map((c) => c.id)) + 1 : 1

    const campaignToAdd = {
      id: newId,
      name: newCampaign.name,
      budget: Number(newCampaign.budget),
      clicks: Number(newCampaign.clicks),
      status: newCampaign.status,
      ctr: Number(newCampaign.ctr),
    }

    setCampaigns([...campaigns, campaignToAdd])

    // Сбрасываем форму к пустым значениям и закрываем окно
    setNewCampaign({ name: '', budget: '', status: 'Активна', clicks: '', ctr: '' })
    setShowAddForm(false)
  }

  // Закрывает форму без сохранения
  const handleCancelAdd = () => {
    setNewCampaign({ name: '', budget: '', status: 'Активна', clicks: '', ctr: '' })
    setShowAddForm(false)
  }

  const handleImport = (importedCampaigns) => {
    setCampaigns([...campaigns, ...importedCampaigns])
  }

  const handleExport = () => {
    // Создаём первую строку — заголовки колонок
    const headers = 'name,budget,clicks,status,ctr'

    // Проходим по каждой кампании и превращаем в строку CSV
    const rows = campaigns.map((campaign) =>
      `${campaign.name},${campaign.budget},${campaign.clicks},${campaign.status},${campaign.ctr}`
    )

    // Объединяем заголовки и строки через перенос строки
    const csvContent = [headers, ...rows].join('\n')

    // Упаковываем текст в Blob — специальный объект для файлов в браузере
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })

    // Создаём временную ссылку на этот файл
    const url = URL.createObjectURL(blob)

    // Создаём невидимую ссылку, кликаем по ней и удаляем
    const link = document.createElement('a')
    link.href = url
    link.download = 'campaigns.csv' // имя скачиваемого файла
    link.click()

    // Освобождаем память — временная ссылка больше не нужна
    URL.revokeObjectURL(url)
  }

  // Открывает форму с данными существующей кампании
  const handleEditClick = (campaign) => {
    setCampaignToEdit(campaign.id)
    setNewCampaign({
      name: campaign.name,
      budget: campaign.budget,
      status: campaign.status,
      clicks: campaign.clicks,
      ctr: campaign.ctr,
    })
    setShowAddForm(true)
  }

  // Сохраняет отредактированную кампанию
  const handleSaveCampaign = () => {
    if (campaignToEdit !== null) {
      // Режим редактирования — заменяем существующую кампанию
      const updatedCampaigns = campaigns.map((campaign) =>
        campaign.id === campaignToEdit
          ? { ...campaign, ...newCampaign, budget: Number(newCampaign.budget), clicks: Number(newCampaign.clicks), ctr: Number(newCampaign.ctr) }
          : campaign
      )
      setCampaigns(updatedCampaigns)
      setCampaignToEdit(null)
    } else {
      // Режим добавления — как раньше
      handleAddCampaign()
      return
    }
    setNewCampaign({ name: '', budget: '', status: 'Активна', clicks: '', ctr: '' })
    setShowAddForm(false)
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-6">
        {/* Первая строка — заголовок и инструкция */}
        <div className="flex items-end justify-between mb-3">
          <h1 className="text-2xl font-bold text-gray-800">Дашборд кампаний</h1>
          <button
            onClick={() => setCurrentPage(currentPage === 'dashboard' ? 'instructions' : 'dashboard')}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {currentPage === 'dashboard' ? 'Инструкция' : '← Назад к дашборду'}
          </button>
        </div>

        {/* Вторая строка — кнопки действий, переносятся на мобильном */}
        {currentPage === 'dashboard' && (
          <div className="flex flex-wrap gap-2">
            <ImportCSV onImport={handleImport} />
            <button
              onClick={handleExport}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Экспорт CSV
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              Добавить кампанию
            </button>
          </div>
        )}
      </div>

      {/* Если грузим — показываем текст загрузки вместо всего остального */}
      {currentPage === 'instructions' ? (
        <Instructions />
      ) : isLoading ? (
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

          {/* Кнопки сортировки */}
          <div className="flex gap-2 mb-4">
            <span className="text-sm text-gray-500 self-center">Сортировка:</span>
            {[
              { label: 'Бюджет', field: 'budget' },
              { label: 'CTR', field: 'ctr' },
            ].map(({ label, field }) => (
              <button
                key={field}
                onClick={() => setSortConfig((prev) => ({
                  field,
                  direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
                }))}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  sortConfig.field === field
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600'
                }`}
              >
                {label} {sortConfig.field === field ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </button>
            ))}
          </div>
          
          {/* Кнопки фильтра */}
          <div className="grid grid-cols-2 gap-2 mb-4 sm:flex">
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

          {/* Графики под катом */}
          <button
            onClick={() => setShowCharts(!showCharts)}
            className="w-full mb-4 px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-left"
          >
            {showCharts ? '▲ Скрыть графики' : '▼ Показать графики'}
          </button>

          {showCharts && (
            <>
              <ClicksChart />
              <BudgetChart campaigns={visibleCampaigns} />
            </>
          )}

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
                  onDelete={() => handleDeleteClick(campaign.id)}
                  onEdit={() => handleEditClick(campaign)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Модальное окно подтверждения удаления */}
      {/* Показываем только если campaignToDelete не null */}
      {campaignToDelete !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Удалить кампанию?</h3>
            <p className="text-sm text-gray-600 mb-6">
              Это действие нельзя отменить.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Отмена
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Форма добавления кампании */}
      {showAddForm && (
        <AddCampaignForm
          newCampaign={newCampaign}
          setNewCampaign={setNewCampaign}
          onSave={handleSaveCampaign}
          onCancel={handleCancelAdd}
        />
      )}
    </div>
  )
}

export default App