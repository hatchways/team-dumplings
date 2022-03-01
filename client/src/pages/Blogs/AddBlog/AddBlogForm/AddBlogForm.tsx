import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import useStyles from './useStyles';
import { Grid, InputLabel, TextField, IconButton, Input, Button } from '@material-ui/core';
import { CustomButton } from '../../../../components/Button/CustomButton';
import { PhotoCamera } from '@material-ui/icons';
import { useState, useRef } from 'react';

interface Props {
  handleSubmit: (data: FormData) => void;
}

function AddBlogForm({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();
  const fileRef = useRef<any>(null);

  const onUploadClick = () => {
    fileRef.current?.click();
  };

  return (
    <>
      <Formik
        initialValues={{
          image: '',
          title: '',
          description: '',
        }}
        validationSchema={Yup.object().shape({
          image: Yup.string().required('This field can not be blank'),
          title: Yup.string().required('This field can not be blank'),
          description: Yup.string().required('This field can not be blank'),
        })}
        onSubmit={(values) => {
          //eslint-disable-next-line prefer-const
          let data = new FormData();
          data.append('image', values.image);
          data.append('title', values.title);
          data.append('description', values.description);
          handleSubmit(data);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
          <Form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container direction="column" spacing={2}>
              <Grid item container justifyContent="space-evenly">
                <label htmlFor="icon-button-file">
                  <InputLabel className={classes.label}>upload image</InputLabel>
                  <TextField
                    id="image"
                    name="image"
                    value={Object(values.image).name}
                    onChange={handleChange}
                    error={Boolean(errors.image)}
                    helperText={errors.image}
                    InputProps={{
                      classes: { input: classes.inputs },
                      disableUnderline: true,
                    }}
                  />
                  <Input
                    inputRef={fileRef}
                    type="file"
                    name="image"
                    style={{ display: 'none' }}
                    disableUnderline={true}
                    placeholder="Select an image"
                    onChange={(event: any) => setFieldValue('image', event.target.files[0])}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={onUploadClick}
                    className={classes.iconButton}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
                <Grid item>
                  <InputLabel className={classes.label}>title</InputLabel>
                  <TextField
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    error={Boolean(errors.title)}
                    helperText={errors.title}
                    InputProps={{
                      classes: { input: classes.inputs },
                      disableUnderline: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item container justify="space-evenly">
                <Grid item>
                  <InputLabel className={classes.label}>description</InputLabel>
                  <TextField
                    id="description"
                    name="description"
                    multiline
                    rows={5}
                    value={values.description}
                    onChange={handleChange}
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                    InputProps={{
                      classes: { input: classes.inputs },
                      disableUnderline: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item container justifyContent="center">
                <Button type="submit" className={classes.submit}>
                  Publish
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddBlogForm;
