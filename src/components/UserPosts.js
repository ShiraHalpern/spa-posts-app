import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NewPostDialog from "./NewPostModal";

export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then((response) => response.json())
      .then((json) => setPosts(json))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  const usePaperStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(3),
        width: theme.spacing(60),
        height: theme.spacing(70),
      },
    },
    title: {
      fontWeight: "800",
      padding: "30px",
      fontSize: "30px",
    },
    body: {
      padding: "30px",
      fontSize: "20px",
    },
  }));

  const PaperClasses = usePaperStyles();

  const handleOpenDialog = function handleOpenDialog() {
    setOpenDialog(true);
  };

  function handleCloseDialog() {
    setOpenDialog(false);
    setPostTitle("");
    setPostContent("");
  }

  function handlePost() {
    if (postContent === "" || postTitle === "") return;
    let nextId = posts[0]
      ? posts
          .map((post) => post.id)
          .reduce((a, b) => {
            return Math.max(a, b);
          }) + 1
      : 1;
    console.log("nextId:", nextId);
    const postObj = {
      id: nextId,
      userId: id,
      body: postContent,
      title: postTitle,
    };

    setPosts([postObj, ...posts]);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postObj),
    })
      .then(() => {
        console.log("new post added");
        handleCloseDialog();
      })
      .catch((err) => console.log("failed to post", err));
  }

  return (
    <div>
      <h2>All {id}'s posts</h2>
      <AddCircleIcon onClick={handleOpenDialog} />
      {posts &&
        posts.map((post) => (
          <div key={post.id} className={PaperClasses.root}>
            <Paper variant="outlined">
              <div className={PaperClasses.title}>{post.title}</div>
              <div className={PaperClasses.body}>{post.body}</div>
            </Paper>
          </div>
        ))}

      <NewPostDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handlePost={handlePost}
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postContent={postContent}
        setPostContent={setPostContent}
      />
    </div>
  );
}
