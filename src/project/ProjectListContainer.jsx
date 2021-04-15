import { Box, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useEffect, useState } from "react";
import ProjectItem from '../project/ProjectItem'

// 프로젝트 이름, 포스트 수 , lastmodifieddate, 좋아요 수 도 좀 괜찮네.
// SELECT date_format(update_time, '%Y년 %m월 %d일') as updateTime
const projectMock = [
    {
        name: "안녕",
        postCount: 5,
        thumbnail: 'https://images.unsplash.com/photo-1617664101703-345ca47c82b0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        updateTime: '2021년 4월 14일'
    },
    {
        name: "너만의 프로젝트",
        postCount: 12,
        thumbnail: 'https://images.unsplash.com/photo-1617892459113-0ef697cafa05?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        updateTime: '2021년 4월 12일'
    },
    {
        name: "야 너도 특급딸 수 있어",
        postCount: 7,
        thumbnail: 'https://images.unsplash.com/photo-1617143777034-fe4c261ac738?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        updateTime: '2021년 3월 25일'
    },
    {
        name: "샘숭",
        postCount: 52,
        thumbnail: 'https://images.unsplash.com/photo-1616098851246-fc12488ffe97?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        updateTime: '2021년 3월 12일'
    },
    {
        name: "퐁퐁퐁",
        postCount: 65,
        thumbnail: 'https://images.unsplash.com/photo-1616160973030-bb351a6a021e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        updateTime: '2021년 3월 8일'
    },
    {
        name: "챠챠챠",
        postCount: 19,
        thumbnail: 'https://source.unsplash.com/random',
        updateTime: '2021년 2월 11일'
    }
]

const fetchAndJsonData = async () => {
    return projectMock;
};

const ProjectListContainer = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        (async () => {
            let result;
            try {
                console.log(new Date())

                result = await fetchAndJsonData();
            } catch (error) {
                setIsLoaded(false);
                return;
            }
            setProjects(result);
            setIsLoaded(true);
        })();
    }, []);


    return (
        <>
            <Grid container spacing={3}>
                {(isLoaded ? projects : Array.from(new Array(8))).map((project) => (
                    <Grid item lg={3} md={4} sm={6} xs={12}>
                        {project ? (
                            <ProjectItem project={project} />
                        ) : (
                            <Box>
                                <Skeleton variant="rect" height="150px" />
                                <Box>
                                    <Skeleton />
                                    <Skeleton width="60%" />
                                </Box>
                            </Box>
                        )}
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
export default ProjectListContainer;