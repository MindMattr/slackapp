const mongoose = require('mongoose');

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayString = yesterday.toISOString().slice(0, 10);

const usersSchema = mongoose.Schema(
  {
    _id: String,
    team: { id: String, name: String },
    enterprise: { id: String, name: String },
    user: { token: String, scopes: [String], id: String },
    tokenType: String,
    isEnterpriseInstall: Boolean,
    appId: String,
    authVersion: String,
    bot: {
      scopes: [
        String,
      ],
      token: String,
      userId: String,
      id: String,
    },
    managers: [],
    dailyCheckIn: [],
    dailyCheckOut: [],
    latestEmployeeCheckIn: [],
    latestPoll: [],

    monthlyEmployeeCheckin: [],
    monthlyPolls: [],
    monthlyDailyCheckIn: [],
    monthlyDailyCheckOut: [],
  },
  { _id: false },
);

const User = mongoose.model('mindirrusers', usersSchema);

module.exports = {
  User,

};
