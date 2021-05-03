/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import { useSubscribeData } from '../hooks';
import SimpleMarker from './SimpleMarker';

const MapPage = () => {
  const [posts] = useSubscribeData('api/posts/with-location');

  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(3);

  const points = (posts || []).map((post) => ({
    type: 'Feature',
    properties: { cluster: false, postId: post.id },
    geometry: {
      type: 'Point',
      coordinates: [post.longitude, post.latitude],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 22 },
  });

  return (
    <div style={{ height: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyD19HDfecIVKOhxEa0a81aC9AV5_2LrgDY',
          version: 'weekly',
          language: 'ko',
          region: 'KR',
        }}
        defaultCenter={{
          lat: 0.0,
          lng: 0.0,
        }}
        defaultZoom={3}
        hoverDistance={20}
        onChange={({ zoom: curruntZoom, bounds: currentBounds }) => {
          setZoom(curruntZoom);
          setBounds([
            currentBounds.nw.lng,
            currentBounds.se.lat,
            currentBounds.se.lng,
            currentBounds.nw.lat,
          ]);
        }}
      >
        {clusters.map((cluster) => {
          const [lng, lat] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;

          if (isCluster) {
            return (
              <h1
                key={`cluster-${cluster.id}`}
                lat={lat}
                lng={lng}
                onClick={() => {
                  console.log(supercluster.getLeaves(cluster.id, Infinity));
                }}
              >
                {pointCount}
              </h1>
            );
          }

          return (
            <SimpleMarker
              key={`post-${cluster.properties.postId}`}
              lat={lat}
              lng={lng}
              postId={cluster.properties.postId}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default React.memo(MapPage);
