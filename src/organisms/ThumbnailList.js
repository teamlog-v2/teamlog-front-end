import React, { useEffect } from 'react';
import { Card, CardMedia, Grid, Typography } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VideoCallRounded } from '@material-ui/icons';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  padding: grid,
  display: 'flex',
  overflow: 'auto',
});

const ThumbnailList = ({ files, updateFiles, handleDeleteList }) => {
  const handleDragEnd = (result) => {
    const { destination, source } = result;
    const { index } = source;

    console.log(index);

    if (!destination) {
      // 삭제
      const current = document.querySelectorAll('.media')[index];

      console.log(files);
      console.log(index);

      current.style.border = 'none';
      const newFiles = files.filter((file, i) => {
        if (index === i) {
          if (file.id) handleDeleteList(file.id);
          else URL.revokeObjectURL(file.url);
        }
        return index !== i;
      });
      updateFiles(newFiles);
      return;
    }

    const newItems = reorder(
      // 배열에서 삭제 후 다시 끼워넣기
      files,
      source.index,
      destination.index,
    );
    updateFiles(newItems);
  };

  const handleDragupdate = (result) => {
    const { destination, source } = result;
    const { index } = source;
    const current = document.querySelectorAll('.media')[index];

    if (!destination) {
      // dropped outside the list
      current.style.border = '3px solid #593875';
      current.style.opacity = 0.9;
    } else current.style.border = 'none';
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1); // 제거된 객체 반환
    result.splice(endIndex, 0, removed); // endIndex에 제거된 객체 추가

    return result;
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={handleDragupdate}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef} // DOM 객체 획득 (useRef 안써도 됨)
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {files.map(({ url, type, file, fileName, notSupportedFormat }, index) => (
              <Draggable
                key={`draggable-${index}`}
                draggableId={`draggable-${index}`}
                index={index}
              >
                {(
                  provided,
                  snapshot, // provided: 제공되는 props 및 style,snapshot: 추적정보
                ) => (
                  <div
                    ref={provided.innerRef} // DOM 객체 획득
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}
                  >
                    <Card className="media">
                      {(() => {
                        if (type.includes('VIDEO')) {
                          if (notSupportedFormat) {
                            return (<Card
                              style={{ width: '200px', height: '200px' }}
                            >
                              <Grid container xs={12}
                              style={{ margin: '30% 5%' }} alignItems="center" justify="center">
                                <VideoCallRounded fontSize="large" />
                                {file ? file.name : fileName}
                              </Grid>
                            </Card>);
                          }
                          return (<CardMedia
                            component="video"
                            src={url}
                            controls
                            style={{ width: '200px', height: '200px' }}
                          />);
                         }
                         return (<CardMedia
                            component="img"
                            src={url}
                            style={{ width: '200px', height: '200px' }}
                          />
                        );
                      })()}
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ThumbnailList;
