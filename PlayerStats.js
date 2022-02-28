export default class PlayerStats {
  constructor(playerName, data) {
    this.playerName = playerName;
    this.pScores = this.makeScoreArray(data);
    this.pAvg = this.arrayAverage(this.pScores);
    this.pAvg10Day = this.avg10Day(this.pScores);
    this.pAvg10DayYesterday = this.avg10DayYesterday(this.pScores);
    this.pAvgYesterday = this.arrayAverageYesterday(this.pScores);
    this.perChangeDay = this.percentChangeDay(this.pAvg, this.pAvgYesterday);
    this.perChange10Day = this.percentChangeDay(
      this.pAvg10Day,
      this.pAvg10DayYesterday
    );
    this.pMissedDays = this.calculateMissedDays(this.pScores);
    this.pBestScore = this.findBestScore(this.pScores);
    this.historicalAvg = this.historicalAvg(this.pScores);
  }
  makeScoreArray(data) {
    let tempArr = [];
    data.forEach((element) => {
      if (element[this.playerName]) {
        tempArr.push(parseInt(element[this.playerName]));
      } else {
        tempArr.push('');
      }
    });
    return tempArr;
  }
  arrayAverage(data) {
    var numbers = data.filter(numbersOnly);
    function numbersOnly(value) {
      if (typeof value === 'number') {
        return value;
      }
    }
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i]) {
        total += numbers[i];
      } else {
      }
    }
    let avg = parseFloat(total / numbers.length);
    avg = avg.toFixed(3);
    return parseFloat(avg);
  }
  arrayAverageYesterday(data) {
    var numbers = data.filter(numbersOnly);
    function numbersOnly(value) {
      if (typeof value === 'number') {
        return value;
      }
    }
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i]) {
        total += numbers[i];
      } else {
      }
    }
    let avg = parseFloat(total / (numbers.length - 1));
    avg = avg.toFixed(3);
    return parseFloat(avg);
  }
  avg10Day(data) {
    let total = 0;
    var numbers = data.filter(numbersOnly);
    function numbersOnly(value) {
      if (typeof value === 'number') {
        return value;
      }
    }
    for (let i = 1; i <= 10; i++) {
      if (numbers[numbers.length - i]) {
        total += numbers[numbers.length - i];
      } else {
      }
    }
    let avg = total / 10;
    return parseFloat(avg.toFixed(3));
  }
  avg10DayYesterday(data) {
    let total = 0;
    var numbers = data.filter(numbersOnly);
    function numbersOnly(value) {
      if (typeof value === 'number') {
        return value;
      }
    }
    for (let i = 2; i <= 11; i++) {
      if (numbers[numbers.length - i]) {
        total += numbers[numbers.length - i];
      } else {
      }
    }
    let avg = total / 10;
    return parseFloat(avg.toFixed(3));
  }
  percentChangeDay(todayAvg, yesterdayAvg) {
    let res = ((todayAvg - yesterdayAvg) / todayAvg) * 100.0;
    res = res.toFixed(3);
    return parseFloat(res);
  }

  calculateMissedDays(scoreArray) {
    let counter = 0;
    for (let i = 0; i < scoreArray.length; i++) {
      if (scoreArray[i] < 1) {
        counter++;
      }
    }
    return counter;
  }
  findBestScore(data) {
    var numbers = data.filter(numbersOnly);
    function numbersOnly(value) {
      if (typeof value === 'number') {
        return value;
      }
    }
    let min = Math.min(...numbers);
    return min;
  }
  historicalAvg(data) {
    let historicalAvgArr = [];
    var numbers = data.filter(numbersOnly);
    function numbersOnly(value) {
      if (typeof value === 'number') {
        return parseFloat(value);
      }
    }
    let total;

    for (let i = 0; i < numbers.length; i++) {
      if (i > 0) {
        let avg = 0;
        total += parseFloat(numbers[i]);
        avg = total / (i + 1);
        historicalAvgArr.push(parseFloat(avg.toFixed(3)));
      } else {
        total = parseFloat(numbers[i].toFixed(3));
        historicalAvgArr.push(total);
      }
    }
    return historicalAvgArr;
  }
}
