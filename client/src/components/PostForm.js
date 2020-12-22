import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from './../util/hooks';
import { FETCH_POSTS_QUERY } from './../util/graphql';

function PostForm() {

  const { values, onInputChange, onSubmit } = useForm(createPostCallBack, {
    body: ''
  });

  const [ createPost, { error } ] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] }
      });
      values.body = '';
    },
    onError(err) {
      console.log(err);
    }
  });

  function createPostCallBack(){
    createPost();
  }

    return (
      <>
        <Form onSubmit={onSubmit} style={{ width: '100%' }}>
          <h3>Post form</h3>
          <Form.Field>
            <Form.Input
              placeholder='What is on your mind?'
              name='body'
              onChange={onInputChange}
              value={values.body}
              error={error ? true : false}
            />
          <Button type='submit' color='teal'>
            Create  
          </Button>  
          </Form.Field>
        </Form>   
        {error && (
          <div className="ui error message">
            <ul className='list'>
              <li>{ error.graphQLErrors[0].message }</li>
            </ul>
          </div>
        )}
      </>   
    )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!){
    createPost(body: $body) {
      id body createdAt username
      likes{
        id username createdAt
      }
      likeCount
      comments{
        id body username
      }
      commentCount
    }
  }
`;

export default PostForm
