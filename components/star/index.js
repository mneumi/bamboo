Component({
  properties: {
    score: Number,
  },
  methods: {
    computeScore() {
      const score = Math.round(this.properties.score);
      return new Array(5).fill(0).fill(1,0,score);
    }
  },
  attached() {
    this.setData({
      scoreArray: this.computeScore()
    });
  }
})
