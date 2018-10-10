import assign from 'lodash/assign';
import { createAction } from 'redux-actions';

const CreateApiAction = ({ type, method, payloadCreator, metaCreator }) => {
    const action = {
      type
    };

    if (typeof metaCreator === 'function') {
      action.meta = metaCreator(action.payload);
    }

    const types = ['SUCCESS', 'FAILURE', 'REQUEST'].map(actionType => type.concat(`_${method.toUpperCase()}_${actionType}`));

    const success = createAction(types[0]);
    const failure = createAction(types[1]);
    const request = createAction(
      types[2],
      apiParams => dispatch => {
        payloadCreator(apiParams)
          .then(response => dispatch(success(response.data)))
          .catch(error => dispatch(failure(error.response)));
      },
      payload => ({ initialPayload: payload })
    );

    action.meta = assign({}, action.meta, {
      api: true,
      method,
      types,
      placementifyActions: {
        success,
        failure,
        request
      }
    });

    return action;
}

export default CreateApiAction;
