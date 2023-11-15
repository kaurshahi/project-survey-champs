function handleError(err, req, res) {
  console.error("Error:", err);

  let statusCode = 500;
  let errorMessage = "Internal Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    errorMessage = extractValidationErrorMessage(err);
  }

  res.status(statusCode).json({ error: errorMessage });
}

function getErrorMessage(err) {
  console.error("Error:", err);

  return "Something went wrong. Please try again later.";
}

function extractValidationErrorMessage(err) {
  const errors = Object.values(err.errors).map((val) => val.message);
  return errors.join(". ");
}

export default {
  handleError,
  getErrorMessage,
};
