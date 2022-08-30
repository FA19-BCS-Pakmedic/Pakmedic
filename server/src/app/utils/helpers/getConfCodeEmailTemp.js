module.exports = (code) => {
  return `<html>
  <body style="font-family: Helvetica">
    <h1>Confirmation Code</h1>
    <h2 style="color: #44886b">${code}</h2>
    <p>This code will expire in 10 minutes</p>
  </body>
</html>`;
};
