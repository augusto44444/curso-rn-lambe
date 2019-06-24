import { SET_POSTS, ADD_COMMENT, CREATING_POST, POST_CREATED } from './actionsTypes'
import Axios from 'axios';
import { setMessage } from './message'

export const addPost = post => {
    return (dispatch, getState) => {
        dispatch(creatingPost())
        Axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-cloneinsta-b29e7.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => {
                dispatch(setMessage({
                    title: 'erro!',
                    text: err
                }))
            })
            .then(res => {
                post.image = res.data.imageUrl
                Axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'erro!',
                            text: err
                        }))
                    })
                    .then(res => {
                        dispatch(fetchPosts())
                        dispatch(postCreated())
                    })
            })
    }
    // return {
    //     type: ADD_POST,
    //     payload: post
    // }
}

export const addComment = payload => {
    return (dispatch, getState) => {
        Axios.get(`/posts/${payload.postId}.json?auth=${getState().user.token}`)
            .catch(err => {
                dispatch(setMessage({
                    title: 'erro!',
                    text: err
                }))
            })
            .then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)
                Axios.patch(`/posts/${payload.postId}.json`, { comments })
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'erro!',
                            text: err
                        }))
                    })
                    .then(res => {
                        dispatch(fetchPosts())
                    })
            })
    }
}


export const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

export const fetchPosts = () => {
    return dispatch => {
        Axios.get('/posts.json')
            .catch(err => [
                dispatch(setMessage({
                    title: 'erro!',
                    text: err
                }))
            ])
            .then(res => {
                const rawPosts = res.data
                const posts = []
                for (let key in rawPosts) {
                    posts.push({
                        ...rawPosts[key],
                        id: key
                    })
                }

                dispatch(setPosts(posts.reverse()))
            })
    }
}


export const creatingPost = () => {
    return {
        type: CREATING_POST,

    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED
    }
}