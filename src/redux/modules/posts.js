const posts = (state = [], action) => {
  switch (action.type) {
    case '초기세팅':
      return action.payload;
    default:
      return state;
  }
};

export default posts;
