import PlayerStats from './PlayerStats.js';
// Global Variable
let jsonUrl =
  'https://opensheet.elk.sh/1mUV29bCyMUZiwdl7B6OswR-C_jJZWNV3hc63A35GBM8/toJSONAPI';
let dataArr = [];
let p = {
  adam: {},
  lydia: {},
  joe: {},
  tim: {},
  madeline: {},
  janie: {},
  holland: {},
  [Symbol.iterator]: function* () {
    for (let key in this) {
      yield [key, this[key]]; // yield [key, value] pair
    }
  },
};
let playerSelect, lineChart;

// Set up structure
const init = () => {
  const main = document.querySelector('main');
  playerSelect = document.createElement('select');
  playerSelect.className = 'select';
  main.before(playerSelect);

  const avgCard = document.createElement('div');
  avgCard.id = 'avg-card';
  const avgCardTitle = document.createElement('p');
  avgCardTitle.className = 'card-title';
  avgCardTitle.textContent = 'Average Total Score';
  avgCard.appendChild(avgCardTitle);
  const avgCardData = document.createElement('p');
  avgCardData.className = 'card-data';
  avgCard.appendChild(avgCardData);
  const avgCardCaption = document.createElement('p');
  avgCardCaption.className = 'card-caption';
  avgCard.appendChild(avgCardCaption);
  main.appendChild(avgCard);

  const missedDayCard = document.createElement('div');
  missedDayCard.id = 'missed-day-card';
  const missedDayCardTitle = document.createElement('p');
  missedDayCardTitle.className = 'card-title';
  missedDayCardTitle.textContent = 'Number of Missed Days';
  missedDayCard.appendChild(missedDayCardTitle);
  const missedDayCardData = document.createElement('p');
  missedDayCardData.className = 'card-data';
  missedDayCard.appendChild(missedDayCardData);
  main.appendChild(missedDayCard);

  const ctx = document.createElement('canvas');
  ctx.id = 'lineChart';
  ctx.width = 400;
  ctx.height = 350;
  main.appendChild(ctx);

  makeDataCards.init();
};

// Draw data
const makeDataCards = {
  // fetch JSON
  init: function () {
    $.getJSON(jsonUrl, function (data) {
      dataArr = data;
      console.log('Data Fetched');
      p.adam = new PlayerStats('Adam', dataArr);
      p.lydia = new PlayerStats('Lydia', dataArr);
      p.joe = new PlayerStats('Joe', dataArr);
      p.tim = new PlayerStats('Tim', dataArr);
      p.madeline = new PlayerStats('Madeline', dataArr);
      p.janie = new PlayerStats('Janie', dataArr);
      p.holland = new PlayerStats('Holland', dataArr);
      for (const element of p) {
        let option = document.createElement('option');
        option.value = element[1].playerName.toLowerCase();
        option.text = element[0].toUpperCase();
        playerSelect.appendChild(option);
      }
      playerSelect.selectedIndex = 0;

      makeDataCards.dailyAverage(playerSelect.value);
    });
  },
  // Make Data Table and Show
  dailyAverage: function (player) {
    let data = document.querySelector('#avg-card p.card-data');
    data.textContent = p[player].pAvg;
    //to do- appended info to dom
    let caption = document.querySelector('#avg-card p.card-caption');
    caption.textContent =
      'Change Since Yesterday: ' + p[player].percentChangeDay + '%';
    makeDataCards.missedDays(player);
  },
  missedDays: function (player) {
    let data = document.querySelector('#missed-day-card p.card-data');
    data.textContent = p[player].pMissedDays;
    //to do- appended info to dom
    makeDataCards.makeBarPlot(player);
  },
  makeBarPlot: function (player) {
    console.log(p[player].pScores);
    let wordleNum = [];
    for (const element of dataArr) {
      wordleNum.push(element.Wordle);
    }
    console.log(wordleNum);
    const ctx = document.getElementById('lineChart');
    lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: wordleNum,
        datasets: [
          {
            data: p[player].pScores,
            label: 'Daily Score: ' + p[player].playerName,
            borderColor: '#f05454',
            backgroundColor: '#f0545460',
            fill: true,
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Daily Scores',
        },
        scales: {
          y: {
            min: 0,
            max: 7,
          },
        },
      },
    });
  },
};

window.onload = init();

playerSelect.onchange = function () {
  lineChart.destroy();
  makeDataCards.dailyAverage(playerSelect.value);
  console.log('Data Updated');
};
