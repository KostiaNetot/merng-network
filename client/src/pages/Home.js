import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Loader } from 'semantic-ui-react';

import { AuthContext } from './../context/auth';
import PostItem from './../components/PostItem';
import PostForm from './../components/PostForm';
import { FETCH_POSTS_QUERY } from './../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = data ? data.getPosts : null;


  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h2>Posts</h2>
      </Grid.Row>

      <Grid.Row style={{ paddingLeft: 14, paddingRight: 14 }}>
        {user && <PostForm />}        
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

export default Home
