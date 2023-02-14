import React from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Draggable } from 'react-beautiful-dnd';
export default function Item({ id, name, isDone, setTasks, Tasks, index}) {


  const deleteItem = () => {
    setTasks(tasks => {
      let ary = tasks.filter((task) => {
        if(task.id !== id) return task
      })
      return ary
    })
  }

  const changeStatus = () => {
    setTasks(tasks => {
      let ary = tasks.map((task) => {
        if(task.id == id) {
          return { id: task.id, name: task.name, isDone: !task.isDone}
        }
        return {...task}
      })
      localStorage.setItem("tasks", JSON.stringify(ary))
      return ary;
    })
  }
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Container className={`${isDone ? "bg-success": "bg-danger"} m-3`}
         {...provided.draggableProps} {...provided.dragHandleProps}
         ref={provided.innerRef}>
        <Row>
            <Col><h6>{name}</h6></Col>
            <Col>
              <Form.Select value={isDone ? "Done" : "Unfinished"} onChange={(e) => changeStatus()}>
                {!isDone && <option>Unfinished</option> || <option>Done</option>}
                {!isDone && <option>Done</option> || <option>Unfinished</option>}
              </Form.Select>
            </Col>
            <Col>
              <Button onClick={() => deleteItem()}>
                X
              </Button>
            </Col>
        </Row>
      </Container>
      )}
    </Draggable>
  )
}
