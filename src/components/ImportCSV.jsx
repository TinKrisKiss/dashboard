// ImportCSV.jsx
function ImportCSV({ onImport }) {

  const handleFileChange = (e) => {
    const file = e.target.files[0] // берём первый выбранный файл
    if (!file) return // если файл не выбран — выходим

    const reader = new FileReader() // создаём инструмент для чтения файла

    // Эта функция запустится когда файл будет прочитан
    reader.onload = (event) => {
      const text = event.target.result // содержимое файла как текст
      const lines = text.trim().split('\n') // разбиваем на строки
      const headers = lines[0].split(',') // первая строка — заголовки

      // Проходим по остальным строкам (пропускаем заголовки)
      const campaigns = lines.slice(1).map((line, index) => {
        const values = line.split(',')
        return {
          id: Date.now() + index, // уникальный id через текущее время
          name: values[0].trim(),
          budget: Number(values[1].trim()),
          clicks: Number(values[2].trim()),
          status: values[3].trim(),
          ctr: Number(values[4].trim()),
        }
      })

      onImport(campaigns) // передаём распарсенные кампании в App.jsx
    }

    reader.readAsText(file) // запускаем чтение файла как текст
  }

  return (
    <label className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">
      Импорт CSV
      {/* input скрыт — клик по label открывает выбор файла */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  )
}

export default ImportCSV