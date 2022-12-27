import { LOAD_SUBSCRIPTIONS, SET_SUBSCRIPTIONS_PAGE, UPDATE_SUBSCRIPTION } from './types';

export function loadSubscriptions (data) {
  return {
    type: LOAD_SUBSCRIPTIONS,
    payload: data,
  }
}

export function updateSubscription (data) {
  return {
    type: UPDATE_SUBSCRIPTION,
    payload: data,
  }
}

export function setSubscriptionsPage (data) {
  return {
    type: SET_SUBSCRIPTIONS_PAGE,
    payload: data,
  }
}
