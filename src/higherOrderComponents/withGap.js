import styled from 'styled-components';

export default function withGap(component) {
  return styled(component)`
    & > *:nth-child(n):not(:last-child) {
      margin-right: ${({ rowGap }) => rowGap};
      margin-bottom: ${({ columnGap }) => columnGap};
    }
  `;
}
