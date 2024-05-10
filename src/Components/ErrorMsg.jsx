const ErrorMsg = ({ message }) => {
	if (message === "resource not found") {
		return <div>topic {message}</div>;
	}
	return <div>article {message}</div>;
};

export default ErrorMsg;
