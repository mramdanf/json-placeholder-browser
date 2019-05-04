import actionTypes from '../../store/actions/actionTypes'
import commectReducer from './commentReducer'

test('returns default initial state of {} when no action is passed', () => {
  const newState = commectReducer(undefined, {})
  expect(newState).toEqual({})
})
test('returns { commentList: [...] } when receiving action of type `SET_POST_COMMENTS`', () => {
  const commentList = [
    {
      postId: 1,
      id: 1,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium"
    },
    {
      postId: 1,
      id: 2,
      name: "quo vero reiciendis velit similique earum",
      email: "Jayne_Kuhic@sydney.com",
      body: "est natus enim nihil est dolore omnis voluptatem numquam et omnis occaecati quod ullam at voluptatem error expedita pariatur nihil sint nostrum voluptatem reiciendis et"
    },
  ]
  const action = {
    type: actionTypes.SET_POST_COMMENTS,
    payload: commentList,
  }
  const newState = commectReducer(undefined, action)
  expect(newState).toEqual({ commentList })
})