import axios from 'axios';

export function copiesHasErrored(bool) {
  return {
    type: 'COPIES_HAS_ERRORED',
    hasErrored: bool
  };
}

export function copiesIsLoading(bool) {
  return{
    type: 'COPIES_IS_LOADING',
    isLoading: bool
  }
}

export function copiesFetchDataSuccess(copies) {
  return{
    type: 'COPIES_FETCH_DATA_SUCCESS',
    copies: copies
  }
}

export function copiesFetchData( url ) {
  return (dispatch) => {
    dispatch (copiesIsLoading(true));

    axios.get(url)
      .then((response) => {

        dispatch(copiesIsLoading(false));
        console.log(response.data);
        return response.data;
      })
      .then((copies) => {
        dispatch(copiesFetchDataSuccess(copies))
      })
      .catch(() => dispatch(copiesHasErrored(true)));
  }
}

export function copyHasErrored(bool) {
  return {
    type: 'COPY_HAS_ERRORED',
    copyHasErrored: bool
  };
}

export function copyIsLoading(bool) {
  return{
    type: 'COPY_IS_LOADING',
    copyIsLoading: bool
  }
}

export function copyFetchDataSuccess(copy) {
  return{
    type: 'COPY_FETCH_DATA_SUCCESS',
    copy: copy
  }
}

export function copyFetchData( url ) {
  return (dispatch) => {
    dispatch (copyIsLoading(true));

    axios.get(url)
      .then((response) => {

        dispatch(copyIsLoading(false));
        console.log(response.data);
        return response.data;
      })
      .then((copy) => {
        dispatch(copyFetchDataSuccess(copy))
      })
      .catch(() => dispatch(copyHasErrored(true)));
  }
}
