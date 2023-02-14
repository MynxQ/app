import Head from "next/head"
import { Container, Col, Row} from "react-bootstrap"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import Item from "@/components/Item"
import React,{ useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { v4 as uuidv4 } from 'uuid';

export default function index() {
  const[currentTask, setCurrentTask] = useState("");
  const[tasks, setTasks] = useState([]);


  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")))
    if(JSON.parse(localStorage.getItem("tasks")) == undefined) setTasks([])
  }, [])



  return (
    <Container>
        <Head>
          <title>Today</title>
        </Head>
        <DragDropContext onDragEnd={(result) =>  {
          console.log(result)
        }}>
              <Row>
                <Col><input type="text" value={currentTask} onChange={(e) => setCurrentTask(e.target.value)} />
                </Col>
                <Col><button onClick={(e) => {    
                  setTasks((tasks) => {
                    localStorage.setItem("tasks", JSON.stringify([...tasks, { id: uuidv4(), name: currentTask, isDone: false}]))
                    return [...tasks, { id: uuidv4(), name: currentTask, isDone: false}]
                  })
                  setCurrentTask("");
              }}>Add</button>
              </Col>
              </Row>
              <Droppable droppableId={"list"} >
                {(provided) => (
                   <Row ref={provided.innerRef} {...provided.droppableProps} className="p-5 border rounded shadow ">
                   {tasks.map((task, index) => {
                    console.log(task)
                     return <Item key={task.id} name={task.name} isDone={task.isDone} Tasks={tasks} id={task.id} setTasks={setTasks} index={index}/>
                   })}
                   {provided.placeholder}
                  </Row>
                  )}
              </Droppable>
              </DragDropContext>
    </Container>
  )
}
