export default function HomeCity(props) {
    return(
        <div className="homecity-sidebar" style={{width:"30%"}}>
            <p>&#x2302; {`${props.city.matching_full_name}`}</p>
        </div>
    )
}