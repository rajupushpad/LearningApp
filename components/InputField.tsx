function InputField(props: any) {
    return(
        <div style={props.style}>
            <div><label>{props.title}</label></div>
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
            />
        </div>
    )
}

export default InputField;