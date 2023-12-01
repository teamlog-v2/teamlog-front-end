// import { Motion, spring } from 'react-motion';

const SimpleMarker = (props) => {
  const { $hover } = props;

  const K_SIZE = 24;

  const greatPlaceStyle = {
    position: 'absolute',
    width: K_SIZE,
    height: K_SIZE,
    left: -K_SIZE / 2,
    top: -K_SIZE / 2,

    // border: '5px solid #f44336',
    borderRadius: K_SIZE,
    backgroundColor: '#593875',
    color: '#593875',
    fontSize: 32,
    fontWeight: 'bold',
  };

  const greatPlaceStyleHover = {
    ...greatPlaceStyle,
    // border: '5px solid #593875',
    color: '#f44336',
  };

  return (
    <>
      {/* {!$hover ? (
        <Motion
          defaultStyle={{ scale: 1 }}
          style={{
            scale: spring(0.8, {
              stiffness: 320,
              damping: 8,
              precision: 0.001,
            }),
          }}
        >
          {({ scale }) => (
            <div
              style={{
                ...{
                  transform: `translate3D(0,0,0) scale(${scale}, ${scale})`,
                },
                ...($hover ? greatPlaceStyleHover : greatPlaceStyle),
              }}
            />
          )}
        </Motion>
      ) : (
        <Motion
          defaultStyle={{ scale: 0.8 }}
          style={{
            scale: spring(1, {
              stiffness: 320,
              damping: 8,
              precision: 0.001,
            }),
          }}
        >
          {({ scale }) => (
            <div
              style={{
                ...{
                  transform: `translate3D(0,0,0) scale(${scale}, ${scale})`,
                },
                ...($hover ? greatPlaceStyleHover : greatPlaceStyle),
              }}
            />
          )}
        </Motion>
      )} */}
    </>
  );
};

export default SimpleMarker;
