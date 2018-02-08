import axios from 'axios';

function copiesIsLoading(bool) {
  return {
    type: 'COPIES_ARE_LOADING',
    isLoading: bool
  }
}

function copiesHasErrored(message) {
  return {
    type: 'COPY_HAS_ERRORED',
    message: message
  }
};

export function copies(copies) {
  return {
    type: 'COPIES',
    copies: copies
  }
}

export function getAllCopies(page = 0) {
  return (dispatch) => {
    dispatch(copiesIsLoading(true));
    axios.get('//marcopromo.api/copies/?paged='+page)
      .then((response) => {
        dispatch(copies(response.data));
      }).catch((e) => {
        let response = JSON.parse(e.response.request.response);
        dispatch(copiesHasErrored(response.message));
      });

    dispatch(copiesIsLoading(false));
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
