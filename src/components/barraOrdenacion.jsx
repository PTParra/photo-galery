


export const BarraOrdenacion = ({className, functionToUse}) => {


    const handleChange = (event) => {
        functionToUse(event.target.value);
    }

    return(
        <select onChange={handleChange} className={className}>
            <option value="">Ordenar Por:</option>
            <option value="width">Anchura</option>
            <option value="height">Altura</option>
            <option value="date">Fecha</option>
            <option value="likes">Me gusta</option>
        </select>
    )
}