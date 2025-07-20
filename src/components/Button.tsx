interface Attributes {
    btnType: "submit" | "reset" | "button" | undefined,

}

export default function Button({ btnType,  }: Attributes) {
    return (
        <button type={btnType}>

        </button>
    )
}