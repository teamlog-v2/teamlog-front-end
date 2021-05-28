import { Box } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import React, { useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import useSupercluster from 'use-supercluster';
import { useFetchData } from '../hooks/hooks';
import Cluster from './Cluster';
import NewPostExplorer from './NewPostExplorer';
import SimpleMarker from './SimpleMarker';

export default function MapPage() {
  const [posts] = useFetchData('/api/posts/with-location');
  const [selectedPosts, setSelectedPosts] = useState(null);

  const points = useMemo(() => {
    return (posts || []).map((post, index) => ({
      type: 'Feature',
      properties: { cluster: false, postIndex: index },
      geometry: {
        type: 'Point',
        coordinates: [post.longitude, post.latitude],
      },
    }));
  }, [posts]);

  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(3);

  const { supercluster, clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 22 },
  });

  // render ========
  return (
    <WrapperBox>
      <CustomGoogleMap
        onChange={({ zoom: currentZoom, bounds: currentBounds }) => {
          setZoom(currentZoom);
          setBounds([
            currentBounds.nw.lng,
            currentBounds.se.lat,
            currentBounds.se.lng,
            currentBounds.nw.lat,
          ]);
        }}
        onChildClick={(_, props) => {
          setSelectedPosts(props.posts);
        }}
      >
        {clusters.map((cluster) => {
          const [lng, lat] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;

          if (isCluster) {
            const postIndices = supercluster
              .getLeaves(cluster.id, Infinity)
              .map((point) => point.properties.postIndex);
            const postIds = [];
            const postsBuilder = [];
            postIndices.forEach((postIndex) => {
              postIds.push(posts[postIndex].id);
              postsBuilder.push(posts[postIndex]);
            });
            return (
              <Cluster
                key={`CLUSTER_${postIds}`}
                lat={lat}
                lng={lng}
                pointCount={pointCount}
                posts={postsBuilder}
              />
            );
          }

          const postsBuilder = [posts[cluster.properties.postIndex]];
          return (
            <SimpleMarker
              key={`MARKER_${postsBuilder[0].id}`}
              lat={lat}
              lng={lng}
              posts={postsBuilder}
            />
          );
        })}
      </CustomGoogleMap>
      {selectedPosts && selectedPosts.length !== 0 && (
        <ExplorerWrapperBox>
          <NewPostExplorer
            posts={selectedPosts}
            close={() => {
              setSelectedPosts(null);
            }}
          />
        </ExplorerWrapperBox>
      )}
    </WrapperBox>
  );
}

//
function WrapperBox({ children, ...props }) {
  return (
    <Box
      position="absolute"
      top="0px"
      left="0px"
      width="100%"
      height="100%"
      {...props}
    >
      {children}
    </Box>
  );
}

function ExplorerWrapperBox({ children, ...props }) {
  return (
    <Box
      position="absolute"
      top="0px"
      zIndex={1}
      width="100%"
      maxWidth="480px"
      {...props}
    >
      {children}
    </Box>
  );
}

function CustomGoogleMap({ children, ...props }) {
  return (
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
      {...props}
    >
      {children}
    </GoogleMapReact>
  );
}
