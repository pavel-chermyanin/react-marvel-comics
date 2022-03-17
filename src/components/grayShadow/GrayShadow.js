import React from 'react'

const GrayShadow = (props) => {
  return (
    <>    
        {
            React.Children.map(props.children, child => {
                return React.cloneElement(child, {className :
                'shadow border rounded mb-3'})
            })
        }
    
    </>

  )
}

export default GrayShadow
