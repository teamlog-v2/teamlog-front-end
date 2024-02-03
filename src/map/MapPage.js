import GoogleMapReact from 'google-map-react';
import React, { useState } from 'react';
import useSupercluster from 'use-supercluster';
import Cluster from './Cluster';
import PostExplorer from './PostExplorer';
import SimpleMarker from './SimpleMarker';

const MapPage = () => {
  // const [posts] = useSubscribeData('api/posts/with-location');
  const posts = [];

  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(3);

  const [selectedPostIds, setSelectedPostIds] = useState(null);

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
    <>
      <div
        style={{
          position: 'absolute',
          top: '0px',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {selectedPostIds && (
          <div
            style={{
              position: 'absolute',
              zIndex: 1,
              // backgroundColor: '#FFFFFF',
              width: '100%',
              maxWidth: 480,
            }}
          >
            <PostExplorer
              posts={posts}
              postIds={selectedPostIds}
              setSelectedPostIds={setSelectedPostIds}
            />
          </div>
        )}
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyD19HDfecIVKOhxEa0a81aC9AV5_2LrgDY',
            version: 'weekly',
            language: 'ko',
            region: 'KR',
          }}
          options={{
            zoomControl: false,
            fullscreenControl: false,
          }}
          defaultCenter={{
            lat: 36.119485,
            lng: 128.3445734,
          }}
          defaultZoom={4}
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
          onChildClick={(key, props) => {
            setSelectedPostIds(props.postIds);
          }}
        >
          {clusters.map((cluster) => {
            const [lng, lat] = cluster.geometry.coordinates;
            const {
              cluster: isCluster,
              point_count: pointCount,
            } = cluster.properties;

            if (isCluster) {
              const postIds = supercluster
                .getLeaves(cluster.id, Infinity)
                .map((point) => point.properties.postId);

              return (
                <Cluster
                  key={`${postIds}`}
                  lat={lat}
                  lng={lng}
                  pointCount={pointCount}
                  postIds={postIds}
                />
              );
            }

            const postIds = [cluster.properties.postId];
            return (
              <SimpleMarker
                key={`${postIds}`}
                lat={lat}
                lng={lng}
                postIds={postIds}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    </>
  );
};

export default React.memo(MapPage);
