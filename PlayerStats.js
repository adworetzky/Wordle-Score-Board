export default class PlayerStats {
  constructor(playerName, data) {
    this.playerName = playerName;
    this.pScores = this.makeScoreArray(data);
    this.pAvg = this.arrayAverage(this.pScores);
    this.pAvgYesterday = this.arrayAverageYesterday(this.pScores);
    this.percentChangeDay = this.percentChangeDay(
      this.pAvg,
      this.pAvgYesterday
    );
    this.pMissedDays = this.calculateMissedDays(this.pScores);
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
    let total = 0;
    data.forEach(function (item) {
      if (item) {
        total += parseFloat(item);
      } else {
      }
    });
    let avg = parseFloat(total / data.length);
    avg = avg.toFixed(3);
    return avg;
  }
  arrayAverageYesterday(data) {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        total += data[i];
      } else {
      }
    }
    let avg = parseFloat(total / (data.length - 1));
    avg = avg.toFixed(3);
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
}
