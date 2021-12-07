import './form.component.css';

const Form = (props) =>{
    return (
        <div className="container">
            <div>{props.error? error():null}</div>
            <form onSubmit={props.loadWeather}>
            <div className="row">
                <div className="col-md-3 offset-md-2 text-black">
                    <input type="text" className="form-control" name="city" autoComplete="off" placeholder="City"/>
                </div>
                <div className="col-md-3 mt-2 mt-md-0">
                    <input type="text" className="form-control" name="country" autoComplete="off" placeholder="Country"/>
                </div>
                <div className="col-md-3 mt-2 mt-md-0 text-md-left">
                    <button className="btn btn-warning">Get Weather</button>
                </div>
            </div>
            </form>
        </div>
    );
}

function error(){
    return(
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter Correct City and Country Name
        </div>
    );
}

export default Form;