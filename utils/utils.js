export function querifyErrors(results) {
  let errorsQuery = "";
  if (results) {
    errorsQuery = "errors=true&";
    results.forEach((result) => {
      errorsQuery += result.path + "=" + result.msg + "&";
    });
    return errorsQuery;
  }
}
