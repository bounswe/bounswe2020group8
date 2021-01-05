function AppError(returnObjects, args) {
  const tmp = Error.apply(this);
  this.name = this.constructor.name;
  tmp.name = this.constructor.name;
  this.message = tmp.message;
  this.code = returnObjects.code;
  this.titles = returnObjects.code;
  this.returnObjects = returnObjects;
  this.args = args;
  this.stack = new Error().stack;
  return this;
}
exports = AppError;
module.exports = AppError;
