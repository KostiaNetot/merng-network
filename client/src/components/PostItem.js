import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Button, Image } from 'semantic-ui-react';
import moment from 'moment';


function PostItem({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {

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

          <Button as='div' labelPosition='right' className='post-button'>
            <Button color='teal' basic onClick={ likePost }>
              <Icon name='heart' />
              Like
            </Button>
            <Label basic color='teal' pointing='left' style={{cursor: 'default'}}>
              { likeCount }
            </Label>
          </Button>
      
          <Button as='div' labelPosition='right' className='post-button'>
            <Button color='blue' basic onClick={ commentPost }>
              <Icon name='comments' />
            </Button>
            <Label basic color='blue' pointing='left' style={{cursor: 'default'}}>
              { commentCount }
            </Label>
          </Button>
      
        </Card.Content>
      </Card>
    )
}

export default PostItem
