import React from 'react'

const warnStyle = {
  width: '90%',
  padding: '1rem',
  marginBottom: '1rem',
  color: '#ba3939',
  background: '#ffe0e0',
  border: '1px solid #a33a3a',
}

const successStyle = {
  width: '90%',
  padding: '1rem',
  marginBottom: '1rem',
  color: '#2b7515',
  background: '#ecffd6',
  border: '1px solid #617c42',
}

const ErrorSuccess = ({ children, color }) => {
  return (
    <div style={color === 'red' ? warnStyle : successStyle}>
      <p style={{ margin: 0 }}>{children}</p>
    </div>
  )
}

export default ErrorSuccess
