function isThunk(payload) {
    return typeof payload === 'function';
  }
  
  function createApiActionMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => (action) => {
      if (isThunk(action.payload)) {
        dispatch(Object.assign({}, action, {
          payload: action.meta && action.meta.initialPayload
            ? action.meta.initialPayload
            : null,
        }));
        return action.payload(dispatch, getState, extraArgument);
      }
      return next(action);
    };
  }
  
  const CreateApiActionMiddleware = createApiActionMiddleware();
  CreateApiActionMiddleware.withExtraArgument = createApiActionMiddleware;
  
  export default CreateApiActionMiddleware;
  