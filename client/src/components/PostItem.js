import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Button, Image } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from './../context/auth';
import LikeBtn from './LikeBtn';


function PostItem({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {

  const { user } = useContext(AuthContext);

  const likePost = () => {
    console.log('likePost');
  };

  const commentPost = () => {
    console.log('commentPost');
  };

    return (
      <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>{ username }</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>{ moment(createdAt).fromNow() }</Card.Meta>
          <Card.Description>{ body }</Card.Description>
        </Card.Content>
        <Card.Content extra>

          <LikeBtn user={user} post={{ id, likes, likeCount }}/>
      
          <Button as='div' labelPosition='right' className='post-button'>
            <Button color='blue' basic as={Link} to={`/posts/${id}`}>
              <Icon name='comments' />
            </Button>
            <Label basic color='blue' pointing='left' style={{cursor: 'default'}}>
              { commentCount }
            </Label>
          </Button>

        {user && user.username === username && (
          <Button as='div' color='red' onClick={() => console.log('deletepost')} floated='right' style={{ marginRight: 0 }} >
            <Icon name='trash' style={{ margin: 0 }} />
          </Button>
        )}

        </Card.Content>
      </Card>
    )
}

export default PostItem
