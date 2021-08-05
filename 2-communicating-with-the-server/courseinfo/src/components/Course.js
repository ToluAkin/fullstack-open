import React from 'react'

const Header = ({ courses }) => {
  return (
      <h2>{ courses.name }</h2>
    )
}

const Total = ({ courses }) => {
    const sum = courses.parts.reduce(function (start, value) {
      return start + value.exercises
    }, 0)
    return (
        <h4>total of {sum} exercises</h4>
    ) 
}

const Part = (props) => {
  return (
    <p> { props.part.name } { props.part.exercises }</p>    
  )
}

const Content = ({ courses }) => {
    return (
        courses.parts.map(
            course => <Part key={ course.id }  part={ course } />
        )
    )
}

const Course = (props) => {
    let courses = props.course.map((singleCourse, index) =>
        <div key={ index }>
            <Header courses={ singleCourse } />
            <Content courses={ singleCourse } />
            <Total courses={ singleCourse } />
        </div>
        )

    return (
        <div>
            <h1>Website Development Curriculum</h1>
            { courses }
        </div>
    )
}

export default Course