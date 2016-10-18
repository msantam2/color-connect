const ModalStyle = {
  overlay : {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(255, 255, 255, 0.75)',
  },
  content : {
    position        : 'fixed',
    top             : '100px',
    left            : '150px',
    right           : '150px',
    bottom          : '100px',
    border          : 'none',
    padding         : '20px',
    opacity         : '0',
    transition      : 'opacity 0.5s',
    background      : '#c2ff02',
    borderRadius    : '8px',
    width           : '50%',
    margin          : '0 auto',
    height          : '400px',
    fontFamily      : '\'Bungee\', cursive',
    fontSize        : '14px'
  }
};

export default ModalStyle;
