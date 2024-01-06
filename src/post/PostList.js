import { Post } from './Post';

const Postlist = ({ posts, Component, ...props }) => (
  posts.map((item) => (
    Component ? <Component key={item.key} post={item} type="home" />
      : (
        <Post
          key={item.key}
          maxWidth="md"
          content={item}
          {...props}
        />
      )
  )));

export default Postlist;
