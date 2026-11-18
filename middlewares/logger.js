module.exports = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const start = Date.now();
  res.on('finish', () => console.log(`[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${Date.now() - start}ms`));
  next();
};