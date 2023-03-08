import CircleSpinner from "../assets/circles.svg";

const Spinner = () => {
    return (
        <div className="flex justify-center item-center min-h-screen w-full">
            <img src={CircleSpinner}/>
        </div>
    )
};

export default Spinner;