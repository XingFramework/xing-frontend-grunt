var portOffset = parseInt(process.env.PORT_OFFSET) || 0;

module.exports = {
  karmaRunnerPort: 9101  + portOffset,
  liveReloadPort: 35729 + portOffset
};
