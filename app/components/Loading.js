import React from "react"
import PropTypes from "prop-types"

const styles = {
    content: {
        fontSize: "35px",
        position: "absolute",
        left: "0",
        right: "0",
        marginTop: "20px",
        textAlign: "center",
    }
}

export default class Loading extends React.Component {
    state = {
        content: this.props.text
    }
        componentDidMount () {
        const { speed, text } = this.props
        //si no hago el "this.interval =" (setteo de Instance Property) y el componentWillUnmount, el setInterval se seguira ejecutando incluso cuando temrina de cargfar la battle (cargara anyways pero el setState seguira ejecutandose por lo tanto habria un memory leak)
        this.interval = window.setInterval(() => {
            this.state.content === text + "..."
                ? this.setState({ content: text})
                : this.setState(({ content }) => ( { content: content + "." }))
        }, speed)
    }
    componentWillUnmount () {
        //limpioo el interval
        window.clearInterval(this.interval)
    }
    render() {
        return (
            <p style={styles.content} >
                {this.state.content}
            </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
}

Loading.defaultProps = {
    text: "Loading",
    speed: 300,
}