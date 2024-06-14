const ErrorMsg = ({ message }) => {
	if (message === "resource not found") {
		return <div>{message}</div>;
	}
	return <div> {message}</div>;
};

export default ErrorMsg;
