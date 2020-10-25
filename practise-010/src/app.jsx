import React from 'react'
import './app.css'
import './app2.scss'

class App extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <div style={style.helloWorld} >Hello World!!!!!</div>
                <div style={{background: 'green',}}>hello hello hello</div>
                <div className='chinese'>一二三四五</div>
                <div className='scssChinese'>五六七八</div>
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
