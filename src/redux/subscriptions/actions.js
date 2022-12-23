import { LOAD_SUBSCRIPTIONS, UPDATE_SUBSCRIPTION } from './types';

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
