import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid, Loader } from 'semantic-ui-react';

import PostItem from './../components/PostItem';

function Home() {
  // const { loading, data: { getPosts: posts } } = useQuery(FETCH_POSTS_QUERY);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = data ? data.getPosts : null;


  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h2>Posts</h2>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <Loader active inline='centered' />
        ) : (
          posts && posts.map(post => (
            <Grid.Column key={post.id} style={{ marginBottom: 18 }}>
              <PostItem post={post} />
            </Grid.Column>
          )) 
        )}
      </Grid.Row>
    </Grid>    
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts{
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

export default Home
