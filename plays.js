const specialPlays = {
  fieldGoal: {
    baseDistance: 70,
    successChance: 85,
    time: 5
  },
  punt: {
    minDistance: 35,
    maxDistance: 50,
    time: 8
  },
  goForIt: {
    usesNormalPlay: true
  }
}
const playbook = {
  pass: [
    {
      name: "Short Pass",
      outcomes: [
        { name: "Complete", chance: 60, yards: [3, 8], time: [90, 120] },
        { name: "Interception", chance: 5, yards: -10, time: [5, 30] },
        { name: "Fumble", chance: 2, yards: -5, time: [10, 25] },
        { name: "Incomplete", chance: 33, yards: 0, time: [6, 12] }
      ]
    },
    {
      name: "Long Pass",
      outcomes: [
        { name: "Complete", chance: 20, yards: [15, 35], time: [25, 40] },
        { name: "Interception", chance: 10, yards: -15, time: [5, 20] },
        { name: "Sack", chance: 5, yards: -7, time: [20, 35] },
        { name: "Incomplete", chance: 65, yards: 0, time: [6, 12] }
      ]
    },
    {
      name: "Bomb",
      outcomes: [
        { name: "Complete", chance: 25, yards: [10, 20], time: [25, 40] },
        { name: "Interception", chance: 40, yards: [-3, 2], time: [20, 35] },
        { name: "Incomplete", chance: 30, yards: 0, time: [6, 12] },
        { name: "Fumble", chance: 5, yards: -8, time: [10, 25] }
      ]
    }
  ],

  run: [
    {
      name: "Run",
      outcomes: [
        { name: "Short Gain", chance: 70, yards: [2, 5], time: [25, 40] },
        { name: "Long Gain", chance: 15, yards: [10, 20], time: [35, 50] },
        { name: "Fumble", chance: 2, yards: -5, time: [10, 25] },
        { name: "Loss", chance: 13, yards: [-10, -1], time: [20, 30] }
      ]
    }
  ]
};