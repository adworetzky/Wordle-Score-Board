export default class PlayerStats {
  constructor(playerName, data) {
    this.playerName = playerName;
    this.pScores = this.makeScoreArray(data);
    this.pAvg = this.arrayAverage(this.pScores);
    this.pAvg10Day = this.avg10Day(this.pScores);
    this.pAvgYesterday = this.arrayAverageYesterday(this.pScores);
    this.percentChangeDay = this.percentChangeDay(
      this.pAvg,
      this.pAvgYesterday
    );
    this.pMissedDays = this.calculateMissedDays(this.pScores);
    this.pBestScore = this.findBestScore(this.pScores);
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
    return avg;
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
    return avg;
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
    return avg;
  }
  percentChangeDay(todayAvg, yesterdayAvg) {
    let res = ((todayAvg - yesterdayAvg) / todayAvg) * 100.0;
    res = res.toFixed(3);
    return res;
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
}
