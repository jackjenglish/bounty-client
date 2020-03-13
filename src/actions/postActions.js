import axios from 'axios';
import actions from './actionTypes';
import simpleAction from './simpleAction';
import jwtHeader from '../utils/jwtHeader';

export function fetchPostData(slugId) {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/post/${slugId}`, {
        headers: jwtHeader()
      });
      console.log('post data', data);
      return dispatch({
        type: actions.POST_DATA_RECEIVED,
        payload: data
      });
    } catch (e) {}
  };
}

export const updateCommentText = simpleAction(actions.UPDATE_COMMENT_TEXT);

export function submitComment() {
  return async (dispatch, getState) => {
    try {
      const { postData, comment } = getState().post;

      const { data } = await axios.post(
        `/api/post/${postData.slugId}/comment`,
        {
          comment,
          postId: postData._id,
          postSlugId: postData.slugId
        },
        {
          headers: jwtHeader()
        }
      );

      return dispatch({
        type: actions.SUBMIT_COMMENT_SUCCESS,
        payload: data
      });
    } catch (e) {
      console.log('submit comment err', e);
    }
  };
}

export function setAccepted(commentId) {
  return async (dispatch, getState) => {
    try {
      const {
        postData: { slugId }
      } = getState().post;

      await axios.post(
        '/api/post/accept',
        {
          commentId,
          postSlugId: slugId
        },
        {
          headers: jwtHeader()
        }
      );

      return dispatch({
        type: actions.ACCEPT_REPLY_SUCCESS,
        payload: commentId
      });
    } catch (e) {}
  };
}

export function clearAccepted(commentId) {
  return async (dispatch, getState) => {
    try {
      const {
        postData: { _id }
      } = getState().post;

      await axios.post(
        `/api/post/accept-clear`,
        {
          commentId,
          postId: _id
        },
        {
          headers: jwtHeader()
        }
      );

      return dispatch({
        type: actions.CLEAR_ACCEPTED_REPLY_SUCCESS
      });
    } catch (e) {}
  };
}

export function upvoteComment(commentId) {
  return async dispatch => {
    try {
      await axios.get(`/api/comment/${commentId}/upvote`, {
        headers: jwtHeader()
      });

      return dispatch({
        type: actions.UPVOTE_SUCCESS,
        payload: commentId
      });
    } catch (e) {}
  };
}

export function clearUpvoteComment(commentId) {
  return async dispatch => {
    try {
      await axios.get(`/api/comment/${commentId}/clear-upvote`, {
        headers: jwtHeader()
      });

      return dispatch({
        type: actions.CLEAR_UPVOTE_SUCCESS,
        payload: commentId
      });
    } catch (e) {}
  };
}

export function submitPostReport(reportReason, reportText) {
  return async (dispatch, getState) => {
    try {
      const {
        post: { postData }
      } = getState();

      await axios.post(
        '/api/submit-report',
        {
          reportType: 'post',
          reportReason,
          reportText,
          subjectAuthorId: postData.author._id,
          subjectId: postData._id
        },
        {
          headers: jwtHeader()
        }
      );

      return dispatch({
        type: actions.SUBMIT_POST_REPORT_SUCCESS
      });
    } catch (e) {}
  };
}

export function submitCommentReport(commentId, reportReason, reportText) {
  return async (dispatch, getState) => {
    try {
      const {
        post: { postData }
      } = getState();

      await axios.post(
        '/api/submit-report',
        {
          reportType: 'comment',
          reportReason,
          reportText,
          subjectAuthorId: postData.author._id,
          subjectId: commentId
        },
        {
          headers: jwtHeader()
        }
      );

      return dispatch({
        type: actions.SUBMIT_POST_REPORT_SUCCESS
      });
    } catch (e) {}
  };
}

export function upvotePost(postSlugId) {
  return async dispatch => {
    try {
      await axios.get(`/api/post/${postSlugId}/upvote`, {
        headers: jwtHeader()
      });

      return dispatch({
        type: actions.UPVOTE_POST_SUCCESS,
        payload: postSlugId
      });
    } catch (e) {}
  };
}

export function clearUpvotePost(postSlugId) {
  return async dispatch => {
    try {
      await axios.get(`/api/post/${postSlugId}/clear-upvote`, {
        headers: jwtHeader()
      });

      return dispatch({
        type: actions.CLEAR_POST_UPVOTE_SUCCESS,
        payload: postSlugId
      });
    } catch (e) {}
  };
}
