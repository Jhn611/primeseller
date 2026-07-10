export const chartDates = ['01.06', '08.06', '15.06', '22.06'];

export const chartData = {
  overlay: {
    sales: {
      signalTitle: 'SKU в росте',
      signalY: ['+30%', '+10%', '-10%'],
      signal: [8, 12, 18, 14, 24, 21, 29, 26],
      decisionTitle: 'AI действия',
      decisionY: ['80', '40', '0'],
      decisionLabels: ['Цена', 'Рекл.', 'Дозак.', 'Стоп'],
      decision: [66, 52, 74, 18]
    },
    stock: {
      signalTitle: 'Дней запаса',
      signalY: ['40д', '20д', '0'],
      signal: [34, 29, 24, 18, 15, 12, 9, 7],
      decisionTitle: 'Дозаказ',
      decisionY: ['600', '300', '0'],
      decisionLabels: ['XS', 'S', 'M', 'L'],
      decision: [180, 470, 320, 140]
    },
    margin: {
      signalTitle: 'Чистая маржа',
      signalY: ['40%', '25%', '10%'],
      signal: [28, 31, 27, 24, 26, 22, 19, 24],
      decisionTitle: 'Факторы',
      decisionY: ['300k', '150k', '0'],
      decisionLabels: ['Ком.', 'Лог.', 'Хран.', 'Приб.'],
      decision: [184, 212, 96, 246]
    },
    ads: {
      signalTitle: 'ROAS кампаний',
      signalY: ['6x', '3x', '0'],
      signal: [3.4, 3.8, 2.6, 4.7, 4.1, 2.1, 3.9, 5.2],
      decisionTitle: 'Бюджеты',
      decisionY: ['120k', '60k', '0'],
      decisionLabels: ['Поиск', 'Кат.', 'Авто', 'Бренд'],
      decision: [104, 62, 88, 38]
    },
    purchase: {
      signalTitle: 'Потребность',
      signalY: ['1200', '600', '0'],
      signal: [420, 520, 680, 740, 890, 980, 1120, 1240],
      decisionTitle: 'Партии',
      decisionY: ['600', '300', '0'],
      decisionLabels: ['7д', '14д', '21д', '30д'],
      decision: [150, 470, 210, 410]
    },
    price: {
      signalTitle: 'Спрос',
      signalY: ['120%', '100%', '80%'],
      signal: [104, 102, 101, 98, 96, 94, 91, 89],
      decisionTitle: 'Сценарии',
      decisionY: ['80k', '40k', '0'],
      decisionLabels: ['+2%', '+4%', '+6%', '-3%'],
      decision: [34, 62, 18, 26]
    }
  },
  area: {
    labels: ['01.06', '06.06', '12.06', '18.06', '22.06'],
    yLabels: ['500k', '250k', '0'],
    values: [
      38, 44, 31, 56, 72, 48, 89, 105, 64, 78, 122, 166, 142, 118, 96, 110, 184, 228, 286, 214, 178, 154, 132, 148, 124, 116, 102, 94
    ]
  },
  heatmap: {
    labels: ['01.06', '08.06', '15.06', '22.06'],
    rows: ['Кол.', 'Электр.', 'Под.', 'СПБ'],
    values: [
      [18, 42, 68, 91],
      [24, 58, 49, 76],
      [12, 36, 82, 64],
      [44, 70, 88, 52]
    ]
  },
  donut: {
    labels: ['Лог.', 'Ком.', 'Хран.', 'Приб.'],
    values: [41, 24, 18, 17]
  },
  scatter: {
    labels: ['01.06', '08.06', '15.06', '22.06'],
    yLabels: ['ROAS 6x', '3x', '0'],
    points: [
      { x: 9.4, y: 4.7, label: 'Поиск' },
      { x: 16.8, y: 2.1, label: 'Каталог' },
      { x: 10.2, y: 3.9, label: 'Авто' },
      { x: 7.1, y: 5.2, label: 'Бренд' },
      { x: 18.4, y: 1.6, label: 'Риск' },
      { x: 12.6, y: 3.2, label: 'Тест' }
    ]
  },
  funnel: {
    labels: ['План', 'Склад', 'Маржа', 'Заказ'],
    values: [1240, 970, 740, 420]
  },
  step: {
    labels: ['01.06', '08.06', '15.06', '22.06'],
    yLabels: ['120%', '100%', '80%'],
    price: [100, 102, 104, 104, 106, 108, 108, 110],
    demand: [102, 101, 100, 96, 94, 91, 89, 86]
  }
};
