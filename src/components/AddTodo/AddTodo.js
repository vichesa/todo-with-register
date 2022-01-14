import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodos } from "../../store/todoSlice";
import { nanoid } from "@reduxjs/toolkit";
import { InputGroup, FormControl } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { useHistory } from "react-router-dom";
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDebouncedCallback } from "use-debounce/lib";
import { Button, Container, FlexboxGrid, Input, Tooltip, Whisper } from "rsuite";


const schema = yup.object().shape({
  text: yup.string().required().nullable(false),
  dated: yup.date().required(),
})

const AddTodo = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [dated, setDated] = useState("");

  const validator = new SimpleReactValidator();
  const history = useHistory();

  const updateValFromStore = useDebouncedCallback((key, val) => {
    const todo = val
    if(key == 'todo'){
      setText(todo)
    }else {
      setDated(todo)
    }
    // console.log('data', this.text)
    
  }, 250)

  const data = []

  const submit = (data) => {
    const items = data.text.split(",");
      const dates = data.dated;
  
      // console.log('submit', data);
  
      dispatch(
        addTodos(
          items.map((item) => ({
            id: nanoid(),
            todo: item,
            deadline: dates,
            completed: false,
          }))
        )
      );
      setText('');
      setDated('');
      history.push('/todolist');
  };
  return (
    <div className="add-todo">
      <p>Make your day more productive and meaningful!</p>
      <Container style={{ display: 'flex' }}>
      <FlexboxGrid align="middle" justify="center" style={{ height: '100%' }}>
      <Formik
        initialValues={{
          text: '',
          dated: '',
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          // alert(JSON.stringify(values, null, 2))
          submit(values)
          setSubmitting(false)
        }}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Whisper
                  trigger="none"
                  className="text-error"
                  open={errors.text && touched.text}
                  speaker={<Tooltip>{errors.text}</Tooltip>}
                >
                  <Input
                    size="lg"
                    type="text"
                    name="text"
                    placeholder="Add Todo"
                    style={{
                      borderColor:
                        errors.text && touched.text ? 'red' : 'inherit',
                      marginBottom: 20,
                    }}
                    onChange={(val, event) => {
                      handleChange(event)
                      updateValFromStore('todo', val)
                    }}
                    onBlur={handleBlur}
                    value={values.text}
                  />
                </Whisper>
                <Whisper
                  trigger="none"
                  open={errors.dated && touched.dated}
                  speaker={<Tooltip>{errors.dated}</Tooltip>}
                >
                  <Input
                    size="lg"
                    type="date"
                    aria-label="Deadline"
                    name="dated"
                    placeholder="DeadLine"
                    style={{
                      borderColor:
                        errors.dated && touched.dated ? 'red' : 'inherit',
                      marginBottom: 20,
                    }}
                    onChange={(val, event) => {
                      handleChange(event)
                      updateValFromStore('deadline', val)
                    }}
                    onBlur={handleBlur}
                    value={values.dated}
                  />
                </Whisper>
                <Button type="submit" disabled={!isValid} style={{
            height: "40px",
            marginTop: "27px",
            padding: "8px",
            borderRadius: "5px",
          }}>
                  Submit
                </Button>
              </form>
            )
          }}
      </Formik>
      </FlexboxGrid>
    </Container>
    </div>
  );
};

export default AddTodo;
