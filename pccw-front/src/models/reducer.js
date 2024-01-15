import {createReducer } from '@reduxjs/toolkit';

import { fetchMessagesExchange, fetchConversations } from './actions';

const initialState = {
  messagesExchange: [], 
  users: [],
  loading: false,
  error: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMessagesExchange, (state, action) => {
      console.log('fetchMessagesExchange ');
      state.loading = true;
    })
    .addCase(fetchMessagesExchange.succeeded, (state, action) => {
      console.log('fetchMessagesExchange.succeeded ');
      state.messagesExchange = action.payload;
      state.loading = false;
    })
    .addCase(fetchMessagesExchange.failed, (state, action) => {
      console.log('fetchMessagesExchange.failed ');
      state.error = action.payload;
      state.loading = false;
    })
    .addCase(fetchConversations, (state, action) => {
      console.log('fetchConversations ');
      state.loading = true;
    })
    .addCase(fetchConversations.succeeded, (state, action) => {
      console.log('fetchConversations.succeeded ');
      state.users = action.payload;
      state.loading = false;
    })
    .addCase(fetchConversations.failed, (state, action) => {
      console.log('fetchConversations.failed ');
      state.error = action.payload;
      state.loading = false;
    })
    .addDefaultCase((state, action) => {
      console.log("🚀 ~ .addDefaultCase ~ state:", state)
      console.log("🚀 ~ .addDefaultCase ~ action:", action)
      
    });
});

export default reducer;
