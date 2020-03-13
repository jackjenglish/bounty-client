const jwtHeader = () => {
  const authData = JSON.parse(localStorage.getItem('authData'));

  if (authData && authData.token) {
    return { Authorization: `Bearer ${authData.token}` };
  } 
  return {};
};

export default jwtHeader;
