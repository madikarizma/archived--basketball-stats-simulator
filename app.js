var app = new Vue({
  el: '#app',
  data: {
    record: {
      w: 0,
      l: 0
    },
    gameStats: [],
    seasonStats: {
      pts: 0,
      reb: 0,
      ast: 0,
      blk: 0,
      stl: 0
    },
    perGameStats: {
      pts: 0,
      reb: 0,
      ast: 0,
      blk: 0,
      stl: 0
    },
    player: {
      name: {
        first: 'Scott',
        last: 'Blanchard'
      },
      ratings: {
        pts: 93,
        reb: 55,
        ast: 90,
        blk: 15,
        stl: 87
      }
    }
  },
  methods: {
    generateStat(minValue, maxValue) {
      return Math.round(Math.random() * (maxValue - minValue) + minValue);
    },
    updatePerGameStats() {
      const gamesPlayed = this.gameStats.length;
      this.perGameStats.pts = this.seasonStats.pts / gamesPlayed;
      this.perGameStats.reb = this.seasonStats.reb / gamesPlayed;
      this.perGameStats.ast = this.seasonStats.ast / gamesPlayed;
      this.perGameStats.blk = this.seasonStats.blk / gamesPlayed;
      this.perGameStats.stl = this.seasonStats.stl / gamesPlayed;

      this.perGameStats.pts = Math.round(this.perGameStats.pts * 100) / 100;
      this.perGameStats.reb = Math.round(this.perGameStats.reb * 100) / 100;
      this.perGameStats.ast = Math.round(this.perGameStats.ast * 100) / 100;
      this.perGameStats.blk = Math.round(this.perGameStats.blk * 100) / 100;
      this.perGameStats.stl = Math.round(this.perGameStats.stl * 100) / 100;

      this.perGameStats.pts = this.perGameStats.pts.toFixed(2);
      this.perGameStats.reb = this.perGameStats.reb.toFixed(2);
      this.perGameStats.ast = this.perGameStats.ast.toFixed(2);
      this.perGameStats.blk = this.perGameStats.blk.toFixed(2);
      this.perGameStats.stl = this.perGameStats.stl.toFixed(2);
    },
    updateSeasonStats(gameStats) {
      this.seasonStats.pts += gameStats.pts;
      this.seasonStats.reb += gameStats.reb;
      this.seasonStats.ast += gameStats.ast;
      this.seasonStats.blk += gameStats.blk;
      this.seasonStats.stl += gameStats.stl;
      this.updatePerGameStats();
    },
    createGameStats() {
      const isWin = (Math.random() > .5);

      if (isWin) {
        this.record.w++;
      } else {
        this.record.l++
      }

      const result = isWin ? 'W' : 'L';

      const record = {
        ...this.record
      };

      const gameStats = {
        result,
        record,
        pts: this.generateStat(6, 24),
        reb: this.generateStat(1, 8),
        ast: this.generateStat(4, 12),
        blk: this.generateStat(0, 1),
        stl: this.generateStat(0, 3),
      };
      this.gameStats.push(gameStats);
      this.updateSeasonStats(gameStats);
    },
    simulateNextGame() {
      const gamesPlayed = this.gameStats.length;

      if (this.gameStats.length < 82) {
        this.createGameStats();
      }
    },
    simulateRemainingGames() {
      const gamesPlayed = this.gameStats.length;

      if (this.gameStats.length < 82) {
        const remainingGames = 82 - gamesPlayed;

        for (var i = 0; i < remainingGames; i++) {
          this.createGameStats();
        }
      }
    }
  }
})
