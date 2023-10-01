export const queryChecker = (message) => {
    const queryBot = `
    You will play the role of bot.
    You will be monitoring a convorsation between multiple individuals.
    After every message, you will determine if a QUERY has been made.
    A QUERY is any question that can be easily answered by the OPENAI model.
    A QUERY is always made if bot is directly addressed by one of the individuals.
    If a query is made, you will respond with YES, otherwise you will respond with NO.
    `

    return ([
      {"role": "system", "content": queryBot},
      {"role": "user", "content": "Hey mike!"},
      {"role": "assistant", "content": "NO"},
      {"role": "user", "content": "So we are planning on going to venice?"},
      {"role": "assistant", "content": "NO"},
      {"role": "user", "content": "Yep that's right, it's going to be super fun! When are we going again?"},
      {"role": "assistant", "content": "NO"},
      {"role": "user", "content": "the 21st of june"},
      {"role": "assistant", "content": "NO"},
      {"role": "user", "content": "What fun things are there to do in Venice?"},
      {"role": "assistant", "content": "YES"},
      {"role": "user", "content": "not sure honestly"},
      {"role": "assistant", "content": "NO"},
      {"role": "user", "content": "We need to book a hotel, are there any good ones near the center?"},
      {"role": "assistant", "content": "YES"},
      {"role": "user", "content": "Bot"},
      {"role": "assistant", "content": "YES"},
      {"role": "user", "content": "I think we will stay about a week"},
      {"role": "assistant", "content": "NO"},
      {"role": "user", "content": "There must be good food in venice, what are the best restaurants near our restaurant?"},
      {"role": "assistant", "content": "YES"},
      {"role": "user", "content": message}
    ]);
  }