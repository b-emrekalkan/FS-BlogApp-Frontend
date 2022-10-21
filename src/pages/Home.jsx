import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { BlogContext } from '../context/BlogContext';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid } from '@mui/material';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useNavigate } from "react-router-dom";
import { toastErrorNotify } from '../helper/ToastNotify';

const Home = () => {
  const { currentUser } = useContext(AuthContext)
  console.log(currentUser);

  const { getBlogs, blogs } = useContext(BlogContext)

  useEffect(() => {
    getBlogs();

  }, [])

  const navigate = useNavigate()
  const openDetails = (slug) => {
    if (!currentUser) {
      toastErrorNotify("Login for details of blog!");
    } else {
      navigate(`/details/${slug}`, {state: { slug }})
    }
  }
  return (
    <div>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        {blogs.map((blog) => (
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <Card sx={{ maxWidth: 345, height: 457, position: "relative" }}>
              <CardHeader
                avatar={
                  <Avatar alt="Emre Sharp" aria-label="blog" sx={{ bgcolor: red[500] }} />

                }
                title={blog.author}
                subheader={blog.last_updated_date.slice(0, 10)}
              />
              <div style={{ cursor: "pointer" }} onClick={() => openDetails(blog.slug)}>

                <CardMedia
                  component="img"
                  height="194"
                  image={blog.image}
                  alt={blog.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                  </Typography>
                  <Typography sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                  }} variant="body2" color="text.secondary">
                    {blog.content}
                  </Typography>
                </CardContent>
              </div>
              <CardActions disableSpacing sx={{ position: "absolute", bottom: "5px", left: "5px" }}>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                  <Typography sx={{ marginLeft: 1 }}>
                    {blog.like_count}
                  </Typography>
                </IconButton>
                <IconButton aria-label="comment">
                  <ChatOutlinedIcon />
                  <Typography sx={{ marginLeft: 1 }}>
                    {blog.comment_count}
                  </Typography>
                </IconButton>
                <IconButton aria-label="view">
                  <RemoveRedEyeOutlinedIcon />
                  <Typography sx={{ marginLeft: 1 }}>
                    {blog.post_view_count}
                  </Typography>
                </IconButton>
              </CardActions>
            </Card>

          </Grid>))}
      </Grid>

    </div>
  )
}

export default Home