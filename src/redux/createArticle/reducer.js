

const initialState = {
  title: '',
  content: '',
  error: {
    status: 0,
    message: '',
  },
  success: false,
  author: null,
  languages: [],
}

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};