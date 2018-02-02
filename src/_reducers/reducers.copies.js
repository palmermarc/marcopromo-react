export function copiesHasErrored(state = false, action) {
  switch (action.type) {
    case 'COPIES_HAS_ERRORED' :
      return action.hasErrored;
    default:
      return state;
  }
}

export function copiesIsLoading(state = false, action) {
  switch (action.type) {
    case 'COPIES_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function copies(state = [], action) {
  switch (action.type) {
    case 'COPIES_FETCH_DATA_SUCCESS':
      return action.copies;
    default:
      return state;
  }
}

export function copyHasErrored(state = false, action) {
  switch (action.type) {
    case 'COPY_HAS_ERRORED' :
      return action.copyHasErrored;
    default:
      return state;
  }
}

export function copyIsLoading(state = false, action) {
  switch (action.type) {
    case 'COPY_IS_LOADING':
      return action.copyIsLoading;
    default:
      return state;
  }
}

export function copy(state = [], action) {
  switch (action.type) {
    case 'COPY_FETCH_DATA_SUCCESS':
      return action.copy;
    default:
      return state;
  }
}