const fixedDiv = (props) => {

    const style = {
        height: props.height,
        width: props.width,
        margin: props.margin,
        textAlign: 'center',
        align: 'center',
    }

    return (
        <div style={style}>
            {props.children}
        </div>
    )
}

export default fixedDiv;