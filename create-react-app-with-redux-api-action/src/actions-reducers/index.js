import { handleActions, combineActions } from 'redux-actions';

import PlacementifyAction from '../helpers/create-api-action';
import UltronProjectCandidate from '../models/ultron/projectCandidate';

const getParams = {
  type: 'GET_POSTS',
  method: 'GET',
  payloadCreator: (apiParams) => ProjectCandidate.fetchCommentList(apiParams)
};

const getPlacementifyAction = PlacementifyAction(getParams);

const postParams = {
  type: 'POST_CANDIDATE_COMMENTS',
  method: 'POST',
  payloadCreator: (apiParams) => ProjectCandidate.createComment(apiParams)
};

const postPlacementifyAction = PlacementifyAction(postParams);

let {
  success: GET_CANDIDATE_COMMENTS_SUCCESS,
  failure: GET_CANDIDATE_COMMENTS_FAILURE,
  request: GET_CANDIDATE_COMMENTS_REQUEST
} = getPlacementifyAction.meta.placementifyActions;

let {
  success: POST_CANDIDATE_COMMENTS_SUCCESS,
  failure: POST_CANDIDATE_COMMENTS_FAILURE,
  request: POST_CANDIDATE_COMMENTS_REQUEST
} = postPlacementifyAction.meta.placementifyActions;

const defaultState = { loading: false, error: "", comments: [] };

const reducer = handleActions(
  new Map([
    [
      GET_CANDIDATE_COMMENTS_SUCCESS,
      (state, action) => ({
        loading: false,
        comments: [ ...action.payload, ...state.comments ]
      })
    ],
    [
      POST_CANDIDATE_COMMENTS_SUCCESS,
      (state, action) => ({
        loading: false,
        comments: [ action.payload, ...state.comments ]
      })
    ],
    [
      combineActions(
        GET_CANDIDATE_COMMENTS_FAILURE,
        POST_CANDIDATE_COMMENTS_FAILURE
      ),
      (state, action) => ({
        ...state,
        loading: false,
        error: action.payload
      })
    ],
    [
      GET_CANDIDATE_COMMENTS_REQUEST,
      () => ({
        ...defaultState,
        loading: true
      })
    ],
    [
      POST_CANDIDATE_COMMENTS_REQUEST,
      (state) => ({
        ...state,
        loading: true
      })
    ]
  ]),
  defaultState
);

export {
  reducer as CandidateCommentsReducer,
  GET_CANDIDATE_COMMENTS_REQUEST,
  POST_CANDIDATE_COMMENTS_REQUEST
}
