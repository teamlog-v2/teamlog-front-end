const subscribe = (id) => {
  beamsClient
      .start()
      .then((beamsClient) => beamsClient.getDeviceId())
      .then((deviceId) =>
        console.log("Successfully registered with Beams. Device ID:", deviceId)
      )
      .then(() => beamsClient.setDeviceInterests([id])) // device가 구독자가 되며, 사용자마다 다른 interest값을 가질 수 있다
      .then(() => beamsClient.getDeviceInterests())
      .then((interests) => console.log("Current interests:", interests))
      .catch(console.error);
};

const unsubscribe = () => {
  beamsClient.clearDeviceInterests()
    .then(() => console.log('Device interests have been cleared'))
    .catch(e => console.error('Could not clear device interests', e));
};

export { subscribe, unsubscribe };