function InputField(props: any) {
    return (
        <div style={props.style}>
            <div><label>{props.title}</label></div>
            {
                props.type == 'textarea' ?
                    <textarea
                        placeholder={props.placeholder}
                        onChange={props.onChange}
                        name={props.name}
                        className="w-100 p-1"
                        required={props.required || false}
                        minLength={props.minLength}
                        id={props.id}
                        value={props.value}
                        rows={props.rows}
                        cols={props.cols}
                        disabled={props.disabled}
                    />
                    :
                    <input
                        placeholder={props.placeholder}
                        type={props.type}
                        onChange={props.onChange}
                        name={props.name}
                        className="w-100 p-1"
                        required={props.required || false}
                        min={props.min}
                        max={props.max}
                        minLength={props.minLength}
                        pattern={props.pattern}
                        id={props.id}
                        value={props.value}
                        disabled={props.disabled}
                    />
            }

        </div>
    )
}

export default InputField;