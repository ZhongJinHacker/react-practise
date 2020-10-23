import React from 'react'

class App extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <div style={style.helloWorld} >Hello World!!!!!</div>
                <div style={{background: 'green',}}>hello hello</div>
            </div>
            )
    }
}

// 组件内使用css
const style = {
    helloWorld: {
        background: 'red',
        width: '200px',
        height: '200px'
    }
}
export default App
