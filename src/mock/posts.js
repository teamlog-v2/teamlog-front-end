const posts = [
  {
    id: '5363646',
    content: '후지산은 일본의 혼슈 중앙부, 시즈오카현과 야마나시현의 경계에 있는 휴화산이며, 해발 3,776m로 일본에서 제일 높은 산이다.',
    post_media: [
      {
        id: 1,
        path: '../image/piano.mp4',
        type: 'video',
      },
    ],
    writer_user_id: 'jduck1024',
    access_modifier: 'PUBLIC',
    comment_modifier: 'PUBLIC',
    location: '경상북도 구미시 대학로 61 금오공과대학교 디지털관',
    hashtags: ['스토리보드', '일본', '여행', '후지산'],
    likeCount: 46,
    commentCount: 7,
    writeTime: '2021-04-09T23:05:37.9795225',
    post_tag: [
      {
        name: '스토리보드',
      },
      {
        name: 'MT',
      },
      {
        name: '경주',
      },
      {
        name: '추억',
      },
      {
        name: '동영상',
      },
    ],
    comment: [
      {
        id: 1,
        contents: '이런건 도대체 언제 찍은거야??????',
        write_time: '2021-04-09T23:05:37.9795225',
        parent_comment_id: null,
        writer_user_id: 'semicolumn21',
        comment_mention: [],
      },
      {
        id: 2,
        contents: '어제 밤에 찍은건데!? 기억 안나니???',
        write_time: '2021-04-09T23:05:37.9795225',
        parent_comment_id: 1,
        writer_user_id: 'jduck1024',
        comment_mention: [
          {
            id: 1,
            target_user_id: 'jduck1024',
          },
          {
            id: 2,
            target_user_id: 'friend18',
          },
        ],
      },
    ],
    commentCnt: 2,
    likerCnt: 15,
  },
  {
    id: '796799',
    content: '도쿄 스카이 트리는 일본 도쿄도 스미다구에 세워진 전파탑이다. 본래 높이 610.58m로 계획되었으나 2009년 10월에 높이 634 m로 설계가 변경되어, 캐나다의 CN 타워와 중국의 광저우타워를 제치고 세계에서 가장 높은 자립식 전파탑이 되었다.',
    hashtags: ['스토리보드', '일본', '여행', '도쿄', '스카이트리'],
    likeCount: 40,
    commentCount: 3,
    writeTime: '2020-09-13',
  },
  {
    id: '4646464',
    content: `나라 공원은 일본 나라현 나라시에 있는 공원이다. 나라 공원에는 사슴들이 자유롭게 뛰어다닌다. 
      Amazing experience of having wild deers roaming around freely with you`,
    hashtags: ['스토리보드', '일본', '나라 공원', '사슴'],
    likeCount: 31,
    commentCount: 55,
    writeTime: '2020-06-18',
  },
  {
    id: '64364',
    content: `가스가타이샤는 일본 나라현 나라시에 있는 신사이다. 후지와라 씨의 신사로 768년에 설립되었고 세월이 흐르면서 몇 차례 소실되었다가 재건되었다. 신사 내부는 많은 청동등과 석등이 달려있는 것으로 유명하다. 건축양식인 가스가-즈쿠리는 가스가 신사의 본전에서 유래되었다.
    가스가타이샤로 들어가는 길은 사슴 공원을 통과하고 길 옆으로 수 천개의 석등이 있다.`,
    hashtags: ['스토리보드', '가스가타이샤', '여행', '절', '템플스테이'],
    likeCount: 44,
    commentCount: 8,
    writeTime: '2020-06-13',
  },
  {
    id: '12525',
    content: `오키나와 추라우미 수족관은 오키나와현 모토부정에 위치한 수족관이다. 2010년 3월 30일 2억번째 관람객을 맞이하였다.
    일본 동물원·수족관 연합의 회원 수족관이기도 하다.
    2005년도까지 세계에서 가장 넓은 수족관이었다.`,
    hashtags: ['수족관', '아쿠아리움', '겐로쿠엔'],
    likeCount: 46,
    commentCount: 7,
    writeTime: '2021-05-13',
  },
];

export default posts;
