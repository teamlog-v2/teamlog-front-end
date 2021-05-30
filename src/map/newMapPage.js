import { Box, Button, Link as Anchor } from '@material-ui/core';
import { Map } from '@material-ui/icons';
import GoogleMapReact from 'google-map-react';
import React, { useMemo, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory, useParams } from 'react-router';
import useSupercluster from 'use-supercluster';
import { useFetchData } from '../hooks/hooks';
import Cluster from './Cluster';
import NewPostExplorer from './NewPostExplorer';
import SimpleMarker from './SimpleMarker';

function ProjectAnchor() {
  const { id: projectId } = useParams();
  const [project] = useFetchData(`/api/projects/${projectId}`);
  const history = useHistory();

  if (!project) {
    return null;
  }

  return (
    <Box
      position="fixed"
      left={0}
      margin="1rem"
      padding="0.25rem 0.5rem"
      style={{ opacity: 0.9 }}
    >
      <Button
        size="small"
        color="primary"
        variant="contained"
        onClick={() => {
          history.push(`/projects/${project.id}`);
        }}
      >
        <Map />&nbsp;{project.name}
      </Button>
    </Box>
  );
}

export default function MapPage() {
  const { id: projectId } = useParams();
  const [prevProjectId, setPrevProjectId] = useState(projectId);

  const [posts] = useFetchData(
    projectId
      ? `/api/projects/${projectId}/posts/with-location`
      : '/api/posts/with-location',
  );
  const [selectedPosts, setSelectedPosts] = useState(null);
  const [open, setOpen] = useState(false);
  const [fullMode, setFullMode] = useState(false);
  const explorer = useRef(null);

  if (prevProjectId !== projectId) {
    setPrevProjectId(projectId);
    setSelectedPosts(null);
    setOpen(false);
  }

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
    <Box overflow="hidden">
      <ExplorerWrapperBox
        explorer={explorer}
        isOpen={open}
        isFullMode={fullMode}
      >
        {projectId && <ProjectAnchor />}
        <NewPostExplorer
          explorer={explorer}
          posts={selectedPosts}
          close={() => {
            setOpen(false);
          }}
          isFullMode={fullMode}
          setFullMode={setFullMode}
        />
      </ExplorerWrapperBox>
      <MapWrapperBox isOpen={open} isFullMode={fullMode}>
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
            explorer.current?.scrollTo?.(0, 0);
            setSelectedPosts(props.posts);
            setOpen(true);
          }}
        >
          {posts && clusters.map((cluster) => {
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
      </MapWrapperBox>
    </Box>
  );
}

//
function MapWrapperBox({ children, isOpen, isFullMode, ...props }) {
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  let styles;
  if (isMobile || isFullMode || !isOpen) {
    styles = {
      width: '100%',
    };
  } else {
    styles = {
      width: '60%',
    };
  }

  return (
    <Box
      style={{ transition: 'all 0.8s' }}
      position="absolute"
      top="0px"
      left="0px"
      height="100%"
      {...styles}
      {...props}
    >
      {children}
    </Box>
  );
}

function ExplorerWrapperBox({ children, isOpen, isFullMode, ...props }) {
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  let styles;
  if (!isOpen) {
    styles = {
      left: '100%',
      width: isFullMode || isMobile ? '100%' : '40%',
    };
  } else if (isFullMode || isMobile) {
    styles = {
      left: '0px',
      width: '100%',
    };
  } else {
    styles = {
      left: '60%',
      width: '40%',
    };
  }

  return (
    <Box
      style={{ transition: 'all 0.8s' }}
      zIndex={1}
      position="fixed"
      top="0px"
      left="0px"
      height="100%"
      {...styles}
      {...props}
    >
      <Box height="48px" />
      <Box height="calc(100% - 48px)">{children}</Box>
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
      defaultZoom={6}
      hoverDistance={20}
      {...props}
    >
      {children}
    </GoogleMapReact>
  );
}
