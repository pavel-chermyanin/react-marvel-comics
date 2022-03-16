import React from 'react'

const GrayShadow = (props) => {
  return (
    <div style={{'boxShadow': '10px 10px 30px rgba(0,0,0, .2)'}}>
        {
            React.Children.map(props.children, child => {
                return React.cloneElement(child, {className :
                'shadow border rounded'})
            })
        }
    </div>
  )
}

export default GrayShadow
