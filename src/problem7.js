function getRecommendedFriendList({ user, friends, visitors }) {
  const friendInfo = getFriendInfo(friends);
  const recommendScoreInfo = getRecommendScoreInfo({
    userId: user,
    friendInfo,
    visitors,
  });
  const userFriends = friendInfo[user] ?? [];

  return Object.entries(recommendScoreInfo)
    .filter(([id]) => !userFriends.includes(id))
    .filter(([_, score]) => score > 0)
    .sort(compare)
    .map(([id]) => id)
    .slice(0, 5);
}

function getFriendInfo(friends) {
  const friendInfo = {};

  friends.forEach(([id_A, id_B]) => {
    addFriend({ userId: id_A, friendId: id_B }, friendInfo);
    addFriend({ userId: id_B, friendId: id_A }, friendInfo);
  });

  return friendInfo;
}

function addFriend({ userId, friendId }, friendInfo) {
  if (friendInfo[userId]) {
    friendInfo[userId].push(friendId);
  } else {
    friendInfo[userId] = [friendId];
  }
}

function getRecommendScoreInfo({ userId, friendInfo, visitors }) {
  const recommendScoreInfo = {};

  calcRecommendScoreByFriends({ userId, friendInfo, recommendScoreInfo });
  calcRecommendScoreByVisitors({ userId, visitors, recommendScoreInfo });

  return recommendScoreInfo;
}

function calcRecommendScoreByFriends({
  userId,
  friendInfo,
  recommendScoreInfo,
}) {
  const userFriends = friendInfo[userId] ?? [];

  Object.entries(friendInfo)
    .filter(([id]) => isNotUser(id, userId))
    .forEach(([id, friends]) => {
      friends
        .filter(friendId => isTogetherKnowFriend(userFriends, friendId))
        .forEach(_ => {
          if (recommendScoreInfo[id]) {
            recommendScoreInfo[id] += 10;
          } else {
            recommendScoreInfo[id] = 10;
          }
        });
    });
}

function isNotUser(id, userId) {
  return id !== userId;
}

function isTogetherKnowFriend(userFriends, friendId) {
  return userFriends.includes(friendId);
}

function calcRecommendScoreByVisitors({
  userId,
  visitors,
  recommendScoreInfo,
}) {
  visitors
    .filter(visitorId => isNotUser(visitorId, userId))
    .forEach(visitorId => {
      if (recommendScoreInfo[visitorId]) {
        recommendScoreInfo[visitorId]++;
      } else {
        recommendScoreInfo[visitorId] = 1;
      }
    });
}

function compare([id_A, score_A], [id_B, score_B]) {
  if (score_A === score_B) {
    return id_A > id_B ? 1 : -1;
  }

  return score_B - score_A;
}

function problem7(user, friends, visitors) {
  const answer = getRecommendedFriendList({ user, friends, visitors });

  return answer;
}

module.exports = problem7;
