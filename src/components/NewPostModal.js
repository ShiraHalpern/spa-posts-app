import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

export default function NewPostDialog({
  openDialog,
  handleCloseDialog,
  handlePost,
  postTitle,
  postContent,
  setPostTitle,
  setPostContent,
}) {
  const useDialogStyles = makeStyles((theme) => ({
    paper: { width: "100%", height: "80%" },
  }));
  const DialogClasses = useDialogStyles();

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
      classes={DialogClasses}
    >
      <DialogTitle id="form-dialog-title">New Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="title"
          label="Your Title"
          type="text"
          fullWidth
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          id="outlined-multiline-static"
          label="Your Words"
          multiline
          rows={20}
          variant="outlined"
          type="text"
          fullWidth
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePost} color="primary">
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}
