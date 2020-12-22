import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import moment from 'moment';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from './../util/graphql';
import { Grid, Loader, Image, Card, Button, Label, Icon, Form } from 'semantic-ui-react';
import LikeBtn from './../components/LikeBtn';
import { AuthContext } from './../context/auth';
import DeleteBtn from './../components/DeleteBtn';

function PostPage(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  const [ createComment ] = useMutation(CREATE_COMMENT_MUTATION, {
    update(){
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });
  
  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;

  if(!data) {
    postMarkup = <Loader active />
  } else {
    const { id, body, createdAt, username, comments, likes, commentCount, likeCount } = data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
              size='small'
              float='right'
            /> 
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{ username }</Card.Header>
                <Card.Meta>{ moment(createdAt).fromNow() }</Card.Meta>
                <Card.Description>{ body }</Card.Description>
              </Card.Content>
              <hr/> 
              <Card.Content extra>
                <LikeBtn user={user} post={{ id, likeCount, likes }} />
                <Button
                  as='div'
                  labelPosition='right'
                  onClick={() => console.log('commm on post')}
                >
                  <Button basic color='blue'>
                    <Icon name='comments' />
                  </Button>
                  <Label basic color='blue' pointing='left'>
                    { commentCount }
                  </Label>
                </Button>
                {(user && user.username === username) && (
                  <DeleteBtn postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>

            {user && (
              <Card fluid>
                <Card.Content>
                  <Form>
                    <div className="ui action input fluid">
                      <input 
                        type="text"
                        placeholder='Write your comment here...'
                        name='comment'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button
                        type='submit'
                        className='ui button teal'
                        disabled={comment.trim() === ''}
                        onClick={createComment}
                        ref={commentInputRef}
                      >
                        Comment
                      </button>
                    </div>
                  </Form>  
                </Card.Content>                
              </Card>
            )}      

            {comments.map(comment => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteBtn postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return postMarkup;
}

  const CREATE_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!){
      createComment(postId: $postId, body: $body) {
        id
        comments{
          id body createdAt username
        }
        commentCount
      }
    }
  `;

  const FETCH_POST_QUERY = gql`
    query($postId: ID!){
      getPost(postId: $postId){
        id body createdAt username likeCount
        likes{
          username
        }
        commentCount
        comments{
          id username createdAt body
        }
      }
    }
  `;

export default PostPage
