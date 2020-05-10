// Necessary to inform mocha to ignore these file types.
require.extensions['.css'] = function() {
  return null;
};
require.extensions['.scss'] = function() {
  return null;
};
require.extensions['.png'] = function() {
  return null;
};
require.extensions['.jpg'] = function() {
  return null;
};
